'use strict'

const Database = use('Database')
function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number))) 
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}

const Hash = use('Hash')

class TeacherController {
    async index(){
        const teachers = await Database.table('teachers')
        return {status:200,error:undefined,data:teachers}
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = numberTypeParamValidator(id)
        
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}

        const teacher = await Database.select('*')
         
        .from('teachers')
        .where("teachers_id",id)
        .first()
        console.log(parseInt(id))
       

        return {status:200,data: teacher || {} }
    }

    async store({ request }){
        const { first_name, last_name, email, password } = request.body
        
        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (missingKeys.length)
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}

        const hashedPassword = await Hash.make(password)
        const teacher = await Database
            .table('teachers')
            .insert({ first_name,last_name,email,password:hashedPassword })


        return { status:200,error:undefined,data:{ first_name,last_name,email} }
    }

    async update({ request }){
    const { body,params } = request
    const { id } = params
    const { first_name,last_name,email } = body

    const teacherID = await Database
    .table('teachers')
    .where({ teachers_id:id })
    .update({ first_name,last_name,email })

    const teacher = await Database
    .table('teachers')
    .where({ teachers_id:teacherID })
    .first()

    return { status:200,error:undefined,data:teacher }
    }
    async destroy( { request } ){
        const  {id} = request.params
        const deleteTeacher = await Database
        .table('teachers').where({ teachers_id:id })
        .delete()

        return { status:200, error:undefined, message:'success' } 

    }
}
module.exports = TeacherController
