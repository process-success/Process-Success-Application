var assert = require('assert');
var expect = chai.expect;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


//Storage tests
describe('ps.storage', function() {

	describe('set and get test', function() {
		it('should return -1 when the value is not present', function() {
			var x=1;
			expect(x).to.equal(1);
		});
	});

});

