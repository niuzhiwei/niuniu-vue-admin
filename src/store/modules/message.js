const message = {
    state: {
        message: 0
    },
    getters: {
        message: state => state.message
    },
    mutations: {
        changeMsg(state, msg) {
            state.message = msg
        }
    }
}
export default message