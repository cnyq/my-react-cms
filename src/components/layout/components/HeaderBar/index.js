import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Menu, Dropdown, Modal } from 'antd'
import { disposeBreadcrumb } from '@/utils/particular'
import { inject, observer } from 'mobx-react'
@withRouter @inject('user') @observer
export default class Header extends Component {
  state = {
    breadcrumbList: []
  }
  toggle = () => {
    this.props.onToggle()
  }
  loginOut = () => {
    Modal.confirm({
      title: '是否退出',
      icon: <ExclamationCircleOutlined />,
      okText: '退出',
      cancelText: '取消',
      onOk:()=>{
        this.props.user.resetToken()
        this.props.user.removeUserInfo()
        console.log(this.props.history)
        this.props.history.replace('/login')
      }
    });
  }
  menuIcon = () => {
    if (this.props.collapsed) {
      return <MenuUnfoldOutlined onClick={this.toggle} />
    } else {
      return <MenuFoldOutlined onClick={this.toggle} />
    }
  }
  changeMenuKeys = (nextProps) => {
    const { pathname, search } = nextProps ? nextProps.location : this.props.location
    this.setState({
      breadcrumbList: disposeBreadcrumb(pathname, search)
    })
  }
  componentDidMount() {
    this.changeMenuKeys()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.changeMenuKeys(nextProps)
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.loginOut}>退出登录</span>
        </Menu.Item>
      </Menu>
    );

    const { breadcrumbList } = this.state
    return (
      <div className="header">
        <div className="header-le">
          {this.menuIcon()}
          <Breadcrumb style={style.breadcrumb}>
            {breadcrumbList.map(item => {
              if (item.key) {
                return <Breadcrumb.Item key={item.key}><Link to={item.key} replace>{item.title}</Link></Breadcrumb.Item>
              } else {
                return <Breadcrumb.Item key={item}>{item.title}</Breadcrumb.Item>
              }
            })}
          </Breadcrumb>
        </div>
        <div className="header-ri">
          <span className="userName">用户：{this.props.user.userInfo.username}</span>
          <Dropdown overlay={menu} placement="bottomRight" arrow trigger="click">
            <Avatar shape="square" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    )
  }
}
const style = {
  breadcrumb: {
    display: 'inline-block',
    marginLeft: '30px'
  }
}