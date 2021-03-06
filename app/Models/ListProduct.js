'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListProduct extends Model {
    order (){
        return this.hasOne('App/Models/Order');
    }
}

module.exports = ListProduct
