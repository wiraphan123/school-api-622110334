'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Teacher extends Model {
    static get primaryKey(){
        return 'teachers_id' //เพื่อไม่ให้ defaultเป็นชื่อ 'id'
    }

    static get createdAtColumn(){
        return null ;
    }
    
    static get updatedAtColumn(){
        return null ;
    }

    subjects() {
        return this.hasMany('App/Model/Subject')
    }
}

module.exports = Teacher
