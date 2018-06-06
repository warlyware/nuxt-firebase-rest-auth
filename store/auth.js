export const state = () => {
  token: null
}

export const getters = {
  isAuthenticated(state) {
    console.log('checking auth token');
    return state.token !== null;
  }
}

export const actions = {
  init() {
    console.log('running initAuth');
  }
}
