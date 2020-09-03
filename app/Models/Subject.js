'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subject extends Model {
    static get primaryKey(){
        return 'subject_id' //เพื่อไม่ให้ defaultเป็นชื่อ 'id'
    }

    static get createdAtColumn(){
        return null ;
    }
    
    static get updatedAtColumn(){
        return null ;
    }
    teachers(){
        return this.belongsTo('App/Models/Teacher')
    }

    enrollments(){
        return this.hasMany('App/Model/Enrollment')
    }
}

module.exports = Subject
