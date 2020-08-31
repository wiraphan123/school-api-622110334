'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSubjectsSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.increments('subject_id')
      table.string('title',120).unique()
      table.integer('teacher_id').unique().unsigned()
      table.foreign('teacher_id')
      .references('teachers.teachers_id')
      .onDelete('CASCADE') 
      .onUpdate('CASCADE')
    })
  }

  down () {
    this.drop('create_subjects')
  }
}

module.exports = CreateSubjectsSchema
