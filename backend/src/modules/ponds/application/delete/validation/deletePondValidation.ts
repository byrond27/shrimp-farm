import Validator from 'validator'
const isEmpty = require('is-empty')

module.exports = function validation(data: any) {
  let errors: any = {}
  data.id = !isEmpty(data.id) ? data.id : ''

  if (Validator.isEmpty(data.id)) {
    errors.id = 'ID is required'
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
