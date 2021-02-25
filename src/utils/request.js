import axios from 'axios'
import { message as Message } from 'antd';
import { getToken } from '@/utils/auth'
import { HashRouter } from 'react-router-dom'
const router = new HashRouter()

if (process.env.NODE_ENV !== 'development') {
  // 非开发模式  禁用调console
  window.console.log = () => { }
}
const service = axios.create({
  baseURL: process.env.APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 判断各种情况
    if (res.code === 100 || res.code === 102 || res.code === 103 || res.code === 402 || res.code === 406) {
      Message.error(res.msg);
      return false
    }
    if (res.code === 401) {
      Message.error('登录失效重新登录', 2, () => { router.history.push('/login') });
      return Promise.reject(new Error('登录失效'))
    }
    if (res.code !== 0 && res.code !== 200) {
      Message.error(res.msg || 'Error');
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    Message.error(error.message);
    return Promise.reject(error)
  }
)

export default service
