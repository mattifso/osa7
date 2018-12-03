// @flow
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

type blogType = { _id: string, title: string, author: string, url: string, comments: Array<string> }
type commentType = { blogId: string, comment: string }

const reducer = (store: Array<blogType> = [], action: { data: Array<blogType> | blogType | commentType, type: string }): Array<blogType> => {
  if (action.type === 'INIT_BLOGS' && Array.isArray(action.data)) {
    return action.data
  }
  if (action.type === 'ADD_COMMENT' && !Array.isArray(action.data) && action.data._id === undefined) {
    const blogId = action.data.blogId
    const comment = action.data.comment
    return store.map((b: blogType): blogType => {
      if (b._id !== blogId) {
        return b
      }
      return {
        ...b,
        comments: [...b.comments, comment]
      }
    })
  }
  if (action.type === 'ADD_BLOG' && !Array.isArray(action.data) && action.data.comment === undefined) {
    return [...store, action.data]
  }
  return store
}

export const initBlogs = () => {
  return async (dispatch: Function) => {
    const blogs: Array<blogType> = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog: { title: string, author: string, url: string }) => {
  return async (dispatch: Function) => {
    const createdBlog: ?blogType = await blogService.create(blog)
    if (createdBlog) {
      dispatch({
        type: 'ADD_BLOG',
        data: createdBlog
      })
      notify(false, `Added blog "${createdBlog.title}"`)(dispatch)
    }
  }
}

export const addComment = (blogId: string, comment: string) => {
  return async (dispatch: Function) => {
    const addedComment = await blogService.addComment(blogId, comment)
    console.log('Added comment for blog', blogId, addedComment, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { blogId: blogId, comment: comment }
    })
  }
}

export default reducer