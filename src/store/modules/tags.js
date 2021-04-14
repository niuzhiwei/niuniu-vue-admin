const tags = {
    state: {
        tagsList: []
    },
    getters: {
        tagsList: state => state.tagsList
    },
    mutations: {
        clearAllTags: (state) => {
            state.tagsList = []
        },
        shiftTags: (state) => {
            state.tagsList.shift()
        },
        pushTags: (state, route) => {
            state.tagsList.push(route)
        },
        closeOneTag: (state, index) => {
            state.tagsList.splice(index, 1);
        },
        closeOtherTags: (state, route) => {
            state.tagsList = route
        },
        clearAllTags: (state) => {
            state.tagsList = []
        }
    }
}
export default tags