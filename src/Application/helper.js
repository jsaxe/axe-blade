/**
 * @name ApplicationHelper
 */

var Helper = module.exports = {}

// Dependencies
var _ = require('lodash')

/**
 * Registers framework paths
 * @private
 *
 * @param {string} basePath
 */
Helper.registerPaths = function (basePath) {
	Helper.basePath = require('path').resolve(_.trimEnd(basePath, '\/'))
}


/**
 * Registers core providers for booting framework
 * @private
 */
Helper.registerCoreProviders = function (app) {

	var coreProviders = [
		require('../Events/Event'),				// Event Service
		require('../Log/Log'),					// Log Service
		require('../Env/EnvProvider'),			// Env Service
		require('../Config/ConfigProvider'),	// Config Service
	]

	for (var provider of coreProviders) {
		(new provider(app)).register()
	}
}

/**
 * Registers global functions
 * @private
 */
Helper.registerGlobals = function (scope) {

	// This is the function that's going to oil up the whole framework
	// ==================================================================
	// |
	// | Resolves registered/mapped providers.
	// |
	// ==================================================================
	global.use = scope.use.bind(scope)

	// ==================================================================
	// |
	// | Maps the content to given provider in the app container.
	// |
	// ==================================================================
	global.map = scope.map.bind(scope)

	// ==================================================================
	// |
	// | Globl Application Instance
	// |
	// ==================================================================
	global.app = function (name) {
		return !!name ? scope.use(name) : scope
	}

}

/**
 * Registers the service providers defined in appdata
 * @private
 *
 * @param {AppData} appdata
 */
Helper.registerProviders = function (appdata, container) {

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
			var providerPath = container.basePath(provider) + '.js'
			if (require('fs').existsSync(providerPath)) {
				provider = container.basePath(provider)
			}
			provider = require(provider)
		}

		var obj = new provider(container)
		if (typeof obj.register === 'function')
			obj.register()
	})

	// Regisering Aliases
	_.each(appdata.aliases, (provider, alias) => {
		container.alias(alias, provider)
	})

}
