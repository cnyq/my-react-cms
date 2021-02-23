import { observable, action } from 'mobx'
import { getToken, setToken, removeToken, setUserInfo } from '@/utils/auth'

class User {
  @observable token = getToken()
  @observable userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}

  @action setToken(token) {
    this.token = token
    setToken(token)
  }
  @action resetToken() {
    this.token = ''
    removeToken()
  }
  @action setUserInfo(info) {
    this.userInfo = info
    setUserInfo(JSON.stringify(info))
  }
  @action removeUserInfo() {
    sessionStorage.removeItem('userInfo');
    this.userInfo = ''
  }

  
}

export default new User()