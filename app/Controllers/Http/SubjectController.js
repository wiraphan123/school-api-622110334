'use strict'
const Database = use('Database')
function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number))) 
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}
class SubjectController {
    async index(){
        const subjects = await Database.table('subjects')
        return {status:200,error:undefined,data:subjects}
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = numberTypeParamValidator(id)
        
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}

        const subjects = await Database.select('*')
         
        .from('teachers')
        .where("subject_id",id)
        .first()
        console.log(parseInt(id))
       

        return {status:200,data: subjects || {} }
    }
    async store({ request }){
        const { title,teacher_id } = request.body
        
        const missingKeys = []
        if (!title) missingKeys.push('title')
        if (!teacher_id) missingKeys.push('teacher_id')
        if (missingKeys.length)
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}
        
        const subjects = await Database
        .table('subjects')
        .insert({ title,teacher_id })


    return { status:200,error:undefined,data:{ title,teacher_id } }
    }
}

module.exports = SubjectController
