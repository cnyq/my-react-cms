import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Table, Space } from 'antd';
const { RangePicker } = DatePicker;
const { Column } = Table;
export default class UserList extends Component {
  state = {
    tableList: [],
  }
  formRef = React.createRef();
  query = () => {
    console.log(this.formRef.current.getFieldValue())
  }
  reset = () => {
    console.log(this.formRef)
  }
  add = () => {
    console.log(this.formRef)
  }
  render() {
    const { tableList } = this.state
    return (
      <div>
        <Form
          layout="inline"
          ref={this.formRef}
          className="inlineForm"
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
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.query}>查询</Button>
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.reset}>重置</Button>
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.add}>新增</Button>
          </Form.Item>
        </Form>
        <Table dataSource={tableList} bordered size="small">
          <Column title="名称" dataIndex="age" key="age" />
          <Column title="注册时间" dataIndex="address" key="address" />
          <Column
            title="操作权限"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a>开启</a>
                <a>删除</a>
              </Space>
            )}
          />
        </Table>
      </div>
    )
  }
}