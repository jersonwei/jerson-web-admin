import path from 'path'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus (routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

/**
 *根据routes数据返回对应的menu规则数据
 */
//  export const generateMenus = (routes) => {
//   const menu = []
//   routes.forEach((route) => {
//     generateMenue(route, menu)
//   })
//   return menu
// }

/**
 * 递归遍历路由表
 * @param {*} route 当前节点
 * @param {*} parent 父级节点
const generateMenue = (route, parent) => {
  // 递归终止条件, 该路由是最后一级，即没有children
  if (!route.children) {
    // 如果存在meta，也就是符合成为menu的规则，直接挂载给上一级
    if (route.meta && route.meta.title && route.meta.icon) {
      // 首先判断上一级是Array(顶层)还是route，Array代表是顶层数组直接push，否则加入到parent子节点
      // 为了符合视频的写法，此处给route加上一个空childen(也可以不加，后续渲染时判断route没有这个属性即为最后一级)
      route.children = []
      parent instanceof Array ? parent.push(route) : parent.children.push(route)
    }
  } else {
    // 来到这里证明该路由还有children，我们需要去过滤children（过滤掉meta不符合要求的children）
    // 首先判断当前节点是否符合 route.meta && route.meta.title && route.meta.icon 的要求
    const isMenu = route.meta && route.meta.title && route.meta.icon
    if (isMenu) {
      // 如果符合要求需要将当前节点加入到父节点
      parent instanceof Array ? parent.push(route) : parent.children.push(route)
      // 拷贝当前点的children用于遍历(为何要拷贝？因为在下一层会push过滤后的children进去)
      const tmpChildren = [...route.children]
      // 然后清空当前节点的children（为何要清空？上面已经解释了）
      route.children = []
      // 接着遍历子节点
      tmpChildren.forEach(child => {
        generateMenue(child, route)
      })
    } else {
      // 来到这儿表示当前节点不属于menu，那么就遍历当前节点的子节点，并传入当前节点的父节点
      route.children.forEach(child => {
        generateMenue(child, parent)
      })
    }
  }
}
 */
