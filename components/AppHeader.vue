<template>
  <header>
    <button @click="handleLogout">Logout</button>
  </header>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
