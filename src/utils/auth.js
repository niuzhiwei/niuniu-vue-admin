import Cookies from 'js-cookie'

export const getToken = (token) => {
    return Cookies.get(token)
}

export const setToken = (key, token) => {
    return Cookies.set(key, token)
}

export const removeToken = (key) => {
    return Cookies.remove(key)
}