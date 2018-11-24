import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const reducer = (store = null, action) => {
  if (action.type === 'USER_LOGGED_IN') {
    return action.data
  }
  if (action.type === 'USER_LOGGED_OUT') {
    return null
  }
  if (action.type === 'USER_LOADED') {
    return action.data
  }

  return store
}

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGGED_IN',
        data: user
      })
    } catch (error) {
      notify(true, 'Invalid username or password')(dispatch)
    }
  }
}

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    dispatch({
      type: 'USER_LOGGED_OUT'
    })
    notify(false, `Logged out`)(dispatch)
  }
}

export const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOADED',
        data: user
      })
    }
  }
}

export default reducer