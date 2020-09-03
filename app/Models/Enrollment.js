'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enrollment extends Model {
    static get primaryKey(){
        return 'enrollment_id' //เพื่อไม่ให้ defaultเป็นชื่อ 'id'
    }

    static get createdAtColumn(){
        return null ;
    }
    
    static get updatedAtColumn(){
        return null ;
    }
    students(){
        return this.belongsTo('App/Models/Student')
    }
    subjects(){
        return this.belongsTo('App/Models/Subject')
    }
}

module.exports = Enrollment
