import { GET_ERRORS, GET_FARMS } from '../../actions/Farms'

export const FarmReducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      }

    case GET_FARMS:
      return {
        ...state,
        farms: action.payload,
      }
    default:
      return state
  }
}
