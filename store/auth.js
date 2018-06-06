export const state = () => ({
  token: null
});

export const getters = {
  isAuthenticated(state) {
    console.log('checking auth token', state.token);
    return state.token !== null;
  }
}

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
}

const handleServerInit = (req, store) => {
  if (!req.headers.cookie) {
    return
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('jwt='));

  if (!jwtCookie) {
    return
  }

  let token = jwtCookie.split('=')[1];
  let expirationDate = req.headers.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('expirationDate='))
    .split('=')[1];

  if (new Date().getTime() > Number(expirationDate) || !token) {
    dispatch('logout');
  }

  commit('setToken', token);
}

const handleClientInit = (req, store) => {
  let token = Cookie.get('jwt');
  let expirationDate = Cookie.get('expirationDate');

  if (new Date().getTime() > Number(expirationDate) || !token) {
    dispatch('logout');
  }

  commit('setToken', token);
}

export const actions = {
  init({ commit, dispatch }, req) {
    if (process.server) {
      handleServerInit(req, store);
    } else {
      handleClientInit(req, store);
    }
    console.log('running initAuth');
  },
  logout({ commit }) {
    commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
  }
}
