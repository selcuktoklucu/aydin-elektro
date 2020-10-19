import React, { useState } from 'react'
// import { withRouter } from 'react-router-dom'

import { signUp } from '../api'
import { Credentials } from '../../shared/types'
import Button from 'react-bootstrap/Button'

type Props = {
  setAlerts: any
  alerts: Array<any>
  setUser: any
  history?: any
}

const SignUp: React.FC<Props> = props => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')

  const onSignUp = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    //console.log('history', history)
    const credentials: Credentials = { email, phone, name, fullName, dob }
    signUp(credentials)
      .then(a => {
        if (!a.ok) {
          console.log('hata, ', a)
          props.setAlerts([
            ...props.alerts,
            { title: 'Something went wrong!', variant: 'success' }
          ])
          throw new Error()
        }
      })
      .then((res: any) => console.log(email, res))
      .then(() =>
        props.setAlerts([
          ...props.alerts,
          { title: `Sign up for ${name} Successful`, variant: 'success' }
        ])
      )
      .then(() => console.log('pro'))
      .catch((error: any) => {
        console.error('ERR', error)
        //let variant = undefined

        props.setAlerts([
          ...props.alerts,
          { title: 'Something went wrong!', variant: 'success' }
        ])
      })
  }

  // render() {
  //   const { email, password, passwordConfirmation } = this.state

  return (
    <div className="col-md-6 m-auto py-3">
      <form className="auth-form" onSubmit={onSignUp}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          maxLength={32}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="number">Phone Number</label>
        <input
          required
          name="number"
          value={phone}
          type="text"
          maxLength={10}
          placeholder="8572010203"
          onChange={e => {
            const re = /^[0-9\b]+$/

            if (e.target.value === '' || re.test(e.target.value)) {
              setPhone(e.target.value)
            }
          }}
        />
        <label htmlFor="text">Full Name</label>
        <input
          required
          name="text"
          value={fullName}
          maxLength={32}
          type="text"
          placeholder="Full Name"
          onChange={e => setFullName(e.target.value)}
        />
        <label htmlFor="text">Nick Name</label>
        <input
          required
          name="text"
          value={name}
          maxLength={32}
          type="text"
          placeholder="Nick"
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="text">Date of Birth</label>
        <input
          required
          name="dob"
          value={dob}
          maxLength={32}
          type="date"
          placeholder="12/31/1990"
          onChange={e => setDob(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  )
}
export default SignUp
