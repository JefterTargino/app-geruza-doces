'use strict'

const Database = use('Database')

const Resume = use("App/Models/Resume");

class ResumeController {

  async financial({response}){
    try {
      const received = await Database
      .from('list_products')
      .sum('value as value_received')
      .whereIn('order_id',[Database
                          .from('orders')
                          .where('order_delivered','=',true)
                          .select('id')])

      const notReceived = await Database
      .from('list_products')
      .sum('value as value_notReceived')
      .whereIn('order_id',[Database
                          .from('orders')
                          .where('order_delivered','=',false)
                          .select('id')])

      return Object.assign(received[0],notReceived[0]) ;

    } catch (error) {
      return response.status(500).json({message: error })
    }
  }

  async resume({ params, request, response }) {
    try{
      const date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate()
      var dayWeek;
      
      if(date.getDay()==0){
        dayWeek = 'Domingo';
      }
      const yearInitial = year +'-01-01 00:00:00'
      const yearFinal = year +'-12-31 23:59:59'
      const monthInitial = year +'-0'+month+'-01 00:00:00'
      const monthFinal = year +'-0'+month+'-31 23:59:59'
      const dayInitial = year +'-0'+month+'-'+day+' 00:00:00'
      const dayFinal = year +'-0'+month+'-'+day+' 23:59:59'
     
      const resumeDelivered = await Database
      .count('* as delivered').from('orders')
      .where('order_delivered','=',true)

      const resumeNotDelivered = await Database
      .count('* as not_delivered').from('orders')
      .where('order_delivered','=',false)

      const resumeYear = await Database
      .count('* as year').from('orders')
      .whereBetween('delivery_date', [yearInitial, yearFinal])
      .where('order_delivered','=',false)

      const resumeMonth = await Database
      .count('* as month').from('orders')
      .whereBetween('delivery_date', [monthInitial, monthFinal])
      .where('order_delivered','=',false)

      const resumeDay = await Database
      .count('* as day').from('orders')
      .whereBetween('delivery_date', [dayInitial, dayFinal])
      .where('order_delivered','=',false)

      const resumeYearDelivered = await Database
      .count('* as year_delivered').from('orders')
      .whereBetween('delivery_date', [yearInitial, yearFinal])
      .where('order_delivered','=',true)

      const resumeMonthDelivered = await Database
      .count('* as month_delivered').from('orders')
      .whereBetween('delivery_date', [monthInitial, monthFinal])
      .where('order_delivered','=',true)

      const resumeDayDelivered = await Database
      .count('* as day_delivered').from('orders')
      .whereBetween('delivery_date', [dayInitial, dayFinal])
      .where('order_delivered','=',true)
      
      return Object.assign(resumeYear[0],resumeMonth[0],resumeDay[0],
        resumeYearDelivered[0],resumeMonthDelivered[0],resumeDayDelivered[0],
        resumeDelivered[0],resumeNotDelivered[0]) ;
      
    }catch(error){
        return response.status(500).json({message: error })
    };
};
}

module.exports = ResumeController
