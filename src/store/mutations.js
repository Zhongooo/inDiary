const mutations = {
    keepAlive(state, component) {
        !state.catchList.includes(component) &&
        state.catchList.push(component)
    },
    noKeepAlive(state) {
     state.catchList = []
    }
  };

  export default mutations;