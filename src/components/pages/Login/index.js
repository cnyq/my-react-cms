import React, { Component } from 'react'
import { isAuthenticated } from '@/utils/session'
import { notification } from 'antd'
import './login.scss'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
export default class Index extends Component {
  state = {
    showBox: 'login'
  }
  componentDidMount() {
    console.log(this.props)
    if (isAuthenticated()) {
      this.props.history.push('/')
      return
    }
    notification.open({
      message: <ul><li>游客账号：admin</li><li>游客密码：admin</li></ul>,
      duration: 0,
      className: 'login-notification'
    })
  }
  componentWillUnmount() {
    notification.destroy()
  }
  switchShowBox = (box) => {
    this.setState({
      showBox: box
    })
  }
  render() {
    const { showBox } = this.state
    return (
      <div id='login-page'>
        <div className='container'>
          <LoginForm
            className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
            switchShowBox={this.switchShowBox} />
          <RegisterForm
            className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
            switchShowBox={this.switchShowBox} />
         
        </div>
      </div>
    )
  }
}