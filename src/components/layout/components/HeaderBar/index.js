import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
@withRouter
export default class Header extends Component{
  toggle = () => {
    this.props.onToggle()
  }
  menuIcon = ()=>{
    if(this.props.collapsed){
      return <MenuUnfoldOutlined onClick={this.toggle}/>
    }else{
      return <MenuFoldOutlined onClick={this.toggle}/>
    }
  }
  render() {
    return (
      <div>
        {this.menuIcon()}
      </div>
    )
  }
}