/**
 * @name EventProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Application/ServiceProvider')
var EventEmitter = require('./Emitter')

class EventProvider extends ServiceProvider{

	register () {

		this.app.singleton('Axe/Events', function (app) {
			var config = app.in('Axe/Config').get('event')
			return new EventEmitter(app, config)
		})

	}

}

module.exports = EventProvider
