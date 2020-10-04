import axios from 'axios'

export const GET_ERRORS = 'GET_ERRORS'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_FARMS = 'GET_FARMS'

export const createFarm = (data, dispatch) => {
  axios.post('/api/farms', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const getFarms = (dispatch) => {
  axios
    .get('/api/farms/')
    .then((res) => {
      dispatch(getCurrentFarm(res.data))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

export const deleteFarm = (data, dispatch) => {
  axios.delete('/api/farms/', { data: { id: data.id } }).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const editFarm = (data, dispatch) => {
  axios.put('/api/farms/', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
  getFarms(dispatch)
}

export const getCurrentFarm = (farms) => {
  return {
    type: GET_FARMS,
    payload: farms,
  }
}
