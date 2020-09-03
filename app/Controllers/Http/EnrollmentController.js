'use strict'

const Database = use('Database')
const Validator = use('Validator')
const enrollment = use('App/Models/Enrollment')
class EnrollmentController {

    async index(){
        const { references } = request.qs
        const enrollments = enrollment.query()
        if(references){
            const extractReferences = references.split(",")
            enrollment.with(extractReferences)
        }
        return { status:200,error:undefined,data:await enrollments.fetch() }
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = Validator(id)
        
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}

        const enrollments = await Database.select('*')
         
        .from('enrollments')
        .where("enrollment_id",id)
        .first()
        console.log(parseInt(id))
       

        return {status:200,data: enrollments || {} }
    }
    async store({ request }){
        const { mark,mark_date,student_id,subject_id } = request.body
        
        const rules = {
            mark:'required',
            mark_date: 'required',
            student_id:'required',
            subject_id:'required'
        }
        const validation = await Validator.validateAll(request.body,rules)
        if(validation.fails())
        return{ status:422,error:validation.messages(),data:undefined }

        const enrollments = await Database
        .table('enrollments')
        .insert({  mark,mark_date,student_id,subject_id })


    return { status:200,error:undefined,data:{  mark,mark_date,student_id,subject_id } }
    }
    async update({ request }){
        const { body,params } = request
        const { id } = params
        const { mark,mark_date,student_id,subject_id } = body
    
        const enrollmentID = await Database
        .table('enrollments')
        .where({ enrollment_id:id })
        .update({ mark,mark_date,student_id,subject_id })
    
        const enrollment = await Database
        .table('groups')
        .where({ enrollment_id:enrollmentID })
        .first()
    
        return { status:200,error:undefined,data:enrollmentID }
        }
        async destroy( { request } ){
            const  {id} = request.params
            const deleteEnrollment = await Database
            .table('enrollments').where({ enrollment_id:id })
            .delete()
            
            return { status:200, error:undefined, message:'success' } 
    
        }

}

module.exports = EnrollmentController
