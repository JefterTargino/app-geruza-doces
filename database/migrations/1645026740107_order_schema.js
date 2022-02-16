'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('name_client', 30).notNullable();
      // table.date('delivery_date').notNullable();
      table.string('delivery_date',10).notNullable();
      table.string('delivery_time', 5).notNullable();
      table.string('name_product', 30).notNullable();
      table.integer('amount').notNullable();
      table.string('filling', 30).notNullable();
      table.float('value').notNullable();
      table.string('comments', 70).notNullable();
      table.boolean('order_delivered').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
