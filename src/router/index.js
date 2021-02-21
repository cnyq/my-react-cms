import React, {Component} from 'react';
import PrivateRoute from '@/router/privateRoute'
import {Route,Switch} from 'react-router-dom'
import Login from '@/components/pages/Login'
import ErrorPage from '@/components/pages/ErrorPage'
import Index from '@/components/layout'

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/404' component={ErrorPage}/>
        <PrivateRoute path='/' component={Index}/>
      </Switch>
    )
  }
}

export default Router;
