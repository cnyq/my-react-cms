/*
 * @Author       : yanqun
 * @Date         : 2021-02-20 10:42:48
 * @LastEditTime : 2021-02-23 10:33:17
 * @Description  : 页面私有方法
 */

import { menus as MENUS } from '@/components/mock/menu'
import { param2Obj } from '@/utils/common'

export function disposeBreadcrumb(path, search = '') {
  let breadcrumb = [{
    title: '首页',
    key: '/home'
  }]
  if (path != '/home') {
    if (path.indexOf('Detali') == -1) {
      let { firstMenu, childMenu } = findMenu(path)
      if (childMenu && Object.keys(childMenu).length == 0) {
        let arr = [{
          title: firstMenu.title,
          key: ''
        }]
        breadcrumb = [...breadcrumb, ...arr]
      } else if (childMenu) {
        let arr = [{
          title: firstMenu.title,
          key: ''
        }, {
          title: childMenu.title,
          key: ''
        }]
        breadcrumb = [...breadcrumb, ...arr]
      }
    } else {
      let path2 = path.replace("Detali", "")
      let { firstMenu, childMenu } = findMenu(path2)
      let param = param2Obj(search),
        type = param.type || ''
      if (childMenu && Object.keys(childMenu).length == 0) {
        let arr = [{
          title: firstMenu.title,
          key: firstMenu.key
        }, {
          title: titStatus(type) || '详情',
          key: ''
        }]
        breadcrumb = [...breadcrumb, ...arr]
      } else if (childMenu) {
        let arr = [{
          title: firstMenu.title,
          key: ''
        }, {
          title: childMenu.title,
          key: childMenu.key
        }, {
          title: titStatus(type) || '详情',
          key: ''
        }]
        breadcrumb = [...breadcrumb, ...arr]
      }
    }
  }
  return breadcrumb
}

export function findMenu(pathname) {
  let childMenu = {}
  let firstMenu = MENUS.find(it => {
    if (it.key == pathname) {
      return it
    } else {
      if (it.subs) {
        childMenu = it.subs.find(its => its.key == pathname)
        return it.subs.find(its => its.key == pathname)
      }
    }
  })
  return {
    firstMenu: firstMenu,
    childMenu: childMenu
  }
}

const titStatus = ((type) => {
  let tit = ''
  switch (type) {
    case 'add':
      tit = '新增'
      break
    case 'view':
      tit = '查看'
      break
    case 'edit':
      tit = '编辑'
      break
  }
  return tit
})

