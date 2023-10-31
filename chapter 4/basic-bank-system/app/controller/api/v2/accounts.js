
import * as model from './../../../model/v2/accounts.js'
import bcrypt from 'bcrypt'


async function getAccounts(req,res){
    if(req.query){
        let result = await model.searchAccountByEmail(req.query.page_number, req.query.display_limit, req.query.search)
        if(!result.length){
            res.status(200).json({
                status : 'success',
                code : 200,
                message : 'Data empty'
            })
        }
        else{res.status(200).json({
            status : 'success',
            code : 200,
            message : 'success',
            data : result
        })}
    }
    else {
        let result = await model.showAllAccounts()
        if(!result.length){
            res.status(200).json({
                status : 'success',
                code : 200,
                message : 'Data empty'
            })
        }
        else{res.status(200).json({
            status : 'success',
            code : 200,
            message : 'success',
            data : result
        })}
    }
}
async function getAccountById(req,res){
    if(!+req.params.id){
        res.status(400).json({
            status: 'fail',
            code: 400,
            message: 'Bad Request! id required and need to be a number'
        })
    }
    else{
        const query_result = await model.search_accountId(+req.params.id)
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
                message: 'There is no account with that id'
            })
        }}
}
async function postAccount(req, res){
    const search = await model.searchAccountByEmail(req.query.page_number,req.query.display_limit,req.body.email)
    const search_id = await model.search_userId(+req.body.user_id)
    if(!req.body.email || !req.body.password || !req.body.balance || !req.body.user_id ){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'Bad request : request for is not complete '
        })
    }
    else if (!search_id){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'No user with that id'
        })
    }
    else if(!search){
        res.status(404).json({
            status : 'fail',
            code : 404,
            message : 'Email already exist'
        })
    }
    else{
        let hashed_password = await bcrypt.hash(req.body.password, 10)
        await model.createNewAccount(req.body, hashed_password)
        .then((resolve)=>{
            res.status(resolve.code).json(resolve)
        })
    }
}
async function deleteAccountById(req,res){
    if(!+req.params.id){
        res.status(400).json({
            status : 'fail',
            code : 400,
            message : 'Bad request: id field required'
        })
    }
    else{
        const cari = model.search_accountId(+req.params.id)
        if(!cari.length){
            res.status(200).json({
                status : 'success',
                code : 200,
                message : 'Data is empty'
            })
        }
        else{model.hapusan(+req.params.id)
            .then((resolve)=>{
                res.status(200).json({
                    status : 'success',
                    code : '200',
                    message : 'success',
                    cause : resolve.meta.cause
                })
            })}
    }}




export { getAccountById,getAccounts,postAccount,deleteAccountById}
