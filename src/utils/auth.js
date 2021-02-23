/*
 * @Author       : yanqun
 * @Date         : 2020-12-28 10:48:53
 * @LastEditTime : 2021-02-23 09:45:56
 * @Description  : cookie
 */


import Cookies from 'js-cookie'


const TokenKey = 'token'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return window.sessionStorage.getItem('userInfo')
}

export function setUserInfo(data) {
  return window.sessionStorage.setItem('userInfo', data)
}

export function removeUserInfo() {
  window.sessionStorage.removeItem('userInfo');
  return ''
}


