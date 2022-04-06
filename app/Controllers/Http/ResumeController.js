'use strict'

const Database = use('Database')

const Resume = use("App/Models/Resume");

class ResumeController {

  async financial({response}){
    try {
      const date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate()

      const yearInitial = year +'-01-01 00:00:00'
      const yearFinal = year +'-12-31 23:59:59'
      const monthInitial = year +'-0'+month+'-01 00:00:00'
      if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
        var monthFinal = year +'-0'+month+'-31 23:59:59'
      }
      else if (month==2){
        var monthFinal = year +'-0'+month+'-28 23:59:59'
      }
      else{
        var monthFinal = year +'-0'+month+'-30 23:59:59'
      }
      const dayInitial = year +'-0'+month+'-'+day+' 00:00:00'
      const dayFinal = year +'-0'+month+'-'+day+' 23:59:59'

      const financialReceived = await Database
      .from('list_products')
      .sum('value as value_received')
      .whereIn('order_id',[Database
                          .from('orders')
                          .where('order_delivered','=',true)
                          .select('id')])
                          
      const financialNotReceived = await Database
      .from('list_products')
      .sum('value as value_notReceived')
      .whereIn('order_id',[Database
                          .from('orders')
                          .where('order_delivered','=',false)
                          .select('id')])

      const financialYear = await Database
      .from('list_products')
      .sum('value as year_notReceived')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [yearInitial, yearFinal])
                          .where('order_delivered','=',false)
                          .select('id')])
                          
      const FinancialMonth = await Database
      .from('list_products')
      .sum('value as month_notReceived')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [monthInitial, monthFinal])
                          .where('order_delivered','=',false)
                          .select('id')])

      const financialDay = await Database
      .from('list_products')
      .sum('value as day_notReceived')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [dayInitial, dayFinal])
                          .where('order_delivered','=',false)
                          .select('id')])
                          
      const financialYearReceived = await Database
      .from('list_products')
      .sum('value as year_Received')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [yearInitial, yearFinal])
                          .where('order_delivered','=',true)
                          .select('id')])

      const financialMonthReceived = await Database
      .from('list_products')
      .sum('value as month_Received')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [monthInitial, monthFinal])
                          .where('order_delivered','=',true)
                          .select('id')])
                          
      const financialDayReceived = await Database
      .from('list_products')
      .sum('value as day_Received')
      .whereIn('order_id',[Database
                          .from('orders')
                          .whereBetween('delivery_date', [dayInitial, dayFinal])
                          .where('order_delivered','=',true)
                          .select('id')])
             
      if(financialReceived[0].value_received == null){
        financialReceived[0].value_received = 0
      }
      if(financialNotReceived[0].value_notReceived == null){
        financialNotReceived[0].value_notReceived = 0
      }
      if(financialYear[0].year_notReceived == null){
        financialYear[0].year_notReceived = 0
      }
      if(FinancialMonth[0].month_notReceived == null){
        FinancialMonth[0].month_notReceived=0
      }
      if(financialDay[0].day_notReceived == null){
        financialDay[0].day_notReceived = 0
      }
      if(financialYearReceived[0].year_Received == null){
        financialYearReceived[0].year_Received = 0
      }
      if(financialMonthReceived[0].month_Received == null){
        financialMonthReceived[0].month_Received = 0
      }
      if(financialDayReceived[0].day_Received == null){
        financialDayReceived[0].day_Received = 0
      }

      return Object.assign(financialReceived[0],financialNotReceived[0],financialYear[0],
        FinancialMonth[0],financialDay[0],financialYearReceived[0],
        financialMonthReceived[0],financialDayReceived[0]) ;

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
      if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
        var monthFinal = year +'-0'+month+'-31 23:59:59'
      }
      else if (month==2){
        var monthFinal = year +'-0'+month+'-28 23:59:59'
      }
      else{
        var monthFinal = year +'-0'+month+'-30 23:59:59'
      }
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
