import { apiUrl } from '../apiConfig'
// import axios from 'axios'
// import { Credentials, User, Customer } from '../shared/types'
import { User, Customer } from '../shared/types'

// export const getRestaurants = async (user: User, restaurantInput: string) => {
//   const response = await fetch(`${apiUrl}/restaurants/`, {
//     method: 'Get',
//     headers: {
//       Authorization: 'Bearer ' + user.token,
//       'Content-Type': 'application/json'
//     }
//   })
//   if (response.status === 200) {
//     const responseJson = await response.json()
//     return responseJson
//   } else {
//     return false
//   }
// }

// export const createCustomer = (credentials: Credentials, customer: Customer) =>
//   fetch(`${apiUrl}/new-order/`, {
//     method: 'Post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Accept-Language': 'ru,en;q=0.9'
//     },
//     body: JSON.stringify({
//       credentials: {
//         email: `${credentials.email}`
//       }
//     })
//   })

export const createCustomer = async (customer: Customer, user: User) => {
  const token = user.token
  const response = await fetch(`${apiUrl}/customers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      // customer object
      name: customer.name,
      companyName: customer.companyName,
      address: customer.address,
      addressDetails: customer.email,
      phone: customer.phone,
      phoneExtension: customer.phoneExtension,
      description: customer.description,
      previousTip: customer.previousTip,
      adminDescription: customer.adminDescription
    })
  })
  if (response.status === 201) {
    const responseJson = await response.json()
    return { ...responseJson, status: 201 }
  } else {
    return false
  }
}

// SELCUK add search customers here
// export const searchPhone = async (phone: number, user: User) => {
//   // const token = SecureStore.getItemAsync('secure_token')
//   // console.log('searchByPhone network', user.token)

//   // const token = await SecureStore.getItemAsync('secure_token')
//   // console.log('apiurl', apiUrl)
//   const token = user.token
//   const response = await fetch(`${apiUrl}/customers/${phone}`, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token
//     }
//   })
//   if (response.status === 200) {
//     const responseJson = await response.json()
//     return responseJson
//   } else {
//     return false
//   }
// }
