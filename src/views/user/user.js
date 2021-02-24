import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Table, Space } from 'antd';
const { RangePicker } = DatePicker;
const { Column } = Table;
import { User } from '@/components/http/user'
export default class UserList extends Component {
  state = {
    tableList: [],
    pageNum: 1,
    pageSize: 2,
    total: 0,
    startTime: 0,
    endTime: 0
  }
  formRef = React.createRef();
  query = () => {
    console.log(this.formRef.current.getFieldValue())
    let value = this.formRef.current.getFieldValue(),
      _data = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        username: value.username || '',
        startTime: this.state.startTime || '',
        endTime: this.state.endTime || ''
      }
    User(_data).then(res => {
      console.log(res)
      let list = res.data.list.map((it, i) => {
        return {
          ...it,
          key: i
        }
      })
      console.log(list)
      this.setState({
        tableList: list,
        total: res.data.total
      })
    })
  }
  onPageChange = (current, pageSize) => {
    console.log(current, pageSize)
    this.setState({
      pageNum: current,
      pageSize: pageSize
    })
    this.query()
  }
  onRangePickerChange = (value, dateString) => {
    console.log('onRangePickerChange', value, dateString)
    this.setState({
      startTime: new Date(dateString[0]) - 0,
      endTime: new Date(dateString[1]) - 0
    })
  }
  reset = () => {
    this.setState({
      startTime: 0,
      endTime: 0
    })
    this.formRef.current.resetFields();
  }
  add = () => {
    console.log(this.formRef)
  }
  render() {
    const { tableList, pageNum, pageSize, total } = this.state
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
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="注册时间"
            name="range-picker">
            <RangePicker
              onChange={this.onRangePickerChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.query}>查询</Button>
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.reset}>重置</Button>
            <Button type="primary" htmlType="button" className="inlineBotton" onClick={this.add}>新增</Button>
          </Form.Item>
        </Form>
        <Table
          dataSource={tableList}
          bordered size="small"
          pagination={{
            simple: false,
            current: pageNum,
            position: ['none', 'bottomCenter'],
            total: total,
            pageSize: pageSize,
            showTotal: (count = total) => {
              console.log(total, 'total', count)
              return '共' + count + '条数据'
            },
            onChange: (current, pageSize) => {
              this.onPageChange(current, pageSize)
            }
          }}
        >
          <Column title="名称" dataIndex="username" key="username" />
          <Column title="注册时间" dataIndex="create_time" key="create_time" />
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