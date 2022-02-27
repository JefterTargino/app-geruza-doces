'use strict'

const Product = use("App/Models/Product");

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ProductSeeder {
  async run () {
    await Product.createMany([
      {
        "name_product": "Bolo de Pasta",
        "value": 35.00,
        "comments": "Bolo quadrado ou redondo"
      },
      {
        "name_product": "Bolo de Chocolate",
        "value": 35.00,
        "comments": "Bolo quadrado ou redondo"
      },
      {
        "name_product": "Bolo de Glacê1",
        "value": 35,
        "comments": "Bolo quadrado ou redondo"
      },
      {
        "name_product": "Bolo de Glacê2",
        "value": 35,
        "comments": "Bolo quadrado ou redondo"
      },
    ])
  }
}

module.exports = ProductSeeder
