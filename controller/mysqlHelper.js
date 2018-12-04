const mysql2 = require('mysql2/promise')
const config = require('../config')

let mysql2Pool

/**
 * get mysql pool
 */
const getPool = () => {
  if (mysql2Pool) {
    return mysql2Pool
  }
  mysql2Pool = mysql2.createPool(config.mysql)
  console.log('create mysql pool success')
  return mysql2Pool
}

/**
 * mysql查询方法
 * @param {*} sql  sql
 * @param {*} args args
 */
const query = async function (sql, args) {
  if (!mysql2Pool) {
    mysql2Pool = await getPool()
  }
  let queryResult = await mysql2Pool.query(sql, args)
  return queryResult
}

/**
 * 公共查询方法 取一条记录
 * @param {*} sql  sql
 * @param {*} args args
 * @param {*} type 要获得的字段,没有则返回整条记录
 */
const queryOne = async function (sql, args, type = false) {
  let rs = await query(sql, args)
  if (type) {
    if (rs[0][0]) {
      return rs[0][0][type] || false
    }
    return false
  }
  return rs[0][0] || false
}

module.exports = {
  getPool,
  query,
  queryOne
}
