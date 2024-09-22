<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

let ws: WebSocket 
const message = ref('')

function initWebSocket() {
  ws = new WebSocket('/_ws')

  ws.onopen = () => {
    console.log('WebSocket connection opened')
  }

  ws.onmessage = (event) => {
    message.value = event.data
    console.log('Message received:', event.data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  ws.onclose = () => {
    console.log('WebSocket connection closed')
  }
}

function sendMessage() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send('ping')
  }
}

onMounted(() => {
  initWebSocket()
})

onBeforeUnmount(() => {
  if (ws) {
    ws.close()
  }
})
</script>

<template>
  <div>
    <h1>WebSocket Client</h1>
    <button @click="sendMessage">
      Send Message
    </button>
    <div v-if="message">
      Received: {{ message }}
    </div>
  </div>
</template>
