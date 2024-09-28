<script setup lang="ts">
const authStore = useAuthStore()

const auth = reactive<{ userId: string, password: string }>({ userId: 'test', password: '12345' })

async function login() {
  try {
    await authStore.authenticate({ strategy: 'local', ...auth })
    navigateTo('/messages')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="userId">User ID:</label><br>
        <input id="userId" v-model="auth.userId" type="text" required>
      </div>
      <div>
        <label for="password">Password:</label><br>
        <input id="password" v-model="auth.password" type="password" required>
      </div>
      <button id="login" type="submit">
        Login
      </button>
      <div>
        <p>Password of test user 12345</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-page div {
  margin-bottom: 10px;
}
.login-page p {
  font-size: 0.9em;
}
</style>
