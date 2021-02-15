/*
 * @Author       : yanqun
 * @Date         : 2021-02-05 11:13:01
 * @LastEditTime : 2021-02-05 15:49:27
 * @Description  : 获取pages文件夹下的所有文件生成路由对象，components文件下的js不载入路由对象;注：本架子使用文件名作为路由
 */
import loadable from '@/router/loadable' //组件进行异步加载处理

const generatedRouter = []
const generatedRouterMap = {}
const modulesList = []
const shieldRouter = ['demo'] //屏蔽文件名为demo的文件导入路由对象
const modulesFiles = require.context('@/pages', true, /\.js$/, 'lazy')

modulesFiles.keys().forEach((modulePath) => {
  modulesList.push(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
})

modulesList.forEach(path => {
  const pathList = path.split('/')
  if (pathList[0] === 'components' || shieldRouter.includes(pathList[pathList.length - 1])) return false
  let name = pathList[pathList.length - 1]
  if (generatedRouterMap[name]) {
    /* 特别声明 ： 因为异步不能读取到文件的内容，所以只能以文件名作为路由 */
    throw new Error(`路由名（文件名）重复,请检查对比目录文件：@/src/pages/"${generatedRouterMap[name]},@/src/pages/${name}`)
  } else {
    generatedRouterMap[name] = path
    generatedRouter.push({
      name: name,
      path: '/' + name,
      component: loadable(() => import('@/pages/' + path))
    })
  }
})


export default generatedRouter