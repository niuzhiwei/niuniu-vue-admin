//设置浏览器头部标题
export const setTitle = (title) => {
    title = title ? title : '后台管理系统'
    window.document.title = title
}