import request from '../utils/request'

export const fetchTable = (query) => {
    return request({
        url: '/table',
        method: 'get',
        params: query
    })
}

export const login = (params) => {
    return request({
        url: '/login',
        method: 'post',
        data: params
    })
}

export const getUserInfo = () => {
    return request({
        url: '/getUserInfo',
        method: 'get'
    })
}