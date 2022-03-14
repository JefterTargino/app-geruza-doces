'use strict'

const ListProduct = use("App/Models/ListProduct");

/*
|--------------------------------------------------------------------------
| ProductListSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductListSeeder {
  async run () {
    await ListProduct.createMany([
      {
        "order_id": 1,
        "name_product": "Bolo de Pasta",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Cliente solicitou as plaquinhas do Flamengo Bicampeão Mundial"
      },
      {
        "order_id": 2,
        "name_product": "Bolo de Chocolate",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Plaquinha de Girassol"
      },
      {
        "order_id": 2,
        "name_product": "Bolo de Chocolate",
        "amount": 1,
        "filling": "Chocolate com beijinho",
        "value": 35.00,
        "comments": "Plaquinha de Girassol",
      },
    ])
  }
}

module.exports = ProductListSeeder
