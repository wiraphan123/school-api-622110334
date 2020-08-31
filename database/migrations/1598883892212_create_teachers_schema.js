'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTeachersSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments('teachers_id')
      table.string('first_name',120)
      .notNullable()
      table.string('last_name',120)
      .notNullable()
      table.string('password',120)
      .notNullable() // Varchar default lenght -> 255
      table.string('email',120)
      .notNullable()
      .unique()
    })
  }

  down () {
    this.drop('create_teachers')
  }
}

module.exports = CreateTeachersSchema
