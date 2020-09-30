const mutations = {
    set_token(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    del_token(state) {
        state.token = '';
        localStorage.removeItem('token');
    },
    keepAlive(state, component) {
        !state.catchList.includes(component) &&
            state.catchList.push(component)
    },
    noKeepAlive(state) {
        state.catchList = []
    }
};

export default mutations;