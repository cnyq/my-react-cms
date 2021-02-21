import React, { Component } from 'react'
import { Form, Input } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class RegisterForm extends Component {
  gobackLogin = () => {
    this.props.switchShowBox('login')
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员注册</h3>
        <Form {...layout}>
          <Form.Item label="用户名"
            name="registerUsername"
          >
            <Input
              placeholder='请输入用户名'
            />
          </Form.Item>
          <Form.Item label="密码"
            name="registersPassword"
          >
            <Input
              placeholder='请输入密码'
              type='password'
            />
          </Form.Item>
          <div className='bottom'>
            <span className='subBtn'>注册</span>
            <span className='switchBtn' onClick={this.gobackLogin}>返回登录</span>
          </div>
        </Form>
        <div className='footer'>
          <div>欢迎注册权限管理系统</div>
        </div>
      </div>
    )
  }
}

export default RegisterForm