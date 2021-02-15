import React, { Component } from 'react'
import { Header, Aside, Main } from "./components"
import { Card } from 'antd'

export default class Index extends Component {
  render() {
    return (
      <div>
        <Card title='基本用法'>
          <Header />
          <Aside />
          <Main />
        </Card>

      </div>
    )
  }
}