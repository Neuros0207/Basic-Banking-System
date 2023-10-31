import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


async function transactionTransfer(id_pengirim, id_penerima, nilai){
    try {
        const [pengirim, penerima, Transfer] = await prisma.$transaction([
            prisma.accounts.update({
                data : {
                    balance : {
                        decrement : +nilai
                    }
                },
                where : {
                    account_id : id_pengirim
                }
            }),

            prisma.accounts.update({
                data : {
                    balance : {
                        increment : +nilai
                    }
                },
                where : {
                    account_id : id_penerima
                }
            }),
            prisma.transactions.create({
                data : {
                    transaction_type : 'Transfer',
                    amount : +nilai,
                    destination_id : id_penerima,
                    account_id : id_pengirim
                }
            })

        ])
        return {
                status : 'success',
                code : 201,
                message : 'Transaction complete',
                data : Transfer
            }
    } catch (error) {
        return {
            status : 'fail',
            code : 500,
            message : 'Internal Server Error'
        }
    }

}
async function selfTransaction (type, amounts, id){
    if(type == "Deposit"){
        const deposit = await prisma.accounts.update({
            data : {
                balance : {
                    increment : +amounts
                }
            },
            where : {
                account_id : +id
            }
        })
        const record = await prisma.transactions.create({
            data : {
                transaction_type : type,
                amount : +amounts,
                destination_id : +id,
                account_id : +id
            }
        })
        return record
    }
    else{
        const withdrawal = await prisma.accounts.update({
            data : {
                balance : {
                    decrement : +amounts
                }
            },
            where : {
                account_id : +id
            }
        })
        const record = await prisma.transactions.create({
            data : {
                transaction_type : type,
                amount : +amounts,
                destination_id : +id,
                account_id : +id
            }
        })
        return record
    }
}

async function getAccountByEmail(account_email){
    return prisma.accounts.findUnique({
        where : {
            email : account_email
        },
        select : {
            account_id : true
        }
    })
}
async function showAllTransactions(page_number = 1, display_limit=10){
    const result = await prisma.transactions.findMany({
        take : +display_limit,
        skip : +display_limit*(page_number-1),
        select : {
            transaction_id : true,
            transaction_type : true,
            amount : true,
            transaction_time : true
        },
        orderBy: {
            transaction_id : 'asc'
        }
    })
    return result
}
async function getSpecificTransaction(id){
    try {
        const search_accountId = await prisma.transactions.findUnique({
            select : {
                account_id :true
            },
            where : {
                transaction_id : id
            }
        })
        const result = await prisma.transactions.findMany({
            where : {
                account_id : search_accountId.account_id
            }
        })
        return result
    } catch (error) {
        return error
    }
}
async function getTransactionsById(id ,page_number =1 , display_limit = 10){
    const result = await prisma.accounts.findMany({
        select : {
            account_id : true,
            user_id : true
        },
        include : {
            transactions : true
        },

        take : +display_limit,
        skip : +display_limit*(page_number-1),
        where: {
            account_id : id
        },
        orderBy: {
            transaction_id : 'asc'
        }
    })
    return result
}
async function deleteTransaction(id){
    await prisma.transactions.delete({
    where : {
        transaction_id : id
    }
})}

export {getAccountByEmail,getSpecificTransaction,getTransactionsById,selfTransaction,showAllTransactions,deleteTransaction,transactionTransfer}