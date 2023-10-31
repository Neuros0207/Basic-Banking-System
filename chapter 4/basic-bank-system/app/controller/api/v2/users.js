import * as model from './../../../model/v2/users.js'



export async function getUsers(req, res){
    const query_result = await model.showAllUsers(req.query.page_number, req.query.display_limit, req.query.search)
    if(!query_result.length) res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Data Empty'
    })
    else{res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Request has succeeded',
        data: query_result
    })}
}
export async function getUsersById (req, res){
    if(!+req.params.id){
        res.status(400).json({
        status: 'fail',
        code: 400,
        message: 'Bad Request! id required and need to be a number'
    })}
    else{
        const query_result = await model.search_userId(+req.params.id)
        if(query_result){
            res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Query successfully displayed',
            data: query_result
        })}
        else{
            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'There is no record with that id'
            })
        }}
}
export async function postUsers(req, res){
    await model.user_registration(req.body)
    .then((resolve)=>{
        res.status(201).json({
        status: 'success',
        code: 201,
        message: 'User data succesfully added to the database',
        data: resolve
    })})
    .catch((err)=>{
        res.status(400).json({
            status : "fail",
            code : 400,
            message : `User registration failed`,
            error : `${err.meta.target} already exist`
        })
    })
}
export async function deleteUserById(req, res){
    const param = +req.params.id
    if(!param){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'Bad request: id field required'
        })
    }
    else{
        const search = await model.search_userId(param)
        if(search){
            let deleteUser = await model.delete_user(+req.params.id)
            res.status(200).json({
                status : 'success',
                code : 200,
                message : 'User has been deleted',
                data : deleteUser

            })

        }
        else{
            res.status(200).json({
                status : 'success',
                code : 200,
                message : 'user tidak ada didatabase'
            })
        }}
}
export async function putUsersById(req,res){
    const put_parameter = ['user_name','phone_number','identity_type','identity_number','address']
    if(!put_parameter.every(value => Object.keys(req.body).includes(value))){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'Bad request: request form incomplete'
        })
    }
    if(!+req.params.id){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'Bad request: id is integer'
        })
    }

    let search = await model.search_userId(+req.params.id)
    if(!search){
        res.status(404).json({
            status : 'fail',
            code : 404,
            message : 'User not found'
        })
    }
    else{
        await model.update_user(+req.params.id, req.body)
        .then((resolve)=>{
            res.status(resolve.code).json(resolve)
        }).catch((err)=>console.log(err,'Ada yang salah'))

    }
}

