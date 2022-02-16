'use strict'

const Database = use('Database')

const Product = use("App/Models/Product");

class ProductController {
    async create({ request, response}) {
        try{
        const data = request.all([]);
        return await Product.create(data);
        }catch(error){
            return response.status(500).json({message: error })
        };
    };

    async update({ params, request, response }) {
        try{
        const product = await Product.findOrFail(params.id);

        const data = request.all([]);

        product.merge(data);

        return product.save();
        }catch(error){
            return response.status(500).json({message: error })
        };
    };

    async index({ response }){
        try{
        const product = await Product.all();

        return product;
        }catch(error){
            return response.status(404).json({message: error })
        };
    };

    async show ({ params, response }) {
        try{
        const product = await Product.findOrFail(params.id);
      
        return product;
        }catch(error){
            return response.status(404).json({message:  error })
        };
    };

    async delete({ params, response }){
        try{
        const product = await Product.findOrFail(params.id);
        await product.delete();

        response.json({
            message: 'Produto excluido'
        });
    }catch(error){
        return response.status(404).json({message: error })
    }
    };

    async list ({ response }) {
        try{
        return await Database
          .select('id','name_product').from('products')
          .orderBy('name_product','asc')
        }catch(error){
            return response.status(404).json({message: error })
        }
    }; 
}

module.exports = ProductController
