import React, { FC, useState, useEffect } from 'react'
import { createTrip } from './apiDispatch'
import { User, Order } from '../shared/types'
import { zonedTimeToUtc } from 'date-fns-tz'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { format } from 'date-fns'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
type Props = {
  user: User
  order: Order
  drivers: Array<User>
}
const DispatchItem: FC<Props> = props => {
  const [isVisible, setIsVisible] = useState(true)
  // eslint-disable-next-line
  const [aState, setAState] = useState()
  // eslint-disable-next-line
  const [orders, setOrders] = useState([])
  const [drivers, setDrivers] = useState()
  const [selectedDriver, setSelectedDriver] = useState()
  const [dropOffTime, setDropOffTime] = useState()
  const [pickUpTime, setPickUpTime] = useState()
  const [pickUpDate, setPickUpDate] = useState()

  const { order } = props
  useEffect(() => {
    setDrivers(props.drivers)
    setPickUpTime(
      format(zonedTimeToUtc(order.pPickUpDateTime, 'America/New_York'), 'hh:mm')
    )
    setPickUpDate(
      format(
        zonedTimeToUtc(order.pDropOfDateTime, 'America/New_York'),
        'yyyy/MM/dd'
      )
    )
    setDropOffTime(
      format(zonedTimeToUtc(order.pDropOfDateTime, 'America/New_York'), 'hh:mm')
    )
  }, [props.drivers, order.pPickUpDateTime, order.pDropOfDateTime])

  if (!isVisible) {
    return null
  }

  return (
    <Row>
      <Column>
        <p>{order.restaurantId.restaurantName}</p>
        <p>{order.restaurantId.address}</p>
        <p>{'--'}</p>
      </Column>
      <Column>
        <p>{order.customerId.companyName}</p>
        <p>{order.customerId.address}</p>
        <p>{order.customerId.addressDetails}</p>
      </Column>
      <Column>
        <p>
          {order.tripId && order.tripId.driver
            ? order.tripId.driver.fullName
            : 'No Driver'}
        </p>
        <p>{selectedDriver ? selectedDriver.name : order.orderStatus}</p>
        <p>
          {selectedDriver
            ? selectedDriver._id.substr(selectedDriver._id.length - 5)
            : null}
        </p>
      </Column>
      <Column>
        <p>{'Pick up on ' + pickUpDate}</p>
        <p>{'Pick up at ' + pickUpTime}</p>
      </Column>
      <Column>
        <p>{'Drop off at ' + dropOffTime}</p>
      </Column>
      <DropdownButton id="dropdown-basic-button" title={'Select a Driver'}>
        {drivers &&
          drivers.map((d: User, k) => (
            <Dropdown.Item
              key={k}
              onClick={() => {
                setSelectedDriver(d)

                console.log('driver>>', d)
                console.log('Order>', order)
              }}
            >
              {d.name + ' - ' + d._id.substr(d._id.length - 5)}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <Button
        onClick={() => {
          createTrip(props.user, props.order, selectedDriver)
            .then(res => {
              console.log('Trip Created!component hidden ', res)
              if (res) {
                setIsVisible(false)
              }
            })
            .catch(err => console.log('err', err))
        }}
      >
        Edit{' '}
      </Button>
      <p>___________________________________________________________</p>
    </Row>
  )
}
const Row = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 10px;
  background-color: white;
`
const Column = styled.div`
  flex: 1;
  display: inline-block;
  width: 200px;
  padding: 10px;
  background-color: white;
`

export default DispatchItem
