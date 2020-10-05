// @ts-ignore
import Validator from 'validator'
// @ts-ignore
const isEmpty = require('is-empty')

// @ts-ignore
module.exports = function validation(data: any) {
  let errors: any = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.farmID = !isEmpty(data.farmID) ? data.farmID : ''
  data.size = data.size >= 0 ? data.size : null

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name is required'
  }

  if (Validator.isEmpty(data.farmID)) {
    errors.farmID = 'name is required'
  }

  if (data.size === null) {
    errors.size = 'size is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
