import React, { Component } from 'react'

export default class UserList extends Component{
  componentDidMount() {
    console.log('componentDidMount',this.props)
  }
  render() {
    return (
      <div>userDetali</div>
    )
  }
}