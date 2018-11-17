import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'INIT_BLOGS') {
    return action.data
  }
  return store
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer