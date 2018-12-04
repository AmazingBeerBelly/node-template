const config = process.env.NODE_ENV === 'production' ? require('./config/dev.env') : require('./config/dev.env')
module.exports = config
