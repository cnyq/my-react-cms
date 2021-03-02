import React, { Component } from 'react'
import { Form, Input, Modal, Button, Select, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { param2Obj } from '@/utils/common'
import { md5 } from "@/utils/crypto"
import { UserAdd,UserEdit } from '@/components/http/user'

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
    pageType: '',
    params: {
      username: ''
    },
    aaa: 'qwe'
  }
  formRef = React.createRef()
  componentDidMount() {
    let param = param2Obj(this.props.location.search),
      pageType = param.type || ''
    console.log('componentDidMount', this.props, pageType)
    if (pageType == 'edit') {
      let _data = { ...this.props.location.state.params }
      this.setState({
        pageType: pageType,
        params: _data
      }, () => {
        this.formRef.current.setFieldsValue({
          username: _data.username,
          auth_status: _data.auth_status == 1 ? '超级管理员' : _data.auth_status == 2 ? '管理员' : '游客'
        });
      })
    } else {
      this.setState({
        pageType: pageType
      }, () => {
        this.formRef.current.setFieldsValue({
          auth_status: '游客'
        });
      })
    }
  }
  authSelect = () => [{
    value: '1', lable: '超级管理员'
  }, {
    value: '2', lable: '管理员'
  }, {
    value: '3', lable: '游客'
  }]
  goBack = () => {
    Modal.confirm({
      title: '返回不会保存,是否返回',
      okText: '返回',
      cancelText: '取消',
      onOk: () => {
        this.props.history.goBack()
      }
    });
  }
  save = () => {
    this.formRef.current.validateFields().then(value => {
      if (this.state.pageType == 'add') {
        this.add(value)
      } else {
        console.log(this.state.pageType)
        this.edit(value)
      }
    })
  }
  add = (value) => {
    let auth_status = value.auth_status == '超级管理员' ? 1 : value.auth_status == '管理员' ? 2 : value.auth_status == '游客' ? 3 : value.auth_status
    let _data = {
      username: value.username,
      password: md5(value.password),
      auth_status: auth_status
    }
    UserAdd(_data).then(res => {
      console.log(res)
      let { status, hint } = res.data
      if (status == 1) {
        message.success(hint, 1, () => { this.props.history.goBack() });
      } else {
        message.error(hint, 1);
      }
    })
  }
  edit = (value) => {
    let auth_status = value.auth_status == '超级管理员' ? 1 : value.auth_status == '管理员' ? 2 : value.auth_status == '游客' ? 3 : value.auth_status
    let _data = {
      username: value.username,
      password: md5(value.password),
      auth_status: auth_status
    }
    UserEdit(_data).then(res => {
      console.log(res)
      let { status, hint } = res.data
      if (status == 1) {
        message.success(hint, 1, () => { this.props.history.goBack() });
      } else {
        message.error(hint, 1);
      }
    })
  }
  render() {
    let { pageType, params, aaa } = this.state
    console.log(pageType, params, aaa)
    return (
      <div>
        <Form
          {...layout}
          ref={this.formRef}
          style={styles.formWidth}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              disabled={pageType == 'edit'}
            />
          </Form.Item>
          <Form.Item
            label="重置密码"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item label="更改权限"
            name="auth_status"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select disabled={params.auth_status == 1 && pageType == 'edit'}>
              {
                this.authSelect().map(it => (<Select.Option value={it.value} key={it.value} disabled={it.value == 1}>{it.lable}</Select.Option>))
              }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" className="inlineBotton" onClick={this.goBack}>返回</Button>
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
  }
}