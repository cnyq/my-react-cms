import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { menus as MENUS } from '@/components/assets/mock'
import {findMenu } from '@/utils/particular'
const { SubMenu } = Menu;
@withRouter
class Sider extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }
  changeMenuKeys = (nextProps)=> {
    const { pathname } = nextProps ? nextProps.location : this.props.location
    let { firstMenu } = findMenu(pathname)
    this.setState({
      selectedKeys: [pathname],
      openKeys: firstMenu && firstMenu.subs ? [firstMenu.key] : []
    })
  }
  componentDidMount() {
    this.changeMenuKeys()
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.changeMenuKeys(nextProps)
  }
  // static getDerivedStateFromProps(nextProps) {
  // }
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys
    })
  };
  renderMenuItem = ({ key, icon, title, }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key} replace>
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
    const { openKeys, selectedKeys } = this.state
    return (
      <div style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', boxShadow: '2px 0 6px #4a4a4a' }}>
        <div style={styles.logoFont}>{this.props.collapsed ? 'YQ' : 'CNYANQUN'}</div>
        <Menu
          onOpenChange={(openKeys)=>{this.setState({openKeys})}}
          onClick={({key}) => this.setState({selectedKeys: [key]})}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          // style={{ width: 200 }}
          mode={ this.props.collapsed ? 'vertical' : 'inline'}
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