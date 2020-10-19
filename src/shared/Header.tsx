import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import { User } from './types'
import logo from '../logo.svg'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/dispatch">Dispatch</Link>
    <Link to="/new-order">New Order</Link>
    <Link to="/new-restaurant">Add New Restaurant</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

type Props = {
  user: User
}

const Header: React.FC<Props> = props => {
  const { user } = props
  //console.log(user)
  return (
    <header className="main-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Foodie Fliers</h2>
      <nav>
        {user && user.token && <span>Welcome, {user.name}</span>}
        {user && user.token ? authenticatedOptions : unauthenticatedOptions}
        {alwaysOptions}
      </nav>
    </header>
  )
}

export default Header
