const cache = require('./cache')
const expect = require('chai').expect

describe('cache', function () {
  describe('set', function () {
    it('should set a key-value pair in the cache', async function () {
      let result = await cache.set('foo', 'bar')
      expect(result).to.equal('OK')
    })
    after(function () {
      cache.del('foo')
    })
  })
  describe('get', function () {
    before(function () {
      cache.set('foo', 'bar')
    })
    it('should retrieve the value associated with key', async function () {
      let result = await cache.get('foo')
      expect(result).to.equal('bar')
    })
    after(function () {
      cache.del('foo')
    })
  })
  after(function () {
    cache.disconnect()
  })
})
