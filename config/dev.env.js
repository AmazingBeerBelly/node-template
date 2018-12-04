const config = {
  mysql : {
    host: 'localhost',
    user: 'user',
    password: 'password',
    port: 3306,
    database: 'demo',
    dateString: false,
    connectionLimit: 10,
    queueLimit: 0
  },
  redis: {
    host: '127.0.0.1',
    port: '6379',
    password: 'password'
  },
}

module.exports = config