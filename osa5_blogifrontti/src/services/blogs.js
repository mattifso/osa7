import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
  }
}

const addComment = async (blogId, comment) => {
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

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export default { getAll, setToken, create, addComment }