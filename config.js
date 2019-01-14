const config = process.env.NODE_ENV === 'production' ? require('./config/prod.env') : require('./config/dev.env')
module.exports = config
