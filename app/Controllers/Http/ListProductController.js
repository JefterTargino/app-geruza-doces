'use strict'

const ListProduct = use("App/Models/ListProduct");
const Database = use('Database');

class ListProductController {
    async create({ request, response}) {
      try{
      const query = await Database.from('products').select('value').where('name_product','=', request.input('name_product'))
      const value = parseFloat(query[0].value)
      const data = request.all([]);
      const amount = request.input('amount')
      data.value = value*amount;
      return await ListProduct.create(data);
      }catch(error){
          return response.status(500).json({message: error })
      };
    };

    async update({ params, request, response }) {
      try{
      const list_product = await ListProduct.findOrFail(params.id);

      const data = request.all([]);

      list_product.merge(data);

      return list_product.save();
      }catch(error){
          return response.status(500).json({message: error })
      };
    };

    async index({ response }){
      try{
      const list_product = await ListProduct.all();

      return list_product;
      }catch(error){
          return response.status(404).json({message: error })
      };
    };

    async show ({ params, response }) {
      try{
      const list_product = await ListProduct.findOrFail(params.id);
    
      return list_product;
      }catch(error){
          return response.status(404).json({message:  error })
      };
    };

    async delete({ params, response }){
      try{
      const list_product = await ListProduct.findOrFail(params.id);
      await list_product.delete();

      response.json({
          message: 'Produto excluido'
      });
      }catch(error){
      return response.status(404).json({message: error })
      };
    };
}

module.exports = ListProductController
