export const validateLoginFormPassword = () => {
  return (rule, value, callback) => {
    // eslint-disable-next-line
    // const pattern = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/
    const pattern = /^[\w_-]{6,16}$/
    if (!pattern.test(value)) {
      callback(new Error('密码为6-16位以大小写字母或数字开头'))
    } else {
      callback()
    }
  }
}

export const validateMobileNumber = () => {
  return (rule, val, callback) => {
    const pattern = /^1[3-9]\d{9}$/
    if (!pattern.test(val)) {
      callback(new Error('请输入合法手机号'))
    } else {
      callback()
    }
  }
}
