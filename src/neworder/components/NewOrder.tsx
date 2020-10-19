import React, { useState } from 'react'
// import { History } from 'history'

//import { signIn } from '../api'
import { User, Customer, OrderDetails } from '../../shared/types'
import Button from 'react-bootstrap/Button'
import PickRestaurantModal from '../modals/PickRestaurantModal'
import CustomerModal from '../modals/NewCustomerModal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import OrderDetailsModal from '../modals/OrderDetailsModal'
import { toast, ToastContainer } from 'react-toastify'
import { createOrder } from '../apiNewOrder'

type Props = {
  user: User
  alerts: Array<any>
  setAlerts: any
}
type Suggestion = {
  description: string
  id: string
}

const NewOrder: React.FC<Props> = props => {
  // restaurant saves here as an object value:... , address: ..., name: ...
  const [restaurant, setRestaurant] = useState()
  const [showModalRestaurant, setShowModalRestaurant] = useState(false)

  const [customer, setCustomer] = useState()
  const [showModalCustomer, setShowModalCustomer] = useState(false)

  const [source, setSource] = useState('ezCater')

  const [pPickUpDateTime, setPPickUpDateTime] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  )
  const [pDropOfDateTime, setPDropOfDateTime] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  )

  const [showModalOrderDetails, setShowModalOrderDetails] = useState(false)

  // const [description, setDescription] = useState()
  const [orderDetails, setOrderDetails] = useState()
  // const [assignedDriver, setAssignedDriver] = useState()

  const handleHiding = () => {
    setShowModalRestaurant(false)
    setShowModalCustomer(false)
    setShowModalOrderDetails(false)
  }

  const handleDateChange = (date: any) => {
    setPPickUpDateTime(date)
  }

  const handleDropOffDateChange = (date: any) => {
    setPDropOfDateTime(date)
  }
  // const handleSetOrderTotal = (value: any) => {
  //   console.log('its updating the state')
  //   //setOrderTotal(value)
  // }
  return (
    <>
      {/*__MODALS*/}
      <PickRestaurantModal
        show={showModalRestaurant}
        onHide={handleHiding}
        user={props.user}
        setRestaurant={(d: string) => setRestaurant(d)}
      />
      <CustomerModal
        show={showModalCustomer}
        onHide={handleHiding}
        customer={customer}
        setCustomer={(c: Customer) => setCustomer(c)}
        user={props.user}
      />
      <OrderDetailsModal
        show={showModalOrderDetails}
        onHide={handleHiding}
        orderDetails={orderDetails}
        setOrderDetails={(data: OrderDetails) => setOrderDetails(data)}
      />
      {/*__^^^ MODALS ^^^^ */}
      <div className="col-md-6 m-auto py-3">
        <form className="auth-form" onSubmit={() => console.log('heyo')}>
          <h3>Create an Order</h3>
          <ToastContainer />
          <label htmlFor="number">Restaurant</label>
          <Button onClick={() => setShowModalRestaurant(true)}>
            {restaurant ? restaurant.value : 'Select a restaurant'}
          </Button>

          <label htmlFor="number">Customer</label>

          <Button
            onClick={() => {
              setShowModalCustomer(true)
            }}
          >
            {customer ? customer.companyName : 'Enter Customer Details'}
          </Button>

          <label htmlFor="number">Source</label>

          <DropdownButton id="dropdown-basic-button" title={source}>
            <Dropdown.Item
              onClick={() => {
                console.log('customer>>', customer)
                toast.success('Customer Creating!')
                console.log('orderDetails>', orderDetails)
                setSource('ezCater')
              }}
            >
              eZCater
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSource('Other')}>
              Other
            </Dropdown.Item>
          </DropdownButton>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="Promised Pick-Up Date"
              label="Order Date"
              format="MM/dd/yyyy"
              value={pPickUpDateTime}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Promised Pick-up Time"
              value={pPickUpDateTime}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Promised Drop-off Time"
              value={pDropOfDateTime}
              onChange={handleDropOffDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </MuiPickersUtilsProvider>
          <Button onClick={() => setShowModalOrderDetails(true)}>
            {'Order Details'}
          </Button>
          <Button
            onClick={() => {
              toast.success('Creating an order.. Please Wait')
              const order = {
                restaurantId: restaurant._id,
                customerId: customer._id,
                source,
                pPickUpDateTime,
                pDropOfDateTime,
                orderStatus: 'Waiting Triage',
                orderTotal:
                  orderDetails && orderDetails.orderTotal
                    ? orderDetails.orderTotal
                    : 0,
                tipTotal:
                  orderDetails && orderDetails.tipTotal
                    ? orderDetails.tipTotal
                    : 0,
                description:
                  orderDetails && orderDetails.description
                    ? orderDetails.description
                    : '',
                adminOrderDescription:
                  orderDetails && orderDetails.adminOrderDescription
                    ? orderDetails.adminOrderDescription
                    : ''
              }
              createOrder(order, props.user)
                .then(res => {
                  if (res.status === 201) {
                    toast.success('Order Created!')
                  } else {
                    throw Error
                  }
                  return res
                })
                .catch(e => {
                  toast.error(
                    'Something went wrong. Please try again. Error code:',
                    e.status
                  )
                })
            }}
          >
            {'Create the Order'}
          </Button>
          {/*suggestions &&
          suggestions.length > 0 &&
          suggestions.map((suggestion: Suggestion, key: number) => (
            <Button
              variant="primary"
              key={key}
              type="button"
              onClick={() => {
                saveTheAddress(
                  phoneNumber,
                  suggestion.description,
                  name,
                  props.user
                )
                cleanFields()
              }}
            >
              {suggestion.description}
            </Button>
            ))*/}
        </form>
      </div>
    </>
  )
}
export default NewOrder
