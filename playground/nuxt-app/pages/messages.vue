<script setup lang="ts">
import type { Messages } from 'feathers-api/src/client'

const { api } = useFeathers()
const newMessage = ref('')
await api.service('messages').create({ text: 'Hello, world!' })
const params = computed(() => ({ query: { $limit: 20 } }))
const messages = api.service('messages').useFind<Messages>(params, { paginateOn: 'hybrid' })
async function add() {
  console.log('newMessage.value:', newMessage.value)
  await api.service('messages').create({ text: newMessage.value })
}
</script>

<template>
  <div>
    <input v-model="newMessage" placeholder="add new message">
    <button @click="add">
      Add message {{ newMessage }}
    </button>
    <p>Total: {{ messages.total }}</p>
    <p v-for="message in messages.data" :key="message.id">
      {{ message.id }}: {{ message.text }}
    </p>
  </div>
</template>
