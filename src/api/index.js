import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//添加请求拦截器
axios.interceptors.request.use(function(config) {
    //将token给到一个前后台约定好的key中，作为请求发送
    let token = localStorage.getItem('myToken')
    if (token) {
        config.headers['Authorization'] = token
    }
    return config;
}, function(error) {
    return Promise.reject(error);
})

//登录验证
export const checkUser = params => {
    return axios.post('login', params).then(res => res.data)
}

//获取用户列表
export const getUserList = params => {
    return axios.get('users', params).then(res => res.data)
}

//修改用户状态
export const changeUserState = params => {
    return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}