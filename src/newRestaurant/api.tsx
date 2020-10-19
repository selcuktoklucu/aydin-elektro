import { User } from '../shared/types'
import apiUrl from '../apiConfig'

type Data = {
  restaurantName: number
  responsiblePerson: string
  address: string
  phone: string
  description: string
  adminDescription: string
}

export const saveTheRestaurant = async (
  restaurantName: number,
  address: string,
  responsiblePerson: string,
  phone: string,
  description: string,
  adminDescription: string,
  user: User
) => {
  const data = {
    restaurantName,
    address,
    responsiblePerson,
    phone,
    description,
    adminDescription
  }
  // openMap({ end: this.state.currentAddress, navigate_mode: "navigate" });
  postRestaurant(data, user)
}

export const postRestaurant = async (data: Data, user: User) => {
  const token = user.token

  const response = await fetch(`${apiUrl}/restaurants/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      restaurant: {
        restaurantName: data.restaurantName,
        address: data.address,
        responsiblePerson: data.responsiblePerson,
        phone: data.phone,
        description: data.description,
        adminDescription: data.adminDescription
      }
    })
  })
  return response
}
