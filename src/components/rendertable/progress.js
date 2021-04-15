export default {
    functional: true,
    render(h, {
        props: {
            value,

        }
    }) {

        return h('el-progress', {
            props: {
                percentage: value,
                status: value >= 80 ? 'success' : null,
                'text-inside': true,
                "stroke-width": 20,
                size: 'mini'
            }
        })
    }
}