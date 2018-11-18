import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'INIT_BLOGS') {
    return action.data
  }
  if (action.type === 'ADD_COMMENT') {
    const blog = store.find(b => b._id === action.data.blogId)
    blog.comments.push(action.data.comment)
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

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const addedComment = await blogService.addComment(blogId, comment)
    console.log('Added comment for blog', blogId, addedComment, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { blogId: blogId, comment: comment }
    })
  }
}

export default reducer