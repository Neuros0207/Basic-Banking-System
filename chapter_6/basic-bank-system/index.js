
const express = require('express')
const app = express()
const port = 3300
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const routers = require('./router')

const swaggerJSON = require('./api_documentation.json')
const swaggerUI = require('swagger-ui-express')
const passport = require('./utils/passport')
const { qrGenerate } = require('./app/controller/api/v2/media')
app.use(cookieParser())
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized :true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(routers)

app.set('view engine','ejs')
app.set('views', path.join(__dirname, './app/views'))
app.get('/', (req,res)=>{
    return res.render('index', {user : req.user})
})
app.post('/qr/png', qrGenerate)

app.use(express.static('public'))


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))

app.listen(port, () =>
    console.log(`Server run at http://127.0.0.1:${port}`))

    module.exports = app