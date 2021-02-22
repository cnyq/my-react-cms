import React, { Component } from 'react'
import { isAuthenticated } from '@/utils/session'
import { notification } from 'antd'
import './login.scss'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import CanvasBg from '@/utils/canvasBg'
let canvasBg = new CanvasBg('c1', 'c2')
export default class Index extends Component {
  state = {
    showBox: 'login'
  }
  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push('/')
      return
    }
    canvasBg.init()
    notification.open({
      message: <ul><li>体验账号：123456</li><li>体验密码：123456</li></ul>,
      duration: 0,
      className: 'login-notification'
    })
  }
  componentWillUnmount() {
    canvasBg.unmount()
    notification.destroy()
  }
  clickBg = () => {
    canvasBg.create()
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
        <div className="canvasBg" onClick={this.clickBg}>
          <canvas id="c1" width="1920" height="969"></canvas>
          <canvas id="c2" width="1920" height="969"></canvas>
        </div>
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