import { apiUrl } from '../apiConfig'
import { User, Order } from '../shared/types'

export const getRestaurants = async (user: User, restaurantInput: string) => {
  const response = await fetch(`${apiUrl}/restaurants/`, {
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
export const createOrder = async (order: Order, user: User) => {
  const token = user.token
  const response = await fetch(`${apiUrl}/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      ...order
    })
  })
  if (response.status === 201) {
    const responseJson = await response.json()
    return { ...responseJson, status: 201 }
  } else {
    return false
  }
}

export const searchPhone = async (phone: number, user: User) => {
  const token = user.token
  const response = await fetch(`${apiUrl}/customers/${phone}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  if (response.status === 200) {
    const responseJson = await response.json()
    return responseJson
  } else {
    return false
  }
}

// export const getSuggestions = async (address: string, user: User) => {
//   const token = user.token
//   const response = await fetch(`${apiUrl}/google-maps-masker/${address}`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token
//     }
//   })
//   if (response.status === 200) {
//     const responseJson = await response.json()
//     console.log('responseJson', responseJson)
//     return responseJson
//   } else {
//     return false
//   }
// }

type Data = {
  phoneNumber: number
  address: string
  name: string
}
export const saveTheAddress = async (
  phoneNumber: number,
  address: string,
  name: string,
  user: User
) => {
  const data = {
    phoneNumber,
    address,
    name
  }
  // openMap({ end: this.state.currentAddress, navigate_mode: "navigate" });
  postAddress(data, user)
}

export const postAddress = async (data: Data, user: User) => {
  const token = user.token

  const response = await fetch(`${apiUrl}/customers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      customer: {
        name: data.name,
        phone: data.phoneNumber,
        currentAddress: data.address
      }
    })
  })

  const responseJson = await response.json()
  console.log(
    'reponse postAddress',
    responseJson,
    'responseCode',
    response.status
  )
  return response.status === 1 ? true : false
}
