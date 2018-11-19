import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'INIT_BLOGS') {
    return action.data
  }
  if (action.type === 'ADD_COMMENT') {
    return store.map(b => {
      if (b._id !== action.data.blogId) {
        return b
      }
      return {
        ...b,
        comments: [...b.comments, action.data.comment]
      }
    })
  }
  if (action.type === 'ADD_BLOG') {
    return [...store, action.data]
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

export const addBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: createdBlog
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