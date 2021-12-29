import axios from 'axios'
const loginUrl = '/api/login'
const baseUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { login, getAll }