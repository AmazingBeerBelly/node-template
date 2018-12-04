# node-template -- the node server template with koa2

### init steps:

1. npm install
2. eslint --init (choose standard style)

### eslint config (vscode preference setting workspace):

```
{
  "eslint.autoFixOnSave": true,
  "eslint.nodePath": "/usr/local/bin/node",
  "eslint.workingDirectories": ["/app/project"]
}
```

### mysql:
```
// get one row
await mysqlHelper.queryOne('selet * from users;')

// get rows
await mysqlHelper.query('selet * from users;')
await mysqlHelper.query('selet * from users where userId = ?', [userId])

// update, insert, query
let _pool, _conn
try {
  _pool = await mysqlHelper.getPool()
  _conn = await _pool.getConnection()
  await _conn.beginTransaction()
  await _conn.query('insert into user (userId, password) values (?)', [[userId, password]])
  await _conn.query('update user set password = ? where userId = ?', [password, userId])
  await _conn.commit()
} catch (err) {
  if (_conn) {
    await _conn.rollback()
  }
  console.error(err)
} finally {
  if (_conn) {
    await _conn.release()
  }
}
```

### redis
```
// get(name)
await redisHelper.get(userId)

// set(name, value, expire) 
await redisHelper.set(userId, 'userId', 5)  // 5 seconds
```

### sequelize
```
// create table 'users' with model User
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

// add user
sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
```