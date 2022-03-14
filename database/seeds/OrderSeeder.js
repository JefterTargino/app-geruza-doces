'use strict'

const Order = use("App/Models/Order");

/*
|--------------------------------------------------------------------------
| OrderSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class OrderSeeder {
  async run () {
    await Order.createMany([
      {
        "name_client": "Jefter Roberto Mota Targino",
        "delivery_date": "15/02/2022",
        "delivery_time": "15:00",
        "phone": "84988331126",
      },
      {
        "name_client": "Jennyffer Roberta Mota Targino",
        "delivery_date": "15/02/2022",
        "delivery_time": "20:00",
        "phone": "84988331126",
      },
      {
        "name_client": "Geruza Mota de Melo Targino",
        "delivery_date": "18/02/2022",
        "delivery_time": "10:00",
        "phone": "84988331126",
        "order_delivered": true
      },
    ])
  }
}

module.exports = OrderSeeder