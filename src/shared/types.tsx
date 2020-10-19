export type Alert = {
  message?: string
  color?: string
}

export type User = {
  _id: string
  email: string
  phone: string
  fullName: string
  name: string
  token: string
}
export type DispatchRequest = {
  query: string
}
// export type Credentials = {
//   email: string
//   password: string
// }
export interface Credentials {
  email: string
  phone: string
  name: string
  fullName: string
  dob: string
}
export type Customer = {
  name: string
  companyName: string
  address: string
  addressDetails?: string
  email?: string
  phone: string
  phoneExtension?: string
  description?: string
  previousTip?: string
  adminDescription?: string
}
export type OrderDetails = {
  orderTotal: string
  tipTotal: string
  description: string
  adminOrderDescription: string
}
export type Restaurant = {
  _id: string
  restaurantName: string
  address: string
  responsiblePerson: string
  phone: string
}
export type Trip = {
  _id: string
  driver: User
  order: Order
}
export type Order = {
  tripId?: Trip
  restaurantId: Restaurant
  customerId: Customer
  source: string
  pPickUpDateTime: any
  pDropOfDateTime: any
  orderTotal: string
  tipTotal: string
  description: string
  adminOrderDescription: string
  orderStatus?: any
}
