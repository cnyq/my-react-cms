import React, { Component } from 'react'
import { Form, Input } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class LoginForm extends Component {
  register = () => {
    this.props.switchShowBox('register')
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员登录</h3>
        <Form {...layout}>
          <Form.Item label="用户名"
            name="username"
          >
            <Input
              placeholder='请输入用户名'
            />
          </Form.Item>
          <Form.Item label="密码"
            name="password"
          >
            <Input
              placeholder='请输入密码'
              type='password'
            />
          </Form.Item>
          <div className='bottom'>
            <span className='subBtn'>登录</span>
            <span className='switchBtn' onClick={this.register}>注册</span>
          </div>
        </Form>
        <div className='footer'>
          <div>欢迎登陆权限管理系统</div>
        </div>
      </div>
    )
  }
}

export default LoginForm