<template>
  <div>
    <h1 class="title"></h1>
    <div>
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
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            v-model="password"
          />
          <button type="submit">Log In</button>
          <p class="new-account">
            New User?
            <nuxt-link to="/user/signup">buat akun</nuxt-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: true,
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push("/"));
    },
  },
};
</script>

<style>
input[type="email"],
input[type="password"] {
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
.new-account {
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