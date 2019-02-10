
var ServiceProvider = require('../../../lib/Application/ServiceProvider')

class AnotherFakeService extends ServiceProvider {

	register () {
		this.app.singleton('Axe/FakeService', () => {
			return 'Hello, Axe!'
		})
	}

}

module.exports = AnotherFakeService
