import React, { Component } from 'react'
import { Header, Aside, Main } from "./components"

export default class Index extends Component {
  render() {
    return (
      <div>
          <Header />
          <Aside />
          <Main />

      </div>
    )
  }
}