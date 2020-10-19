import React from 'react'
// import logo from './logo.svg'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './auth/components/SignUp'
// import { createBrowserHistory } from 'history'
import SignIn from './auth/components/SignIn'
import Header from './shared/Header'
import AuthenticatedRoute from './shared/AuthenticatedRoute'
import AutoDismissAlert from './shared/autoDismissAlert'
import { AlertProps } from 'react-bootstrap/Alert'
import NewOrder from './neworder/components/NewOrder'
import NewRestaurant from './newRestaurant/newRestaurant'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Dispatch from './dispatch/Dispatch'
import SignOut from './auth/components/SignOut'
import Uploader from './Uploader'

const { useState } = React

const App: React.FC = () => {
  const [user, setUser] = useState()
  const [alerts, setAlerts] = useState([])

  return (
    <div className="App">
      <main className="container">
        <ToastContainer />
        <Router>
          <Header user={user}></Header>
          {alerts.length > 0 &&
            alerts.map((alert: AlertProps, index) => (
              <AutoDismissAlert
                key={index}
                dismissible
                onClose={() => setAlerts([])}
                alert={alert}
              >
                <p>{alert.title}</p>
              </AutoDismissAlert>
            ))}
          <Switch>
            { user && <AuthenticatedRoute
              user={user}
              exact
              path="/"
              render={() => (
                <div>
                  <h1>Under Construction</h1>
                </div>
              )}
            />}
            <AuthenticatedRoute
              user={user}
              exact
              path="/dispatch"
              render={() => <Dispatch user={user}></Dispatch>}
            />
            <AuthenticatedRoute
              user={user}
              exact
              path="/new-order"
              render={() => (
                <NewOrder
                  alerts={alerts}
                  setAlerts={setAlerts}
                  user={user}
                ></NewOrder>
              )}
            />
            <AuthenticatedRoute
              user={user}
              exact
              path="/new-restaurant"
              render={() => (
                <NewRestaurant
                  alerts={alerts}
                  setAlerts={setAlerts}
                  user={user}
                ></NewRestaurant>
              )}
            />
            <AuthenticatedRoute
              user={user}
              exact
              path="/sign-out"
              render={() => (
                <SignOut user={user} clearUser={() => setUser(null)}></SignOut>
              )}
            />
            <Route
              path="/sign-up"
              render={() => (
                <SignUp
                  alerts={alerts}
                  setAlerts={setAlerts}
                  setUser={setUser}
                />
              )}
            />

            <Route
              path="/sign-in"
              render={() => (
                <SignIn
                  alerts={alerts}
                  setAlerts={setAlerts}
                  setUser={setUser}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <Uploader
                />
              )}
            />
          </Switch>
        </Router>
      </main>
    </div>
  )
}

export default App
