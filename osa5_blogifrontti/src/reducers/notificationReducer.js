const reducer = (store = null, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.data
  }
  if (action.type === 'CLEAR_NOTIFICATION') {
    return null
  }

  return store
}

export const notify = (isError, message) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      data: { isError: isError, message: message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export default reducer