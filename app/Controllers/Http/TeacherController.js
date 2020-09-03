'use strict'

const Database = use('Database')
const Teacher = use('App/Models/Teacher')
const Validator = use('Validator')
// function numberTypeParamValidator(number){
//     if(Number.isNaN(parseInt(number))) 
//     return { error:`param: ${number} is not supported, Please use number type param.` }
//         return {}
// }
const Hash = use('Hash')

class TeacherController {
    async index(){
        const { references } = request.qs
        const teachers = Teacher.query()
        if(references){
            const extractReferences = references.split(",")
            subject.with(extractReferences)
        }
        return { status:200,error:undefined,data:await teachers.fetch() }
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = Validator(id)
        
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
       
        const rules = {
            first_name:'required',
            last_name: 'required',
            email:'required|email|unique:teachers.email',
            password:'required|min:8'
        }
        const validation = await Validator.validateAll(request.body,rules)
        if(validation.fails())
        return{ status:422,error:validation.messages(),data:undefined }

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
