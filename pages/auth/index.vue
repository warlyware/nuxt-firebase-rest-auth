<template>
<div>
  <form @submit.prevent="handleLogin" v-if="isLogin">
    <h1>login</h1>
    <label for="email">Email</label>
    <input type="text" name="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <button type="submit">Submit</button>
  </form>
  <form @submit.prevent="handleSignUp" v-else>
    <h1>signup</h1>
    <label for="email">Email</label>
    <input type="text" name="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <button type="submit">Submit</button>
  </form>
  <br>
  <button @click="updateFormType" >
    <span v-if="isLogin">no account? signup here.</span>
    <span v-else>have an account? login here.</span>
  </button>
  <br><br>
  <p class="error" v-if="errorMessage">{{errorMessage}}</p>
</div>
</template>

<script>

export default {
  data() {
    return {
      isLogin: true,
      errorMessage: null,
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('auth/authenticateUser', {
        email: this.email,
        password: this.password
      }).then(() => {
        console.log('auth success!');
        this.$router.push('/my-shelf');
      }).catch(err => {
        console.error('login error', err);
        this.errorMessage = 'there was a problem logging in. please try again.';
      })
    },
    handleSignUp() {
      this.$store.dispatch('auth/signUpNewUser', {
        email: this.email,
        password: this.password
      }).then(() => {
        console.log('sign up success!');
        this.$router.push('/my-shelf');
      }).catch(err => {
        console.error('sign up error', err);
        this.errorMessage = 'there was a problem signing up. please try again.';
      });
    },
    updateFormType() {
      this.isLogin = !this.isLogin;
      errorMessage = null;
    }
  }

}
</script>

<style scoped>
  .error {
    color: darkred;
  }
</style>
