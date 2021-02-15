import React, { Component } from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import generatedRouter from '@/router/generatedRouter'
import PrivateRoute from '@/router/privateRoute'

@withRouter
export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {generatedRouter.map(it => (
            <PrivateRoute exact path={it.path} component={it.component} key={it.name}></PrivateRoute>
          ))}
          <Redirect exact from='/' to='/home' />
        </Switch>
      </div>
    )
  }
}