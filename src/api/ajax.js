/* 
axios二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//配置通用的基础路径和超时
const service = axios.create({
    baseURL: '/api',
    timeout: 2000 

})

//添加请求拦截器
service.interceptors.request.use((config)=>{
  //显示请求进度
    NProgress.start()

    //必须返回config
    return config
})

//添加响应拦截器
service.interceptors.response.use(
    response => {
        //隐藏请求进度度
        NProgress.done()

        //成功返回的数据不再是response,而是直接是响应体数据response.data
        return response.data
    },

    error => {

        //隐藏请求精度条
        NProgress.done()

        //统一处理请求错误,具体请求也可以选组不处理
        alert(error.message || '未知的错误')

        return Promise.reject(error)
    }
)

//向外暴露
export default service