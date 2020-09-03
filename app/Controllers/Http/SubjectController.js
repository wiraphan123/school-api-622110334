'use strict'

const Database = use('Database')
const Subject = use('App/Models/Subject')
const Validator = use('Validator')
class SubjectController {
//-----------------------------------------------------------------------------------------------------------------------------------
    async index({ request }){
        // subjects?references=teachers
        const { references } = request.qs
        console.log(references)

        const subjects = Subject.query()
        if(references){
            const extractReferences = references.split(",")
            subject.with(extractReferences)
        }
        return { status:200,error:undefined,data:await subjects.fetch() }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------
    async show({ request }){
        const { id } = request.params
        const ValidatedValue = Validator(id)
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}
        const subject = await Subject.find(id)
        return {status:200,data: subjects || {} }
    }
    
    async showTeacher({ request }){
        const { id } = request.params
        const subject = await Database
        .table('subject')
        .where({subject_id: id})
        .innerJoin('teachers','subject.teachers_id','teachers.teacher_id')
        .first()

        return { status:200,error:undefined,data:subject || {} }
    }


    async store({ request }){
        const { title,teacher_id } = request.body
        const rules = {
            title:'required',
            teacher_id: 'required',
        }
        const validation = await Validator.validateAll(request.body,rules)
        if(validation.fails())
        return{ status:422,error:validation.messages(),data:undefined }
        
        const subject = await Database
            .table('subjects')
            .insert({ title,teacher_id })


        return { status:200,error:undefined,data:{ title,teacher_id } }
    }
        
    async update({ request }){
        const { body,params } = request
        const { id } = params
        const { title,teacher_id } = body
    
        const subjectID = await Database
        .table('subjects')
        .where({ subject_id:id })
        .update({ title,teacher_id })
    
        const subject = await Database
        .table('subjects')
        .where({ subject_id:subjectID })
        .first()
    
        return { status:200,error:undefined,data:subjectID }
        }
        async destroy( { request } ){
            const  {id} = request.params
            const deleteSubject = await Database
            .table('subjects').where({ subject_id:id })
            .delete()
            return { status:200, error:undefined, message:'success' } 
    
        }

}

module.exports = SubjectController
