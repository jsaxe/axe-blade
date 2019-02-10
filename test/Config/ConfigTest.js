'use strict'

var expect = require('chai').expect;

var Config = require('../../src/Config/Config')
var Application = require('../../src/Application/Application')

describe('Config', function () {

	var app = new Application('test/Config/TestBasePath')
	var config = new Config(app.use('axe.path.config'))

	it('should preload console files from config dir', function () {

		var expectedConfigPath = require('path').resolve('./test/Config/TestBasePath/config')
		expect(config._configPath).to.equal(expectedConfigPath)

	})

	describe('get()', function () {

		it('should fetch the config\'s setting', function () {

			var expectedValue = {
				foo : 'bar'
			}
			expect(config.get('test')).to.deep.equal(expectedValue)
			expect(config.get('test.foo')).to.equal('bar')

		})

		it('should return default value when config is not found', function () {
			expect(config.get('test.baz', 'tutti')).to.equal('tutti')
		})

	})

})
