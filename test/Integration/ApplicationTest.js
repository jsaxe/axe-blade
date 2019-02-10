'use strict'

var expect = require('chai').expect;

var Axe = require('../../').Application;

var app = new Axe('test/Integration')

describe('Axe', function () {

	it ('should not slash without AppData', function () {
		expect( () => app.slash()).to.throw()
	})


	it('should slash with valid AppData', function () {

		var fakeKernel = {
			providers : [
				FakeServiceProvider,
				'Fakes/AnotherFakeService',
				FakeServiceWithoutRegisterProvider,
			],

			cliProviders : [
				'lodash'
			],

			aliases : {
				Fake: 'Axe/FakeService'
			},
		}

		var fakeKernelWithOutCLI = {
			providers : [
				FakeServiceProvider,
				'Fakes/AnotherFakeService',
				FakeServiceWithoutRegisterProvider,
			],
			aliases : {
				Fake: 'Axe/FakeService'
			},
		}

		// without callback
		app.slash(fakeKernel)
		// with callback
		app.slash(fakeKernelWithOutCLI, () => {
			use('Axe/Events').fire('Completed')
			use('Axe/Log')
			use('Axe/Env')
		})

	})

})


var ServiceProvider = require('../../lib/Application/ServiceProvider')

class FakeServiceProvider extends ServiceProvider {

	register () {
		describe('FakeServiceProvider', function () {
			it('should have app instance', function () {

				expect(this.app).to.deep.equal(app)

			}.bind(this)) // Required, because `it` has scope of `this` to TestSuite
		}.bind(this))  // Required, because `describe` has scope of `this` to TestSuite
	}

}

class FakeServiceWithoutRegisterProvider extends ServiceProvider {
	//
}
