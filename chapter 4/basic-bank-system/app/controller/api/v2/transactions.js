const model = require('./../../../model/v2/transactions')

module.exports = {
    async postTransactions(req,res){
        const id_pengirim = await model.getAccountByEmail(req.body.email_pengirim)
        // fitur withdrawal dan deposit masih dalam pengerjaan
        // if(!req.body.email_penerima){
        //     const result = await model.selfTransaction(req.body.jenis_transaksi, req.body.amount, id_pengirim.account_id)
        //     res.status(200).json({
        //         status : 'success',
        //         code : 200,
        //         message : `${result.transaction_type} of ${result.amount} rupiah is complete`,
        //     })
        // }
        const id_penerima = await model.getAccountByEmail(req.body.email_penerima)
        if(req.body.email_pengirim === req.body.email_penerima){
            res.status(400).json({
                status : 'fail',
                code : 400,
                message : 'Bad request : tidak bisa mentransfer ke akun sendiri'
            })
        }
        else{
            await model.transactionTransfer(id_penerima.account_id,id_pengirim.account_id,req.body.amount)
            .then((resolve)=>{
            res.status(resolve.code).json(resolve)
        })}

    },
    async getTransactions(req,res){
        if(req.query){
            await model.showAllTransactions(req.query.page_number, req.query.display_limit)
            .then((resolve)=>{
            if(!resolve.length){
                res.status(200).json({
                    status : 'success',
                    code : 200,
                    message : 'Data empty'
                })
            }
            else{
                res.status(200).json({
                status : 'success',
                code : 200,
                message : 'success',
                data : resolve
            })
            }
        })}
        else{
            await model.showAllTransactions()
            .then((resolve)=>{
            if(!resolve.length){
                res.status(200).json({
                    status : 'success',
                    code : 200,
                    message : 'Data empty'
                })
            }
            else{
                res.status(200).json({
                status : 'success',
                code : 200,
                message : 'success',
                data : resolve
            })
            }
        })
        }
    },
    async getTransactionById(req, res){
        if(!+req.params.id){
            res.status(400).json({
                status: 'fail',
                code: 400,
                message: 'Bad Request! id required and need to be a number'
            })
        }
        else{
            const query_result = await model.getSpecificTransaction(+req.params.id)
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
                    message: 'There is no transaction with that id'
                })
            }}
    },
    async deleteTransactionById(req, res){
        if(!+req.params.id){
            res.status(400).json({
                status : 'fail',
                code : 400,
                message : 'Bad request: id field required'
            })
        }
        else{
            const search = await model.getSpecificTransaction(+req.params.id)
            if(search){
                await model.deleteTransaction(+req.params.id)
                .then((resolve)=>{
                    res.status(200).json({
                        status : 'success',
                        code : 200,
                        message : 'Transaction has been deleted',
                        data : resolve
                    })
                })
                .catch((err)=>{
                    res.status(404).json({
                        status : 'fail',
                        code : 404,
                        message : err.meta.cause
                    })
                })
            }}
    }

}
