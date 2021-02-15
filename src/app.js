import React from 'react';
import Router from '@/router';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import '@/static/styles/index.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Provider>
          <Router />
        </Provider>
      </HashRouter>
    )
  }
}

export default App;
