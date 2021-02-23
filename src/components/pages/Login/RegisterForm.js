import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '@/components/http/login'
import { md5 } from "@/utils/crypto"
class RegisterForm extends Component {
  gobackLogin = () => {
    this.props.switchShowBox('login')
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员注册</h3>
        <Form>
          <Form.Item
            name="registerUsername"
          >
             <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="registersPassword"
          >
             <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <div className='bottom'>
            <span className='subBtn'>注册并登陆</span>
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