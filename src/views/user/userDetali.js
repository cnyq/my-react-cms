import React, { Component } from 'react'
import { Form, Input, message, Button, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import { param2Obj } from '@/utils/common'
import { md5 } from "@/utils/crypto"

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
      username: '111'
    },
    aaa:'qwe'
  }
  componentDidMount() {
    let param = param2Obj(this.props.location.search),
      pageType = param.type || ''
    console.log('componentDidMount', this.props, pageType)
    this.setState({
      pageType: pageType
    })
    if (pageType == 'edit') {
      // let _data = Object.assign({}, this.state.count, this.props.location.state.params)
      let _data = {...this.props.location.state.params}
      this.setState({
        params: _data
      })
     
    }
  }
  render() {
    let { pageType, params,aaa } = this.state
    console.log(pageType,params,aaa)
    const authSelect = [{
      value: '1', lable: '超级管理员'
    }, {
      value: '2', lable: '管理员'
    }, {
      value: '3', lable: '游客'
    }]
    return (
      <div>
        <Form
          {...layout}
          ref={this.formRef}
          style={styles.formWidth}
        >
          <Form.Item
            label="用户名"
          >
            <Input
              placeholder="请输入用户名"
              defaultValue={params.username}
              disabled={pageType == 'edit'}
            />
          </Form.Item>
          <Form.Item
            label="重置密码"
          >
            <Input
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item label="更改权限">
            <Select defaultValue={this.props.user.userInfo.auth_status == 1 ? '1' : '3'} disabled={this.props.user.userInfo.auth_status == 1}>
              {
                authSelect.map(it => (<Select.Option value={it.value} key={it.value} disabled={it.value == 1}>{it.lable}</Select.Option>))
              }
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" className="inlineBotton">返回</Button>
            <Button type="primary" className="inlineBotton">保存</Button>
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