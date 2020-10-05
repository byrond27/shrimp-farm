import axios from 'axios'

export const GET_ERRORS = 'GET_ERRORS'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_PONDS = 'GET_PONDS'

export const createPond = (data, dispatch) => {
  axios.post('/api/ponds', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const getPonds = (dispatch) => {
  axios
    .get('/api/ponds/')
    .then((res) => {
      dispatch(getCurrentPond(res.data))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const deletePond = (data, dispatch) => {
  axios.delete('/api/ponds/', { data: { id: data.id } }).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const editPond = (data, dispatch) => {
  axios.put('/api/ponds/', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
  getPonds(dispatch)
}

export const getCurrentPond = (ponds) => {
  return {
    type: GET_PONDS,
    payload: ponds,
  }
}
