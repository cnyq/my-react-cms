import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//进度条
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  ease: 'ease',
  speed: 500
})

class LoadingPage extends React.Component {
  componentWillMount(){
    NProgress.start()
  }
  componentWillUnmount(){
    NProgress.done()
  }
  render () {
    return (
      <div/>
    )
  }
}

const loadable = (component) => {
  return Loadable({
    loader: component,
    loading: ()=><LoadingPage/>
  })
}

export default loadable