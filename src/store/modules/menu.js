const tags = {
    state: {
        collapse: false
    },
    getters: {
        collapse: state => state.collapse
    },
    mutations: {
        menuCollapse: (state) => {
            state.collapse = !state.collapse
        },
    }
}
export default tags