/**
 * @name Application
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

// External Dependencies
var Boxa = require('boxa')
var path = require('path')

// Helper
var Helper = require('./helper')

/**
 * Blade Class
 */
class Blade extends Boxa {

	/**
	 * Blade Constructor
	 *
	 * @param {string} basePath
	 */
	constructor (basePath = '') {
		super()

		// Register Paths
		Helper.registerPaths(basePath)

		// Load Core Service Providers
		Helper.registerCoreProviders(this)

		// Map Application to Container
		Blade.setInstance(this)

		// Global Helper Methods
		Helper.registerGlobals(this)
	}

	/**
	 * Boot the application
	 *
	 * @param {AppData} appdata
	 * @param {Closure} callback
	 *
	 * @public
	 */
	slash (appdata = {}, callback) {

		// Load Service Providers
		Helper.registerProviders(appdata, this)

		this.resolve('Axe/Events').fire('Application_Booting')

		if (typeof (callback) === 'function') {
			callback()
		}

		this.resolve('Axe/Events').fire('Application_Booted')
	}

	/**
	 * Checks if application is running on local environment
	 *
	 * @returns {Boolean}
	 *
	 * @public
	 */
	isLocal () {
		return process.env.APP_ENV === 'dev' || process.env.APP_ENV === 'develop' || process.env.NODE_ENV === 'dev'
	}

	/**
	 * Checks if application is running on production environment
	 *
	 * @returns {Boolean}
	 *
	 * @public
	 */
	isProduction () {
		return process.env.APP_ENV === 'production'
	}

	/**
	 * Checks if application is running test
	 *
	 * @returns {Boolean}
	 *
	 * @public
	 */
	isTesting () {
		return process.env.NODE_ENV === 'test'
	}

	/**
	 * Checks if application has debug environment
	 *
	 * @returns {Boolean}
	 *
	 * @public
	 */
	isDebugging () {
		return process.env.NODE_ENV === 'debug'
	}

	/**
	 * Returns path string relative to base path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	basePath (...args) {
		return path.join(Helper.basePath, ...args)
	}

	/**
	 * Returns path string relative to public path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	publicPath (...args) {
		return path.join(this.basePath('public'), ...args)
	}

	/**
	 * Returns path string relative to system path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	systemPath (...args) {
		return path.join(this.basePath('system'), ...args)
	}

	/**
	 * Returns path string relative to config path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	configPath (...args) {
		return path.join(this.basePath('config'), ...args)
	}

	/**
	 * Returns path string relative to storage path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	storagePath (...args) {
		return path.join(this.basePath('storage'), ...args)
	}

	/**
	 * Returns path string relative to app path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	appPath (...args) {
		return path.join(this.basePath('app'), ...args)
	}

	/**
	 * Returns path string relative to resources path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	resourcesPath (...args) {
		return path.join(this.basePath('resources'), ...args)
	}

	/**
	 * Returns path string relative to routes path
	 *
	 * @param {Array} paths
	 *
	 * @public
	 */
	routesPath (...args) {
		return path.join(this.basePath('routes'), ...args)
	}

}

module.exports = Blade
