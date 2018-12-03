// @flow
import axios from 'axios'
const baseUrl = '/api/blogs'

type blogType = { _id: string, title: string, author: string, url: string, comments: Array<string> }

let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject: { title: string, author: string, url: string }): Promise<?blogType> => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    const blogData: blogType = (response.data: blogType)
    return blogData
  } catch (error) {
    console.log('error occurred', error)
  }
}

const addComment = async (blogId: string, comment: string) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const url = [baseUrl, '/', blogId, '/', 'comments'].join('')
    const response = await axios.post(url, { comment: comment }, config)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
  }
}

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, addComment }