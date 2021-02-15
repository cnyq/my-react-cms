import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
import {routeGather} from '@/router/generatedRouter'
import { isAuthenticated } from '@/utils/session'

class PrivateRoute extends Component {
  render() {
    const { component,location } = this.props;
    const { pathname } = location;
    const correctRouter = routeGather.find(
      (item) => {
        return item.path.replace(/\s*/g,"") === pathname
      }
    );
    //合法路由不需要登录直接进
    if (correctRouter && !correctRouter.auth && !isAuthenticated) {
      return <Route exact path={pathname} component={component} />
    }
    if(isAuthenticated){
      if (pathname === "/login") {
        return <Redirect to="/" />;
      } else {
        if (correctRouter) {
          return (<Route exact path={pathname} component={component} />);
        } else {
          return <Redirect to="/404" />;
        }
      }
    }else{
      if(correctRouter && correctRouter.auth){
        return <Redirect to="/login" />;
      }else{
        return <Redirect to="/404" />;
      }
    }
  }
}

export default PrivateRoute