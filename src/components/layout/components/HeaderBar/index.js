import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Menu, Dropdown, Button } from 'antd'
import { disposeBreadcrumb } from '@/utils/particular'
@withRouter
export default class Header extends Component {
  state = {
    breadcrumbList: []
  }
  toggle = () => {
    this.props.onToggle()
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
          <span >退出登录</span>
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