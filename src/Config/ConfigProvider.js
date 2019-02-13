/**
 * @name ConfigProvider
 * @author Jeevan Prakash Pant <jeevanppant@gmail.com>
 */

'use strict'

var ServiceProvider = require('../Application/ServiceProvider')
var Config = require('./Config')

class ConfigProvider extends ServiceProvider{

	register () {

		this.app.singleton('Axe/Config', function (app) {
			return new Config(app.configPath())
		})

	}

}

module.exports = ConfigProvider
