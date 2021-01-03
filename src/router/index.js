import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

//缓存原型上的push函数
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//给原型对象上的push指定新函数
VueRouter.prototype.push = function (location,onResolve,onReject) {
    if (onResolve || onReject) {
        //直接返回原本的push方法
        return originalPush.call(this, location, onResolve, onReject)
    }

    //没有指定成功或者失败的回调,必须用catch处理
    return originalPush.call(this,location).catch((err)=>{
      //如果是重复导航错误,,不再向外传递错误
      if (VueRouter.isNavigationFailure(err)) {
          return err
      }
      //如果是其他愿意导致的错误,将错误向下传递
      return Promise.reject(err)
    })
}

//给原型对象上的replace指定行函数
VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this,location,onResolve,onReject)
    }
    return originalReplace.call(this,location).catch((er)=>{
      if (VueRouter.isNavigationFailure(err)) {
          return err
      }

      return Promise.reject(err)

    })
}


export default new VueRouter({
    mode:'history',
    routes,
})
