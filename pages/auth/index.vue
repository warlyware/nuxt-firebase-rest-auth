<template>
<div>
  <h1>auth</h1>
  <form @submit.prevent="handleLogin">
    <label for="email">Email</label>
    <input type="text" name="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <button type="submit">Submit</button>
  </form>
</div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('auth/authenticateUser', {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      }).then(() => {
        console.log('auth success!');
        this.$router.push('/my-shelf');
      });
    }
  }

}
</script>

<style scoped>

</style>
