import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { menus as MENUS } from '@/components/assets/mock'
const { SubMenu } = Menu;
@withRouter
class Sider extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
  renderMenuItem = ({ key, icon, title, }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({ key, icon, title, subs }) => {
    return (
      <SubMenu key={key} title={<span>{icon}<span>{title}</span></span>}>
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </SubMenu>
    )
  }
  render() {
    console.log(this.props)
    return (
      <div style={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden', boxShadow: '2px 0 6px #4a4a4a' }}>
        <div style={styles.logoFont}>{this.props.collapsed ? 'YQ' : 'CNYANQUN'}</div>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ width: 200 }}
          mode="inline"
        >
          {
            MENUS && MENUS.map(item => {
              return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
            })
          }
        </Menu>
      </div>
    );
  }
}

const styles = {
  logoFont: {
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '64px'
  }
}

export default Sider