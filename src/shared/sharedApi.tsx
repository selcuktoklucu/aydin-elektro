import { apiUrl } from '../apiConfig'
import { User } from './types'

export const getSuggestions = async (input: string, user: User) => {
  const token = user.token
  const response = await fetch(`${apiUrl}/google-maps-masker/${input}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  if (response.status === 200) {
    const responseJson = await response.json()
    console.log('responseJson', responseJson)
    return responseJson
  } else {
    return false
  }
}
