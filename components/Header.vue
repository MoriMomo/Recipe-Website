<template>
  <header class="header">
    <nuxt-link tag="h1" to="/" class="header-title"> Food Recipes</nuxt-link>
    <nav class="header-nav">
      <nuxt-link tag="a" to="/" class="header-nav__link">Home</nuxt-link>
      <nuxt-link tag="a" to="/add" class="header-nav__link"
        >Add Recipes</nuxt-link
      >
      <nuxt-link
        tag="a"
        to="/user/login"
        class="header-nav__link"
        v-if="!$store.state.token"
        >login</nuxt-link
      >

      <a
        class="header-nav__link"
        v-if="$store.state.token"
        @click.prevent="logout"
      >
        Logout
      </a>

      <nuxt-link to="/user" class="header-nav__link" v-if="$store.state.token">
        {{ $store.state.userData.username }}</nuxt-link
      >
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/user/login");
    },
  },
};
</script>

<style>
body {
  margin: 0px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #eef2e6;
}

main {
  margin: 22px;
}

.header-title {
  font-family: "Poppins", sans-serif;
}
</style>