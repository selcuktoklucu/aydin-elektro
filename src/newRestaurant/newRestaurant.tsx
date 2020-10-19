import React, { useState, useEffect } from 'react'
// import { History } from 'history'
// import { useHistory } from 'react-router-dom'

//import { signIn } from '../api'
// import { Credentials, User } from '../shared/types'
import { User } from '../shared/types'
import Button from 'react-bootstrap/Button'

import { getSuggestions } from '../shared/sharedApi'
import { saveTheRestaurant } from './api'

type Props = {
  user: User
  alerts: Array<any>
  setAlerts: any
}
type Suggestion = {
  description: string
  id: string
}

const NewRestaurant: React.FC<Props> = props => {
  const [restaurantName, setRestaurantName] = useState()
  const [address, setAddress] = useState()
  const [responsiblePerson, setResponsiblePerson] = useState()
  const [phone, setPhone] = useState()
  const [description, setDescription] = useState()
  const [adminDescription, setAdminDescription] = useState()

  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    async function fetchForSuggestedAddresses() {
      if (address && address.length > 4) {
        const response = await getSuggestions(address, props.user)
        if (response === false) {
          props.setAlerts([
            ...props.alerts,
            {
              title:
                'getSuggestions failed. Please change the input and try again',
              variant: 'danger'
            }
          ])
        }
        console.log('retrieved addresses', response.response)
        const responseArr = response.response
        setSuggestions([...responseArr])
      }
    }
    fetchForSuggestedAddresses()
  }, [address, props])

  const cleanFields = () => {
    setPhone('')
    setAddress('')
    setResponsiblePerson('')
    setRestaurantName('')
    setDescription('')
    setAdminDescription('')
    setSuggestions('')
  }
  return (
    <div className="col-md-6 m-auto py-3">
      <form
        className="auth-form"
        onSubmit={event => {
          event?.preventDefault()
          saveTheRestaurant(
            restaurantName,
            address,
            responsiblePerson,
            phone,
            description,
            adminDescription,
            props.user
          )
          cleanFields()
        }}
      >
        <h3>Add new restaurant</h3>
        <label htmlFor="text">Restaurant Name</label>
        <input
          name="name"
          value={restaurantName}
          type="text"
          placeholder="Shake Shack"
          onChange={e => setRestaurantName(e.target.value)}
        />

        <label htmlFor="number">Phone Number</label>
        <input
          required
          name="phoneNumber"
          value={phone}
          type="text"
          placeholder="6172827141"
          maxLength={10}
          onChange={e => {
            const re = /^[0-9\b]+$/

            if (e.target.value === '' || re.test(e.target.value)) {
              setPhone(e.target.value)
            }
          }}
        />

        <label htmlFor="text">Address</label>
        <input
          required
          name="Address"
          value={address}
          type="text"
          placeholder="125 Summer St"
          onChange={e => setAddress(e.target.value)}
        />
        <label htmlFor="number">Responsible Person</label>

        <input
          name="responsiblePerson"
          value={responsiblePerson}
          type="text"
          placeholder="Nick Papadapolos"
          onChange={e => setResponsiblePerson(e.target.value)}
        />

        <label htmlFor="email">Description</label>
        <input
          name="description"
          value={description}
          type="text"
          placeholder="Hard to find Parking"
          onChange={e => setDescription(e.target.value)}
        />

        <label htmlFor="email">Admin Description</label>
        <input
          name="adminDescription"
          value={adminDescription}
          type="text"
          placeholder="Always having problems, low tips- Will Not be shared with Drivers"
          onChange={e => setAdminDescription(e.target.value)}
        />

        {suggestions &&
          suggestions.length > 0 &&
          suggestions.map((suggestion: Suggestion, key: number) => (
            <Button
              variant="primary"
              key={key}
              type="button"
              onClick={() => {
                setAddress(suggestion.description)
                setSuggestions([])
              }}
            >
              {suggestion.description}
            </Button>
          ))}
        <Button variant="primary" type="submit">
          Create
        </Button>
      </form>
    </div>
  )
}
export default NewRestaurant
