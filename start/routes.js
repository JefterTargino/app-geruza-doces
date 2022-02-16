'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/teste', () => {
  return { greeting: 'Hello world in JSON' }
});


Route.group(() => {
                    Route.post('/','OrderController.create')
                    Route.delete('/:id', 'OrderController.delete');
                    Route.put('/:id', 'OrderController.update');
                    Route.get('/', 'OrderController.index');
                    Route.get('/:id', 'OrderController.show');
                  }
              )
              .prefix('order');

Route.group(() => {
                    Route.post('/','ProductController.create')
                    Route.delete('/:id', 'ProductController.delete');
                    Route.put('/:id', 'ProductController.update');
                    Route.get('/', 'ProductController.index');
                    Route.get('/list/', 'ProductController.list');
                    Route.get('/:id', 'ProductController.show');//.as('teste');
                  }
              )
              .prefix('product');