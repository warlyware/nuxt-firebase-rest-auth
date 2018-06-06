import Cookie from 'js-cookie';
import axios from 'axios';

import { handleClientInit, handleServerInit } from '@/services/auth';

export const state = () => ({
  token: null
});

export const getters = {
  isAuthenticated(state) {
    console.log('checking auth token', state);
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
    const apiEndpoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_API_KEY}`;
    return axios.post(apiEndpoint, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(res => {
      console.log(res);
      commit('setToken', res.data.idToken);
      Cookie.set('jwt', res.data.idToken);
      Cookie.set('expirationDate',  new Date().getTime() + Number(res.data.expiresIn) * 1000);
    });
  },
  signUpNewUser({ commit, dispatch }, authData) {
    const apiEndpoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.FIREBASE_API_KEY}`;
    return axios.post(apiEndpoint, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(res => {
      console.log('signup success', res);
      commit('setToken', res.data.idToken);
      Cookie.set('jwt', res.data.idToken);
      Cookie.set('expirationDate',  new Date().getTime() + Number(res.data.expiresIn) * 1000);
    });
  },
  logout({ commit }) {
    commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
  }
}
