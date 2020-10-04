// @ts-ignore
import Validator from 'validator'
// @ts-ignore
const isEmpty = require('is-empty')

// @ts-ignore
module.exports = function validation(data: any) {
  let errors: any = {}
  data.id = !isEmpty(data.id) ? data.id : ''
  data.name = !isEmpty(data.name) ? data.name : ''
  data.size = !isEmpty(data.size) ? data.size : ''

  if (Validator.isEmpty(data.id)) {
    errors.id = 'id is required'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name is required'
  }

  if (Validator.isEmpty(data.size)) {
    errors.size = 'size is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}