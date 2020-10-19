import React, { useState } from 'react'
// import { History } from 'history'

//import { signIn } from '../api'
import { User, Customer } from '../../shared/types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { createCustomer } from '../apiNewCustomer'
import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify'
type Props = {
  show: boolean
  onHide: any
  customer: Customer
  setCustomer: (c: Customer) => void
  user: User
}

const NewCustomerModal: React.FC<Props> = props => {
  const [name, setCustomerName] = useState()
  const [companyName, setCompanyName] = useState()
  const [address, setCustomerAddress] = useState()
  const [addressDetails, setCustomerAddressDetails] = useState()

  const [email, setCustomerEmail] = useState()
  const [phone, setCustomerPhone] = useState()
  const [phoneExtension, setCustomerPhoneExt] = useState()

  const [description, setDescription] = useState()
  const [previousTip, setPreviousTip] = useState()
  const [adminDescription, setAdminDescription] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleHiding = () => {
    props.onHide()
  }
  const saveAndHide = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const customer = {
      name,
      companyName,
      address,
      addressDetails,
      email,
      phone,
      phoneExtension,
      description,
      previousTip,
      adminDescription
    }
    createCustomer(customer, props.user)
      .then(res => {
        if (res.status === 201) {
          toast.success('Customer Created!')
        } else {
          throw Error
        }
        return res
      })
      .then(res => {
        console.log('Customer has been set ', res.customer)
        props.setCustomer(res.customer)
      })
      .catch(e => {
        toast.error('Something went wrong. Please try again code:', e.status)
      })
    setIsLoading(false)
    props.onHide()
  }

  return (
    <>
      <Modal
        show={isLoading}
        centered
        animation={false}
        backdrop={'static'}
        size={'sm'}
      >
        <div
          style={{
            alignSelf: 'center',
            backgroundColor: '',
            position: 'absolute'
          }}
        >
          <Loader type="TailSpin" color="#000" height={80} width={80} />
          <p style={{ color: 'white', marginTop: 16 }}>Loading Please Wait</p>
        </div>
      </Modal>
      <Modal show={props.show} onHide={handleHiding}>
        <Modal.Header closeButton>
          <Modal.Title>Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter Customer Details</Modal.Body>

        <form id="new-customer-form" onSubmit={saveAndHide}>
          <div className="col-md-6 m-auto py-3">
            <label htmlFor="number">Customer Name</label>
            <input
              required
              name="customerName"
              value={name}
              type="text"
              placeholder="Shake Shack"
              onChange={e => {
                setCustomerName(e.target.value)
              }}
            />
            <label htmlFor="number">Company Name</label>

            <input
              required
              name="companyName"
              value={companyName}
              type="text"
              placeholder="Wayfair-BackBay"
              onChange={e => {
                setCompanyName(e.target.value)
              }}
            />
            <label htmlFor="number">Address</label>

            {/* selcuk=> burayi google inputlu yap*/}
            <input
              required
              name="credit"
              value={address}
              type="text"
              placeholder="4 Copley Place"
              onChange={e => {
                setCustomerAddress(e.target.value)
              }}
            />
            {/* <==selcuk yukariyi google inputlu yap*/}
            <label htmlFor="number">Address Details</label>

            <input
              name="credit"
              value={addressDetails}
              type="text"
              placeholder="Suite 2020"
              onChange={e => {
                setCustomerAddressDetails(e.target.value)
              }}
            />
            <label htmlFor="number">Customer Email</label>

            <input
              name="credit"
              value={email}
              type="text"
              placeholder="jennifer@wayfair.com"
              onChange={e => {
                setCustomerEmail(e.target.value)
              }}
            />
            <label htmlFor="number">Phone #</label>

            <input
              required
              name="credit"
              value={phone}
              type="text"
              placeholder="6172002020"
              onChange={e => {
                setCustomerPhone(e.target.value)
              }}
            />
            <label htmlFor="number">Phone # extension</label>

            <input
              name="credit"
              value={phoneExtension}
              type="text"
              placeholder="talk directly to front desk"
              onChange={e => {
                setCustomerPhoneExt(e.target.value)
              }}
            />
            <label htmlFor="number">Description</label>

            <input
              name="credit"
              value={description}
              type="text"
              placeholder="hard to find the office"
              onChange={e => {
                setDescription(e.target.value)
              }}
            />
            <label htmlFor="number">Previous Tips</label>

            <input
              name="credit"
              value={previousTip}
              type="text"
              placeholder="Generous tips"
              onChange={e => {
                setPreviousTip(e.target.value)
              }}
            />
            <label htmlFor="number">Admin Notes</label>

            <input
              name="credit"
              value={adminDescription}
              type="text"
              placeholder="hidden from drivers"
              onChange={e => {
                setAdminDescription(e.target.value)
              }}
            />
          </div>
        </form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHiding}>
            Close
          </Button>
          <Button form="new-customer-form" type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default NewCustomerModal
