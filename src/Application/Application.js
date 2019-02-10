/**
 * @name Application
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

// External Dependencies
var Boxa = require('boxa')
var path = require('path')
var _ = require('lodash')

// Internal Dependencies
var EventProvider = require('../Events/Event')
var LogProvider = require('../Log/Log')
var EnvProvider = require('../Env/EnvProvider')
var ConfigProvider = require('../Config/ConfigProvider')

class Blade extends Boxa {

	/**
	 * Blade Constructor
	 *
	 * @param {string} basePath
	 */
	constructor (basePath = '') {
		super()

		this._registerPaths(basePath)

		Blade.setInstance(this)
		this.map('app', this)

		this._loadCoreProviders()
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

		this._registerGlobals()

		this._registerProviders(appdata)

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
		return process.env.APP_ENV === 'dev' || process.env.NODE_ENV === 'dev'
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
	 * Registers framework paths
	 * @private
	 *
	 * @param {string} basePath
	 */
	_registerPaths (basePath) {

		this.__basePath = path.resolve(_.trimEnd(basePath, '\/'))

		this.map('axe.path', this.basePath())
		this.map('axe.path.config', this.basePath('config'))
		this.map('axe.path.public', this.basePath('public'))
		this.map('axe.path.system', this.basePath('system'))
		this.map('axe.path.storage', this.basePath('storage'))
		this.map('axe.path.app', this.basePath('app'))
		this.map('axe.path.resources', this.basePath('resources'))

	}

	/**
	 * Returns path string relate to base path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	basePath (dir = '') {
		return path.join(this.__basePath, dir)
	}

	/**
	 * Returns path string relate to public path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	publicPath (dir = '') {
		return path.join(this.use('axe.path.public'), dir)
	}

	/**
	 * Returns path string relate to system path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	systemPath (dir = '') {
		return path.join(this.use('axe.path.system'), dir)
	}

	/**
	 * Returns path string relate to config path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	configPath (dir = '') {
		return path.join(this.use('axe.path.config'), dir)
	}

	/**
	 * Returns path string relate to storage path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	storagePath (dir = '') {
		return path.join(this.use('axe.path.storage'), dir)
	}

	/**
	 * Returns path string relate to app path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	appPath (dir = '') {
		return path.join(this.use('axe.path.app'), dir)
	}

	/**
	 * Returns path string relate to resources path
	 *
	 * @param {string} dir
	 *
	 * @public
	 */
	resourcesPath (dir = '') {
		return path.join(this.use('axe.path.resources'), dir)
	}

	/**
	 * Loads core providers for booting framapp.registerRoutes()ework
	 * @private
	 */
	_loadCoreProviders () {
		for (var provider of [ EnvProvider, ConfigProvider, EventProvider, LogProvider ]) {
			(new provider(this)).register()
		}
	}

	/**
	 * Registers the service providers defined in appdata
	 * @private
	 *
	 * @param {AppData} appdata
	 */
	_registerProviders (appdata) {

		if (!appdata.providers) {
			throw Error('Invalid AppData Provided. AppData doesn\'t implement `providers` property.')
		}
		var providers = appdata.providers

		if (appdata.cliProviders) {
			providers = providers.concat(appdata.cliProviders)
		}

		// Registering Providers
		providers.forEach(provider => {
			if (typeof provider !== 'function'){
				var providerPath = this.basePath(provider) + '.js'
				if (require('fs').existsSync(providerPath)) {
					provider = this.basePath(provider)
				}
				provider = require(provider)
			}

			var obj = new provider(this)
			if (typeof obj.register === 'function')
				obj.register()
		})

		// Regisering Aliases
		_.each(appdata.aliases, (provider, alias) => {
			this.alias(alias, provider)
		})

	}

	/**
	 * Registers global functions
	 * @private
	 */
	_registerGlobals () {

		// This is the function that's going to oil up the whole framework
		// ==================================================================
		// |
		// | Resolves registered/mapped providers. If provider is not mapped
		// | or registered, node module shall be imported.
		// |
		// ==================================================================
		global.use = function (provider, params = []) {
			var provider = this.resolveAlias(provider)
			if (this.isRegistered(provider) || this.isMapped(provider)) {
				return this.use(provider, params)
			}else{
				return require(provider)
			}
		}.bind(this)

		// ==================================================================
		// |
		// | Maps the content to given provider in the app container.
		// |
		// ==================================================================
		global.map = function (provider, content) {
			this.map(provider, content)
		}.bind(this)

	}

}

module.exports = Blade
