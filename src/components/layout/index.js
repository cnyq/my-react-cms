import React, { Component } from 'react'
import { Layout } from 'antd'
import { HeaderBar, Aside, Main, FooterBar } from "./components"
const { Sider, Header, Content, Footer } = Layout
export default class Index extends Component {
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div id="page">
        <Layout>
          <Sider collapsible
            trigger={null}
            collapsed={this.state.collapsed}
          >
            <Aside collapsed={this.state.collapsed}/>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle} />
            </Header>
            <Content>
              <Main />
            </Content>
            <Footer>
              <FooterBar></FooterBar>
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}