import React, { useEffect } from 'react'
// import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import { User } from '../../shared/types'
// import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

type Props = {
  clearUser: () => void
  user: User
}

const SignOut: React.FC<Props> = props => {
  // const [email, setEmail] = useState('')
  const { clearUser, user } = props

  useEffect(() => {
    console.log('quiting')
    signOut(user)
      .finally(() => toast.success('Sign Out Successful'))
      .finally(() => clearUser())
  })

  return (
    <div className="col-md-6 m-auto py-3">
      <h1>Come Back Again!</h1>
    </div>
  )
}
export default SignOut
