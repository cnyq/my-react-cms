import React, { Component } from 'react'
import { Form, Input, Button, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
export default class UserList extends Component {
  render() {

    return (
      <div>
        <Form
        >
          <Form.Item
            label="用户名"
            name="username">
            <Input />
          </Form.Item>
          <Form.Item
            label="注册时间"
            name="range-picker">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}