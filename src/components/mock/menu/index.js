/*
 * @Author       : yanqun
 * @Date         : 2021-02-19 15:49:05
 * @LastEditTime : 2021-03-02 17:32:39
 * @Description  : menu
 */

import React from 'react'
import {
  HomeOutlined,/*首页*/
  ContactsOutlined,/*用户列表*/
  UserOutlined,/*个人中心*/
} from '@ant-design/icons';
const menus = [
  {
    title: '首页',
    icon: <HomeOutlined />,
    key: '/home'
  },
  {
    title: '用户管理',
    icon: <ContactsOutlined />,
    key: 'userManage',
    subs: [
      {key: '/user', title: '用户列表', icon: '',}
    ]
  },
  {
    title: '个人中心',
    icon: <UserOutlined />,
    key: 'userCenter',
    subs: [
      {key: '/accountManage', title: '账户管理', icon: '',}
    ]
  },
]


export {
  menus
}
