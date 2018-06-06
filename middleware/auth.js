export default ({ store, redirect }) => {
  console.log(!store.getters['auth/isAuthenticated']);
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/auth');
  }
}
