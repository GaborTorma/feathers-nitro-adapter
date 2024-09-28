<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const { api } = useFeathers()
const id = useRoute().params.id
const user = await api.service('users').findOne({ query: { id } })
</script>

<template>
  <div>
    <p>
      {{ user.id }}: {{ user.userId }}
    </p>
  </div>
</template>
