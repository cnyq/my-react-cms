import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Table, Space, Modal, message } from 'antd';
const { RangePicker } = DatePicker;
const { Column } = Table;
import { User, UserDel } from '@/components/http/user'
import componentAuth from '@/utils/componentAuth'
import { formatTime } from '@/utils/common'
export default class UserList extends Component {
  state = {
    tableList: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    startTime: 0,
    endTime: 0
  }
  formRef = React.createRef();
  componentDidMount() {
    this.query()
  }
  query = () => {
    let value = this.formRef.current.getFieldValue(),
      _data = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        username: value.username || '',
        startTime: this.state.startTime || '',
        endTime: this.state.endTime || ''
      }
    User(_data).then(res => {
      let list = res.data.list.map((it, i) => {
        return {
          ...it,
          key: i
        }
      })
      this.setState({
        tableList: list,
        total: res.data.total
      })
    })
  }
  onPageChange = (current, pageSize) => {
    this.setState({
      pageNum: current,
      pageSize: pageSize
    }, () => {
      this.query()
    })
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
  add = (name) => {
    console.log(this.props.history, name)
    this.props.history.push({ pathname: "/userDetali", search: `type=add`, state: { id: '123' } })
  }
  edit = (params) => {
    console.log(this.props.history)
    this.props.history.push({ pathname: "/userDetali", search: `type=edit`, state: { params } })
  }
  delUser = (data) => {
    Modal.confirm({
      title: `是否删除--  ${data.username}  --用户`,
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        UserDel(data).then(res => {
          let { status, hint } = res.data
          if (status == 1) {
            message.success(hint, 1, () => { this.query() });
          } else {
            message.error(hint, 1);
          }
        })
      }
    });
  }
  render() {
    const AuthButton = componentAuth(Button);
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
            <Button type="primary" type="primary" className="inlineBotton" onClick={this.query}>查询</Button>
            <Button type="primary" type="primary" className="inlineBotton" onClick={this.reset}>重置</Button>
            <AuthButton auth="1" type="primary" className="inlineBotton" onClick={this.add}>新增</AuthButton>
          </Form.Item>
        </Form>
        <Table
          dataSource={tableList}
          bordered size="small"
          pagination={{
            simple: false,
            current: pageNum,
            position: ['none', 'bottomLeft'],
            total: total,
            pageSize: pageSize,
            showTotal: (count = total) => {
              return '共' + count + '条数据'
            },
            onChange: (current, pageSize) => {
              this.onPageChange(current, pageSize)
            }
          }}
        >
          <Column title="名称" dataIndex="username" key="username" />
          <Column title="注册时间" key="create_time"
            render={(text, record) => (
              <Space size="middle">
                {formatTime(record.create_time, 'yyyy年MM月dd日')}
              </Space>
            )}
          />
          <Column title="用户类型" key="create_time"
            render={(text, record) => (
              <Space size="middle">
                {record.auth_status == 1 ? '超级管理员' : record.auth_status == 2 ? '管理员' : '游客'}
              </Space>
            )}
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <AuthButton auth="1" type="link" onClick={this.edit.bind(this, record)}>编辑</AuthButton>
                {record.auth_status == 1 ? null : <AuthButton auth="1" type="link" onClick={this.delUser.bind(this, record)}>删除</AuthButton>}
              </Space>
            )}
          />
        </Table>
      </div>
    )
  }
}