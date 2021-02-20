import {observable, action} from 'mobx'

class Breadcrumb {
  @observable breadcrumbList = []  //面包屑

  @action changeBreadcrumb(list) {
    this.breadcrumbList = list
  }
}

export default new Breadcrumb()