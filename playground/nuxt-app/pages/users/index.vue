<script setup lang="ts">
const { api } = useFeathers()
const users = await api.service('users').find()
</script>

<template>
  <div>
    <p v-for="user in users.data" :key="user.id">
      {{ user.id }}: {{ user.userId }}
    </p>
  </div>
</template>
