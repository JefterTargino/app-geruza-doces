'use strict'

const Order = use("App/Models/Order");
const Database = use('Database');

class OrderController {
    async create({ request, response}) {
        try{
        const data = request.all([]);
        return await Order.create(data);
        }catch(error){
            return response.status(500).json({message: error })
        };
    };

    async update({ params, request, response }) {
        try{
        const order = await Order.findOrFail(params.id);

        const data = request.all([]);

        order.merge(data);

        return order.save();
        }catch(error){
            return response.status(500).json({message: error })
        };
    };

    async index({ response }){
        try{
        //const order = await Order.all();
        const order = await Order
        .query()
        .orderBy('order_delivered','asc')
        .orderBy('delivery_date', 'desc')
        .orderBy('delivery_time', 'desc')
        .fetch()
        return order;
        }catch(error){
            return response.status(404).json({message: error })
        };
    };

    async show ({ params, response }) {
        try{
        const order = await Order.findOrFail(params.id);
        await order.load('listProduct', (postsQuery) =>{
            postsQuery.orderBy('id','asc')
        })
        const teste = await Database.from('list_products').where('order_id','=',params.id).sum('value');
        return Object.assign(order, teste[0]);
        }catch(error){
            return response.status(404).json({message:  error })
        };
    };

    async delete({ params, response }){
        try{
        const order = await Order.findOrFail(params.id);
        await order.delete();

        response.json({
            message: 'Pedido cancelado'
        });
    }catch(error){
        return response.status(404).json({message: error })
    }
    };
}

module.exports = OrderController
