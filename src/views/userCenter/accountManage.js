import React, { Component } from 'react'
import { Form, Input, Modal, Button, Select, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { param2Obj } from '@/utils/common'
import { md5 } from "@/utils/crypto"
import { UserAdd, UserEdit } from '@/components/http/user'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};
@inject('user') @observer
export default class UserList extends Component {
  state = {
  }
  formRef = React.createRef()
  componentDidMount() {
  }
  save = () => {
  }
  render() {
    return (
      <div>
        <div style={styles.title}>重置密码</div>
        <Form
          {...layout}
          ref={this.formRef}
          style={styles.formWidth}
        >
          <Form.Item
            label="原密码"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="password"
              placeholder="请输入原密码"
            />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="password"
              placeholder="请输入新密码"
            />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="passwordCopy"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="password"
              placeholder="请再输入新密码"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" className="inlineBotton" onClick={this.save}>保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const styles = {
  formWidth: {
    width: '400px'
  },
  title:{
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
    paddingLeft: '30px'
  }
}