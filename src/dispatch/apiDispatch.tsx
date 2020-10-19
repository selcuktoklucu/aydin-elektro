import { User, Order } from '../shared/types'
import apiUrl from '../apiConfig'

export const getDrivers = async (user: User) => {
  const response = await fetch(`${apiUrl}/users/`, {
    method: 'Get',
    headers: {
      Authorization: 'Bearer ' + user.token,
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    const responseJson = await response.json()
    return responseJson
  } else {
    return false
  }
}
export const getOrders = async (user: User, query: String) => {
  const response = await fetch(`${apiUrl}/orders?query=${query}`, {
    method: 'Get',
    headers: {
      Authorization: 'Bearer ' + user.token,
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    const responseJson = await response.json()
    return responseJson
  } else {
    return false
  }
}

export const createTrip = async (user: User, order: Order, driver: User) => {
  const token = user.token
  const response = await fetch(`${apiUrl}/trips/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      trip: {
        driver,
        order
      }
    })
  })
  if (response.status === 201) {
    //const responseJson = await response.json()
    return response
  } else {
    return false
  }
}
