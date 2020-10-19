import React, { useState } from 'react'
// import { History } from 'history'
import { useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

import { signIn, confirm } from '../api'
import { Credentials } from '../../shared/types'
import Button from 'react-bootstrap/Button'
// import { updateSession } from '../../redux/system/actions'
import { toast } from 'react-toastify'

type Props = {
  setAlerts: any
  alerts: Array<any>
  setUser: any
}

const SignIn: React.FC<Props> = props => {
  // eslint-disable-next-line
  const [email, setEmail] = useState('st@st.com')
  const [phone, setPhone] = useState('8572065397')
  // eslint-disable-next-line
  const [name, setName] = useState()
  // eslint-disable-next-line
  const [fullName, setFullName] = useState()
  // eslint-disable-next-line
  const [dob, setDob] = useState()
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('4344')
  const [isLoading, setIsLoading] = useState(false)

  //const [passwordConfirmation, setPasswordConfirmation] = useState()
  let history = useHistory()
  // const dispatch = useDispatch()

  const credentials: Credentials = { email, phone, name, fullName, dob }
  const onSignIn = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsLoading(true)
    console.log('SIgning')
    setIsConfirming(true)
    signIn(credentials)
      .then((res: any) => {
        console.log('signIn', res.data.user)
        props.setUser(res.data.user)

        // dispatch(updateSession(res.data.user.token))
      })
      .then(() => {
        toast.info('Please enter your four-digit code')
        setIsLoading(false)
      })
      .catch((error: any) => {
        toast.error('Something went wrong. Please try again')
        setIsLoading(false)
        setIsConfirming(false)
      })
  }
  const onSubmitCnf = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsLoading(true)
    console.log('Signing In Confirm')

    confirm(credentials, confirmationCode)
      .then((res: any) => {
        console.log('SignInConfirm', res.data.user)
        props.setUser(res.data.user)
        // dispatch(updateSession(res.data.user.token))
      })
      .then(() => {
        toast.success('Welcome')
        setIsLoading(false)
      })
      .then(() => {
        history.push('/dispatch')
      })
      .catch((error: any) => {
        console.error('ErrorInSubmit', error)
        toast.error('Please re-enter the confirmation code')
      })
  }

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <div className="col-md-6 m-auto py-3">
      {!isConfirming ? (
        <form className="auth-form" onSubmit={onSignIn}>
          <h3>Sign In</h3>
          <label htmlFor="email">Phone</label>
          <input
            required
            name="phone"
            value={phone}
            type="text"
            placeholder="8572012020"
            onChange={e => setPhone(e.target.value)}
          />
          <label htmlFor="email">Have your phone ready!</label>

          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={onSubmitCnf}>
          <h3>Enter the confirmation code</h3>
          <label htmlFor="email">4 digit code</label>
          <input
            required
            name="phone"
            value={confirmationCode}
            type="text"
            placeholder=""
            onChange={e => setConfirmationCode(e.target.value)}
          />

          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </form>
      )}
    </div>
  )
}
export default SignIn
