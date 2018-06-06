export default ({ store, redirect, route }) => {
  if (!store.getters['auth/isAuthenticated']) {
    if (route.path === '/auth') {
      return;
    }
    redirect('/auth');
  }
  if (route.path === '/auth' && store.getters['auth/isAuthenticated']) {
    redirect('/my-shelf');
  }
}
