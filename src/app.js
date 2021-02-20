import React from 'react';
import Router from '@/router';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { ConfigProvider  } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import '@/static/styles/index.scss'
import store from '@/store'
class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <ConfigProvider  locale={zh_CN}>
          <Provider {...store}>
            <Router />
          </Provider>
        </ConfigProvider>
      </HashRouter>
    )
  }
}

export default App;
