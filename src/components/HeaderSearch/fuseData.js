import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选出可供搜索的路由对象
 * @params routes 路由表
 * @params basePath 基础路径 默认位/
 * @params prefixTitle
 */

export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []
  for (const route of routes) {
    // 创建包含path和title的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在meta时 使用i18n解析并组合
    // 动态路由不允许被检索
    const re = /.*\/:.*/
    if (
      route.meta &&
      route.meta.title &&
      !re.exec(route.path) &&
      !res.find(item => item.path === data.path)
    ) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }

    // 存在children需要迭代处理
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
