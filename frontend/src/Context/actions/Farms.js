import axios from 'axios'

export const GET_ERRORS = 'GET_ERRORS'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_FARMS = 'GET_FARMS'

export const createFarm = (data, dispatch) => {
  axios.post('/api/farms/create', data).catch((err) =>
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
      console.log(res.data)
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
  axios.post('/api/farms/delete/', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const editFarm = (data, dispatch) => {
  axios.post('/api/farms/edit', data).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  )
}

export const getCurrentFarm = (farms) => {
  return {
    type: GET_FARMS,
    payload: farms,
  }
}
