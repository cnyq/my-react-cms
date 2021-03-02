import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { md5 } from "@/utils/crypto"
import { PostwordChange } from '@/components/http/user'

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
    this.formRef.current.validateFields().then(value => {
      let { oldPassword, newPassword, passwordCopy } = value
      if (newPassword != passwordCopy) {
        message.error('您要更改的密码不匹配', 1);
      } else if (oldPassword == newPassword) {
        message.error('新密码与旧密码不能相同', 1);
      } else {
        let _data = {
          oldPassword: md5(oldPassword),
          newPassword: md5(newPassword),
          username: this.props.user.userInfo.username
        }
        PostwordChange(_data).then(res => {
          let { status, hint } = res.data
          if (status == 1) {
            message.success('新密码修改成功,即将跳转登陆页', 2, () => {
              this.props.user.resetToken()
              this.props.user.removeUserInfo()
              this.props.history.replace('/login')
            });
          } else {
            message.error(hint, 1);
          }
        })
      }
    })
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
            name="oldPassword"
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
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
    paddingLeft: '30px'
  }
}