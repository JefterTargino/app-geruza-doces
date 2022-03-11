'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    listProduct () {
        return this.hasMany('App/Models/ListProduct');
      }
}

module.exports = Order
