import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
import {routeGather} from '@/router/generatedRouter'
import { getToken, getUserInfo } from '@/utils/auth'

const isLogin = getToken() && getUserInfo()
console.log(isLogin,'isLogin')
class PrivateRoute extends Component {
  render() {
    const { component,location } = this.props;
    const { pathname } = location;
    const correctRouter = routeGather.find(
      (item) => {
        return item.path.replace(/\s*/g,"") === pathname
      }
    );
    // //合法路由&&不需要登录直接进
    // if (correctRouter && !correctRouter.auth && !isAuthenticated) {
    //   return <Route exact path={pathname} component={component} />
    // }
    if(correctRouter){
      if(isLogin){
        if (pathname === "/login") {
          return <Redirect to="/" />;
        } else {
          return (<Route exact path={pathname} component={component} />);
        }
      }else{
        return (<Route exact path={pathname} component={component} />);
      }
    }else{
      return <Redirect to="/404" />;
    }
  }
}

export default PrivateRoute