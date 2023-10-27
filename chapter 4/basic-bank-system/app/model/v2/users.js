const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    async showAllUsers (page_number = 1, display_limit=10, search = ''){
        let showUsers = prisma.users.findMany({
            where : {
                user_name : {
                    contains : `${search}`,
                    mode : 'insensitive'
                }
            },
            skip : +display_limit*(page_number-1),
            take : +display_limit,
            orderBy : {
                user_id : 'asc'
            }
        })
        return showUsers
    },
    async search_userId (id){
        let showUser = await prisma.users.findUnique({
            where : {
               user_id : id
            }
        })
        return showUser
    },
    async user_registration (body){
        let user = await prisma.users.create({
            data: {
                user_name: body.user_name,
                profiles: {
                    create : {
                        phone_number : body.phone_number,
                        identity_type : body.identity_type,
                        identity_number : body.identity_number,
                        address : body.address
                    }
                }
            }
        })
        return user
    },
    async update_user (id, body){
        try {
            let updated_user = await prisma.users.update({
                where : {
                    user_id : id
                },
                data : {
                    user_name : body.user_name
                }
            })
            let search_profile_id = await prisma.profiles.findFirst({
                where : {
                    user_id : id
                },
                select : {
                    profile_id : true
                }
            })

            let updated_profile = await prisma.profiles.update({
                where: {
                    user_id: id,
                    profile_id : search_profile_id.profile_id
                },
                data : {
                    phone_number: body.phone_number,
                    identity_type : body.identity_type,
                    identity_number : body.identity_number,
                    address : body.address
                }
            })
            return {
                status : 'success',
                code : 200,
                message : 'User data updated',
                data : updated_user}
        } catch (error) {
            // menurut saya ini skenario yang sangat jarang terjadi dimana user ingin mengupdate seluruh data lama
            // ke data yang baru dan salah satu datanya bentrok (didatabase )
            return {
                status : 'fail',
                code : 409,
                message : `${error.meta.target} already exist`}
        }
    },
    async delete_user(id){
        return await prisma.users.delete({
            where : {
                user_id : id
            }
        })
    }




}