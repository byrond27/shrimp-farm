// @ts-ignore
import Validator from 'validator'
// @ts-ignore
const isEmpty = require('is-empty')

// @ts-ignore
module.exports = function validation(data: any) {
  let errors: any = {}
  data.name = !isEmpty(data.name) ? data.name : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
