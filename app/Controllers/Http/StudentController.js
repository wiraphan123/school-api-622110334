'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Student = use('App/Models/Student')
const Hash = use('Hash')

class StudentController {
    async index(){
        const { references } = request.qs
        const students = Student.query()
        if(references){
            const extractReferences = references.split(",")
            student.with(extractReferences)
        }
        return { status:200,error:undefined,data:await students.fetch() }
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue =Validator(id)
        
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}

        const students = await Database.select('*')
         
        .from('students')
        .where("student_id",id)
        .first()
        console.log(parseInt(id))
       

        return {status:200,data: students || {} }
    }

    async store({ request }){
        const { first_name, last_name, email, password, group_id } = request.body
        const rules = {
            first_name:'required',
            last_name: 'required',
            email:'required|email|unique:teachers.email',
            password:'required|min:8',
            group_id:'required'
        }
        const validation = await Validator.validateAll(request.body,rules)
        if(validation.fails())
        return{ status:422,error:validation.messages(),data:undefined }

        const hashedPassword = await Hash.make(password)
        const student = await Database
            .table('teachers')
            .insert({ first_name,last_name,email,password:hashedPassword,group_id })


        return { status:200,error:undefined,data:{ first_name,last_name,email,group_id} }
    }
    
    async update({ request }){
        const { body,params } = request
        const { id } = params
        const { first_name,last_name,email } = body
    
        const studentID = await Database
        .table('students')
        .where({ teachers_id:id })
        .update({ first_name,last_name,email })
    
        const student = await Database
        .table('students')
        .where({ student_id:studentID })
        .first()
    
        return { status:200,error:undefined,data:teacher }
        }
        async destroy( { request } ){
            const  {id} = request.params
            const deleteStudent = await Database
            .table('students').where({ student_id:id })
            .delete()
    
            return { status:200, error:undefined, message:'success' } 
    
        }
}

module.exports = StudentController
