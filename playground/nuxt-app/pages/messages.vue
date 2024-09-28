<script setup lang="ts">
import type { Messages } from 'feathers-api/src/client'

const { api } = useFeathers()

// create message
const text = import.meta.server ? 'Hello, world! (server)' : 'Hello, world! (client)'
await api.service('messages').create({ text })

// get messages
const params = computed(() => ({ query: { $limit: 20 } }))
const messages = api.service('messages').useFind<Messages>(params, { paginateOn: 'hybrid' })

// add message
const newMessage = ref('')
async function addMessage() {
  console.log('newMessage.value:', newMessage.value)
  await api.service('messages').create({ text: newMessage.value })
}

onMounted(() => {
  console.log('user:', useAuthStore().user)
})

// logout
function logout() {
  useAuthStore().logout()
  navigateTo('/')
}
</script>

<template>
  <div>
    <input v-model="newMessage" placeholder="add new message">
    <button @click="addMessage">
      Add message {{ newMessage }}
    </button>
    <p>Total: {{ messages.total }}</p>
    <p v-for="message in messages.data" :key="message.id">
      {{ message.id }}: {{ message.text }}
    </p>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>
