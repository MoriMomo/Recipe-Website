<template>
  <div>
    <h1 class="title">SIGN UP</h1>
    <form @submit.prevent="onSubmit">
      <div class="container">
        <input
          type="email"
          placeholder="Enter Email"
          name="uname"
          required
          v-model="email"
        />
        <input
          type="text"
          placeholder="Enter Username"
          name="Username"
          required
          v-model="username"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          v-model="password"
        />
        <button type="submit">Sign Up</button>
      </div>
      <p class="login">
        sudah punya akun?
        <nuxt-link to="/user/login">Masuk</nuxt-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: false,
          email: this.email,
          password: this.password,
          displayName: this.username,
        })
        .then(() => this.$router.push("/"));
    },
  },
};
</script>

<style>
input[type="email"],
input[type="password"],
input[type="text"] {
  width: 20%;
  padding: 12px 20px;
  margin: 8px auto;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.title {
  text-align: center;
}
.login {
  text-align: center;
}
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px auto;
  display: block;
  border: none;
  cursor: pointer;
  width: 20%;
}

button:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}
</style>