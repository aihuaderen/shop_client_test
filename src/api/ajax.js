/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import nProgress from 'nprogress'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//配置通用的基础路径和超时
const service = axios.create({
    baseURL: '/api',
    timeout: 20000
})

service.interceptors.request.use((config)=>{
  
    NProgress.start()

    return config
})

service.interceptors.response.use(
    response => {
        NProgress.done()

        return response.data
    },

    error => {
        NProgress.done()

        alert(err.message || '未知的请求错误')

        return Promise.reject(error)
    }

)

//向外暴露 service
export default service