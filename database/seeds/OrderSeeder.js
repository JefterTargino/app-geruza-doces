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
        "name_product": "Bolo de Pasta",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Cliente solicitou as plaquinhas do Flamengo Bicampeão Mundial"
      },
      {
        "name_client": "Jennyffer Roberta Mota Targino",
        "delivery_date": "16/02/2022",
        "delivery_time": "15:00",
        "name_product": "Bolo de Chocolate",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Plaquinha de Girassol"
      },
      {
        "name_client": "Teste",
        "delivery_date": "20/01/2022",
        "delivery_time": "15:00",
        "name_product": "Bolo de Chocolate",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Plaquinha de Girassol",
        "order_delivered": true
      },
    ])
  }
}

module.exports = OrderSeeder