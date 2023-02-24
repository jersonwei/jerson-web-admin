export function is (val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isArray (val) {
  return val && Array.isArray(val)
}

export function isFunction (val) {
  return typeof val === 'function'
}

export function isString (val) {
  return is(val, 'String')
}

export function isNumber (val) {
  return is(val, 'Number')
}

export function isDef (val) {
  return typeof val !== 'undefined'
}
