/*
 * @Author       : yanqun
 * @Date         : 2021-02-19 15:49:05
 * @LastEditTime : 2021-02-19 22:17:19
 * @Description  : 面包屑/左侧导航
 */

import React from 'react'
import {
  HomeOutlined,/*首页*/
  AuditOutlined,/*用户列表*/
} from '@ant-design/icons';
const menus = [
  {
    title: '首页',
    icon: <HomeOutlined />,
    key: '/home'
  },
  {
    title: '用户管理',
    icon: <AuditOutlined />,
    key: 'userManage',
    subs: [
      {key: '/userList', title: '用户列表', icon: '',},
    ]
  },
]


export {
  menus
}
