import Cookie from 'js-cookie';

export const handleServerInit = (req, commit, dispatch) => {
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

export const handleClientInit = (commit, dispatch) => {
  let token = Cookie.get('jwt');
  let expirationDate = Cookie.get('expirationDate');

  if (new Date().getTime() > Number(expirationDate) || !token) {
    dispatch('logout');
  }

  commit('setToken', token);
}
