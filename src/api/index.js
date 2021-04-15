import request from '../utils/request'

export const getTable = (query) => {
    return request({
        url: '/gettable',
        method: 'get',
        params: query
    })
}

export const fetchTable = (query) => {
    return request({
        url: '/table',
        method: 'get',
        params: query
    })
}