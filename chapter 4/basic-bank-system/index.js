import express from 'express'
const app = express()
const port = 3000
import {routers} from './router/index.js'

app.use(express.json())

app.use(routers);

app.get('/',(req,res)=>{
    res.send("This is the home page")
})

app.listen(port, () =>
    console
      .log(`Server run at http://localhost:${port}
    `))
