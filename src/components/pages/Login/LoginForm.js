import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '@/components/http/login'
import { md5 } from "@/utils/crypto"
import { inject, observer } from 'mobx-react'

@inject('user') @observer
class LoginForm extends Component {
  formRef = React.createRef();
  register = () => {
    this.formRef.current.resetFields();
    this.props.switchShowBox('register')
  }
  login = () => {
    this.formRef.current.validateFields().then(value => {
      let _data = {
        username: value.username,
        password: md5(value.password),
      }
      Login(_data).then(res => {
        if (res.data.status == 1) {
          this.props.user.setToken(res.data.token)
          this.props.user.setUserInfo(res.data.userInfo)
          this.props.toHome()
        } else {
          message.error(res.data.hint)
        }
      })
    })
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员登录</h3>
        <Form
          ref={this.formRef}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名', }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码', }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <div className='bottom'>
            <span className='subBtn' onClick={this.login}>登录</span>
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