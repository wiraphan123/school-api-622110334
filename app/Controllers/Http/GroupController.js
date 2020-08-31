'use strict'
const Database = use('Database')
function numberTypeParamValidator(number){
    if(Number.isNaN(parseInt(number))) 
    return { error:`param: ${number} is not supported, Please use number type param.` }
        return {}
}
class GroupController {
    async index(){
        const groups = await Database.table('groups')
        return {status:200,error:undefined,data:teachers}
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = numberTypeParamValidator(id)
        
        if(ValidatedValue.error) return {status:500, error:ValidatedValue.error ,data:undefined}

        const groups = await Database.select('*')
         
        .from('groups')
        .where("group_id",id)
        .first()
        console.log(parseInt(id))
       

        return {status:200,data: groups || {} }
    }
    async store({ request }){
        const { name } = request.body
        
        const missingKeys = []
        if (!name) missingKeys.push('name')
        if (missingKeys.length)
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}
        
        const groups = await Database
        .table('groups')
        .insert({ name })


    return { status:200,error:undefined,data:{ name } }
    }
}

module.exports = GroupController
