/**
 * @name LogProvider
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Application/ServiceProvider')
var Logger = require('./Logger')

class LogProvider extends ServiceProvider{

	register () {

		this.app.singleton('Axe/Log', function (app) {
			var config = app.in('Axe/Config').get('log')
			return new Logger(config)
		})

	}

}

module.exports = LogProvider
