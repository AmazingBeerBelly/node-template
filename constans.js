const errorType = {
  AUTH_FAILED: {
    code: 401,
    message: '用户认证失败（token过期或无效），请重新登录'
  },
}

module.exports = {
  errorType
}
