'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEnrollmentsSchema extends Schema {
  up () {
    this.create('enrollments', (table) => {
      table.increments('enrollment_id')
      table.float('mark').default(0)
      
      table.timestamp('mark_date')
      table.integer('student_id').notNullable().unsigned()
      table.integer('subject_id').notNullable().unsigned()


      table.foreign('student_id')
      .references('students.student_id')
      .onDelete('CASCADE') 
      .onUpdate('CASCADE')

      table.foreign('subject_id')
      .references('subjects.subject_id')
      .onDelete('CASCADE') 
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('create_enrollments')
  }
}

module.exports = CreateEnrollmentsSchema
