export default ({ store, redirect, req }) => {
  store.dispatch('auth/init', req);
}
