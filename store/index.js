export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    console.log('init go');
    await dispatch('auth/init', req);
  }
}
