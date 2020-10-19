import React, { useState, useEffect } from 'react'

import { User } from '../../shared/types'
import Button from 'react-bootstrap/Button'
import { getRestaurants } from '../apiNewOrder'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

type Props = {
  user: User
  show: boolean
  onHide: any
  setRestaurant: (d: string) => void
}
const PickRestaurantModal: React.FC<Props> = props => {
  const [restaurantInput, setRestaurantInput] = useState<any>(null)
  // const [selectedOption, setSelectedOption] = useState<any>()
  const [options, setOptions] = useState([])

  const handleHiding = () => {
    props.onHide()
  }
  const saveAndHide = () => {
    console.log('restaurant input', restaurantInput)
    props.onHide()
    props.setRestaurant(restaurantInput)
  }
  useEffect(() => {
    getRestaurants(props.user, restaurantInput).then(res => {
      console.log('Rsp Restaurants', res)
      const restaurantsWithLabel: any = []
      res.restaurants.forEach((restaurant: any) =>
        restaurantsWithLabel.push({
          value: restaurant.restaurantName,
          label: `${restaurant.restaurantName} - ${restaurant.address}`,
          ...restaurant
        })
      )
      console.log('restaurantsWithLabel', restaurantsWithLabel)
      setOptions(restaurantsWithLabel)
    })
  }, [props, restaurantInput])

  return (
    <>
      <Modal show={props.show} onHide={handleHiding}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Restaurant, or Add a New One</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please add restaurant from the previos screen and select it here
        </Modal.Body>
        <div className="col-md-6 m-auto py-3">
          {/*<input
            required
            name="credit"
            value={restaurantInput}
            type="text"
            placeholder="Shake Shack"
            onChange={e => {
              //setRestaurantInput(e.target.value)
            }}
          />*/}
          <Select
            value={restaurantInput}
            name={restaurantInput}
            onChange={setRestaurantInput}
            options={options}
          />
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHiding}>
            Close
          </Button>
          <Button variant="primary" onClick={saveAndHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default PickRestaurantModal
