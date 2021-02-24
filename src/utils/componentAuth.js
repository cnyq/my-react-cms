import React, { Component } from 'react'
import store from '@/store'
import { Tooltip } from 'antd';

const auth_status = store.user.userInfo.auth_status || 3
const componentAuth = ComposedComponent => class WrapComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    console.log( this.props.auth)
    const auth = this.props.auth || 1
    if (auth_status <= auth) {
      return <ComposedComponent  {...this.props} />;
    } else {
      return (
        <Tooltip title="权限不足">
          <ComposedComponent disabled={true} {...this.props} />
        </Tooltip>
      );
    }
  }
}
export default componentAuth