'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListProductSchema extends Schema {
  up () {
    this.create('list_products', (table) => {
      table.increments()
      table.integer('order_id')
      .references('id')
      .inTable('orders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable();
      table.string('name_product', 30).notNullable();
      table.integer('amount').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('list_products')
  }
}

module.exports = ListProductSchema
