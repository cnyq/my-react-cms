import React, { Component } from 'react'
import { Form, Input, message,Button} from 'antd'
import { inject, observer } from 'mobx-react'
@inject('user') @observer
export default class UserList extends Component {
  componentDidMount() {
    console.log('componentDidMount', this.props)
  }
  render() {
    return (
      <div>
        <Form
          ref={this.formRef}
        >
          <Form.Item
            label="用户名"
          >
            {this.props.user.userInfo.username}
          </Form.Item>
          <Form.Item
            label="权限等级"
          >
            <input
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            label="重置密码"
          >
            <input
              placeholder="请输入密码"
            />
          </Form.Item>
          <div className='bottom'>
            <Button>返回</Button>
            <Button>保存</Button>
          </div>
        </Form>
      </div>
    )
  }
}