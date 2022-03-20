'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResumeSchema extends Schema {
  up () {
    this.create('resumes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('resumes')
  }
}

module.exports = ResumeSchema
