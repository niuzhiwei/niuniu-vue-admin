import axios from 'axios';
const request = axios.create({
    baseURL: '/api',
    // baseURL: 'https://www.fastmock.site/mock/84374715c999223c706a336d0d72dea5/api',
    timeout: 5000
})

request.interceptors.response.use((response) => {
    const res = response.data
    if (res.status === 0) {
        return res.data
    } else {
        ELEMENT.MessageBox.warning(res.msg)
        return Promise.reject(res)
    }
}, (error) => {
    const res = error.response
    ELEMENT.MessageBox.error(res.data.message)
    return Promise.reject(error);
})

export default request