export default ({ store, redirect, route }) => {
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/auth');
    return;
  }
  if (route.path === '/auth' && store.getters['auth/isAuthenticated']) {
    redirect('/my-shelf');
  }
}
