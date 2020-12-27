import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

//缓存原本的push方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

//指定新的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    
    //如果是成功的回调或者失败的回调
    if (onResolve || onReject) {
        
        //直接调用原来的方法
        return originalPush.call(this, location, onResolve, onReject)
    }

    //没有指定成功回调或失败回调,必须用catch处理
    return originalPush.call(this, location).catch((err)=>{
      
        //如果是重复导航的错误,不再向外传递参数
        if (VueRouter.isNavigationFailure(err)) {
            
            //产生的是成功的promise,成功promise的value是err
            return err
        }

        //如果是其他原因导致的错误,将错误向下传递
        return Promise.reject(err)
    })
}

VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this, location, onResolve, onReject)
    }
    return originalReplace.call(this, location).catch((err)=>{
      if (VueRouter.isNavigationFailure(err)) {
          return err
      }
      return Promise.reject(err)
    })
}



export default new VueRouter ({
    mode:'history',
    routes,
})