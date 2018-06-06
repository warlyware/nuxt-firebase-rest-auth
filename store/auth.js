import Cookie from 'js-cookie';
import axios from 'axios';

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

const handleServerInit = (req, commit, dispatch) => {
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

const handleClientInit = (commit, dispatch) => {
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
      handleServerInit(req, commit, dispatch);
    } else {
      handleClientInit(commit, dispatch);
    }
    console.log('running initAuth');
  },
  authenticateUser({ commit, dispatch }, authData) {
    console.log('api key', process.env.FIREBASE_API_KEY);
    const apiEndpoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_API_KEY}`;
    axios.post(apiEndpoint, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(res => {
      console.log(res);
      commit('setToken', res.data.idToken);
      Cookie.set('jwt', res.data.idToken);
      Cookie.set('expirationDate',  new Date().getTime() + Number(res.data.expiresIn) * 1000);
    }).catch(err => {
      console.error(err);
    });
  },
  logout({ commit }) {
    commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
  }
}
