import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Register } from '@/components/http/login'
import { md5 } from "@/utils/crypto"
import { inject, observer } from 'mobx-react'
@inject('user') @observer
class RegisterForm extends Component {
  formRef = React.createRef();
  goback = () => {
    this.formRef.current.resetFields();
    this.props.switchShowBox('login')
  }
  register = () => {
    this.formRef.current.validateFields().then(value => {
      let _data = {
        username: value.registerUsername,
        password: md5(value.registersPassword),
      }
      Register(_data).then(res => {
        if (res.data.status == 1) {
          message.success(res.data.hint, 2, () => {
            this.props.user.setToken(res.data.token)
            this.props.user.setUserInfo(res.data.userInfo)
            this.props.toHome()
          });
        } else {
          message.error(res.data.hint)
        }
      })
    })
  }
  render() {
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员注册</h3>
        <Form
          ref={this.formRef}
        >
          <Form.Item
            name="registerUsername"
            rules={[{ required: true, message: '请输入用户名', }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="registersPassword"
            rules={[{ required: true, message: '请输入密码', }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <div className='bottom'>
            <span className='subBtn' onClick={this.register}>注册并登录</span>
            <span className='switchBtn' onClick={this.goback}>返回登录</span>
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