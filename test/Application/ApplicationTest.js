'use strict'

var expect = require('chai').expect;

var app = new (require('../../src/Application/Application'))('./')
var Boxa = require('boxa')

describe('Application', function () {

	it('should be instance of Boxa', function () {
		expect(app).to.be.instanceof(Boxa)
	})

	it('should be in testing environment', function () {
		expect(app.isTesting()).to.equal(true)
	})

	it('should be in debug environment', function () {
		expect(app.isDebugging()).to.equal(false)
	})

	it('should be not be in local environment', function () {
		expect(app.isLocal()).to.equal(false)
	})

	it('should be not be in production environment', function () {
		expect(app.isProduction()).to.equal(false)
	})

	describe('publicPath()', function () {

		it('should return path string to public relative to base path', function () {
			expect(app.publicPath()).to.equal(require('path').resolve('./public'))
			expect(app.publicPath('css')).to.equal(require('path').resolve('./public/css'))
		})

	})

	describe('systemPath()', function () {

		it('should return path string to system relative to base path', function () {
			expect(app.systemPath()).to.equal(require('path').resolve('./system'))
			expect(app.systemPath('boot')).to.equal(require('path').resolve('./system/boot'))
		})

	})

	describe('configPath()', function () {

		it('should return path string to config relative to base path', function () {
			expect(app.configPath()).to.equal(require('path').resolve('./config'))
			expect(app.configPath('db')).to.equal(require('path').resolve('./config/db'))
		})

	})

	describe('storagePath()', function () {

		it('should return path string to storage relative to base path', function () {
			expect(app.storagePath()).to.equal(require('path').resolve('./storage'))
			expect(app.storagePath('db')).to.equal(require('path').resolve('./storage/db'))
		})

	})

	describe('appPath()', function () {

		it('should return path string to app relative to base path', function () {
			expect(app.appPath()).to.equal(require('path').resolve('./app'))
			expect(app.appPath('Controllers')).to.equal(require('path').resolve('./app/Controllers'))
		})

	})

	describe('resourcesPath()', function () {

		it('should return path string to resources relative to base path', function () {
			expect(app.resourcesPath()).to.equal(require('path').resolve('./resources'))
			expect(app.resourcesPath('img')).to.equal(require('path').resolve('./resources/img'))
		})

	})

	describe('routesPath()', function () {

		it('should return path string to routes relative to base path', function () {
			expect(app.routesPath()).to.equal(require('path').resolve('./routes'))
			expect(app.routesPath('socket')).to.equal(require('path').resolve('./routes/socket'))
		})

	})

})
