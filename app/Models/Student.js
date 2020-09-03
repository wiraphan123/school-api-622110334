'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    static get primaryKey(){
        return 'student_id' //เพื่อไม่ให้ defaultเป็นชื่อ 'id'
    }

    static get createdAtColumn(){
        return null ;
    }
    
    static get updatedAtColumn(){
        return null ;
    }

    groups() {
        return this.belongsTo('App/Model/Group')
    }

    enrollments(){
        return this.hasMany('App/Model/Enrollment')
    }
}

module.exports = Student
