import userService from '../services/users'

const reducer = (store = [], action) => {
  if (action.type === 'INIT_USERS') {
    return action.data
  }
  return store
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer