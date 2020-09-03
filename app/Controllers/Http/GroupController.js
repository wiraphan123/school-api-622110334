'use strict'

const Group = require("../../Models/Group")

const Database = use('Database')
const Validator = use('Validator')
const group = use('App/Models/Group')
class GroupController {
    async index(){
        const { references } = request.qs
        const groups = group.query()
        if(references){
            const extractReferences = references.split(",")
            group.with(extractReferences)
        }
        return { status:200,error:undefined,data:await groups.fetch() }
    }
    async show({ request }){
        const { id } = request.params
        
        const ValidatedValue = Validator(id)
        
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
       
        const rules = {
            name:'required',
        }
        const validation = await Validator.validateAll(request.body,rules)
        if(validation.fails())
        return{ status:422,error:validation.messages(),data:undefined }

        const group = await Database
            .table('teachers')
            .insert({ name })


        return { status:200,error:undefined,data:{ name } }
    }
    async update({ request }){
        const { body,params } = request
        const { id } = params
        const { name,group_id } = body
    
        const groupID = await Database
        .table('groups')
        .where({ group_id:id })
        .update({ name,group_id })
    
        const group = await Database
        .table('groups')
        .where({ group_id:groupID })
        .first()
    
        return { status:200,error:undefined,data:groupID }
        }
        async destroy( { request } ){
            const  {id} = request.params
            const deleteGroup = await Database
            .table('groups').where({ group_id:id })
            .delete()
            
            return { status:200, error:undefined, message:'success' } 
    
        }
}

module.exports = GroupController
