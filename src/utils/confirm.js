import {
    MessageBox
} from 'element-ui'

export const handleComfirm = (text = '确定执行此操作吗？', type = 'warning') => {
    return MessageBox.confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        type,
    })
}