import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { OrderDetails } from '../../shared/types'

type Props = {
  show: boolean
  onHide: any
  orderDetails: OrderDetails
  setOrderDetails: (data: OrderDetails) => void
}

const OrderDetailsModal: React.FC<Props> = props => {
  const [description, setDescription] = useState()
  const [orderTotal, setOrderTotal] = useState()
  const [adminOrderDescription, setAdminOrderDescription] = useState()
  const [tipTotal, setTipTotal] = useState()

  const handleHiding = () => {
    props.onHide()
  }
  const saveAndHide = () => {
    props.onHide()
    props.setOrderDetails({
      orderTotal,
      tipTotal,
      description,
      adminOrderDescription
    })
  }

  return (
    <>
      <Modal show={props.show} onHide={handleHiding}>
        <Modal.Header closeButton>
          <Modal.Title>Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter Customer Details</Modal.Body>

        <div className="col-md-6 m-auto py-3">
          <label htmlFor="number">Order Total</label>
          <input
            required
            name="tipTotal"
            value={orderTotal}
            type="number"
            placeholder="650"
            onChange={e => setOrderTotal(e.target.value)}
          />
          <label htmlFor="text">Tip Total</label>

          <input
            required
            name="tipTotal"
            value={tipTotal}
            type="number"
            placeholder="70"
            onChange={e => setTipTotal(e.target.value)}
          />
          <label htmlFor="text">Description</label>

          <input
            name="description"
            value={description}
            type="text"
            placeholder="heavy order, pastas"
            onChange={e => {
              setDescription(e.target.value)
            }}
          />
          <label htmlFor="text">Admin Description</label>

          <input
            name="adminOrderDescription"
            value={adminOrderDescription}
            type="text"
            placeholder="send the best driver here, needs to be rushed"
            onChange={e => {
              setAdminOrderDescription(e.target.value)
            }}
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
export default OrderDetailsModal
