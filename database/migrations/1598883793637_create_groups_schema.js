'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateGroupsSchema extends Schema {
  up () {
    this.create('groups', (table) => {
      table.increments('group_id')
      table.string("name",100).unique()
     
    })
  }

  down () {
    this.drop('create_groups')
  }
}

module.exports = CreateGroupsSchema
