'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('name_client', 30).notNullable();
      table.date('delivery_date').notNullable();
      table.string('delivery_time', 5).notNullable();
      table.string('phone', 11);
      table.boolean('order_delivered').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
