let redis = require('async-redis')
const config = require('../config')

let client

const getConn = function () {
  if (!client) {
    client = redis.createClient({ 'host': config.redis.host, 'port': config.redis.port, retry_strategy: _retry })
    client.auth(config.redis.password)
    client.on('error', err => {
      console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err)
    })
  }
  return client
}

const set = async (key, value, time) => {
  if (!key || !value) {
    return
  }
  await getConn().set(key, value)
  if (time && time > 0) {
    getConn().expire(key, time)
  }
}

const get = async key => {
  if (!key) {
    return ''
  }
  let result = await getConn().get(key)
  return result
}

const del = async key => {
  if (!key) {
    return ''
  }
  let result = await getConn().del(key)
  return result
}

const incrby = async (key, num) => {
  if (!key || typeof num !== 'number') {
    return null
  }
  let result = await getConn().incrby(key, num)
  return result
}

const decrby = async (key, num) => {
  if (!key || typeof num !== 'number') {
    return null
  }
  let result = await getConn().decrby(key, num)
  return result
}

function _retry (options) {
  if (options.error && options.error.code === 'ECONNREFUSED') {
    // End reconnecting on a specific error and flush all commands with
    // a individual error
    return new Error('The server refused the connection')
  }
  if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    return new Error('Retry time exhausted')
  }
  if (options.attempt > 10) {
    // End reconnecting with built in error
    return undefined
  }
  // reconnect after
  return Math.min(options.attempt * 100, 3000)
}

module.exports = {
  set,
  get,
  del,
  incrby,
  decrby
}
