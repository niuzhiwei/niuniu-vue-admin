const getActions = (h, value, data, index) => {
    let result = value.filter(n => {
        let {
            filter = () => true
        } = n
        return filter.call(n, data)
    })
    return result.map(a => h('el-button', {
        class: 'btn',
        props: {
            type: 'text',
            size: 'mini'
        },
        on: {
            click: () => a.click(data, index)
        },
        key: a.prop
    }, a.label))
}
export default {
    functional: true,
    render: (h, {
        props: {
            value,
            data,
            index
        }
    }) => {
        return h('div', {
            class: 'action',
        }, getActions(h, value, data, index))
    }
}