import React, { FC, useState, useEffect } from 'react'
import { getDrivers, getOrders } from './apiDispatch'
import { User, Order } from '../shared/types'
// import { getOverlappingDaysInIntervals } from 'date-fns'
import Button from 'react-bootstrap/Button'
import DispatchItem from './DispatchItem'

type Props = {
  user: User
}
const Dispatch: FC<Props> = props => {
  const [aState, setAState] = useState()
  const [orders, setOrders] = useState([])
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    getDrivers(props.user).then(response => {
      console.log('getDrivers>>', response)
      setDrivers(response)
    })

    const query = 'Waiting Triage'
    getOrders(props.user, query).then(response => {
      console.log('getOrders>>', response)
      setOrders(response)
    })
  }, [aState, props])

  // getOrders(props.user, query).then(response => {
  //   console.log('getOrders>>', response)
  //   setDrivers(response)
  // })
  const { user } = props
  return (
    <div className="col-md-12 m-auto py-3">
      <h1>Dispatch Drivers</h1>
      <Button onClick={() => setAState(aState + 1)}>Refresh</Button>
      <Button
        onClick={() => {
          console.log('drivers', drivers)
          console.log('orders', orders)
        }}
      >
        Console.log
      </Button>
      <Button
        onClick={() =>
          getOrders(props.user, 'Assigned').then(res => {
            setOrders(res)
          })
        }
      >
        Show Assigned Orders
      </Button>
      {orders &&
        orders.map((o: Order, key) => (
          <DispatchItem key={key} user={user} order={o} drivers={drivers} />
        ))}
    </div>
  )
}
export default Dispatch
