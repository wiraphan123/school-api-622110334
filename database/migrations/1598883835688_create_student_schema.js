'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments('student_id')
      table.string("first_name",120)
      .notNullable()
      table.string("last_name",120)
      .notNullable()
      table.string("password",120)
      .notNullable() // Varchar default lenght -> 255
      table.string("email",120)
      .notNullable()
      .unique()
      table.integer('group_id')
      .unsigned()

      table.foreign('group_id')
      .references('groups.group_id')
      .onDelete('CASCADE') //delete current data now
      .onUpdate('CASCADE')//update current data now
    })
  }

  down () {
    this.drop('create_students')
  }
}

module.exports = CreateStudentSchema
