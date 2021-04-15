import * as Components from './components'
const empty = '-'

export default {
    functional: true,
    props: {
        config: Object,
        data: Object
    },
    render: (h, c) => {
    
        let {
            props: {
                config = {},
                data = {}
            }
        } = c, {
            prop,
            type = 'Default'
        } = config, index = data.$index, value = data['row'][prop] || config.value, isEmpty = value === '' || value === undefined;
        return isEmpty ? h(Components.Default, {
            props: {
                value: empty
            }
        }) : h(Components[type], {
            props: {
                value,
                empty,
                index,
                data: data['row'],
                ...config
            }
        });
    }
}