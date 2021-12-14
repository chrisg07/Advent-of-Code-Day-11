var assert = require('assert');
const fs = require('fs')
var HeightMap = require('./HeightMap.js')

describe('HeightMap', function() {
  describe('should read input and determine risk points', function() {
    it('reads input and determines answer', function(done) {
      fs.readFile('test-input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      const lines = data.split(/\r?\n/).map(line => line.trim());
      const heightMap = new HeightMap(lines);
			assert.equal(heightMap.lowPoints.length, 4)
			assert.equal(heightMap.answer, 1656)
      done();
    })
    });
  });
});