<template>
  <header>
    <button @click="handleLogout" v-if="authenticated">Logout</button>
    <nuxt-link tag="button" to="/auth" v-else>Login</nuxt-link>
  </header>
</template>

<script>
export default {
  asyncData({}) {
    return {
      authenticated: store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
}
</script>

<style scoped>

</style>
