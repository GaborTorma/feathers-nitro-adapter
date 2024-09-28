<script>
export default {
  name: 'IndexPage',
}
</script>

<template>
  <div>
    <ul>
      <li>
        <NuxtLink to="/messages">
          Messages
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/users">
          Users
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 1em;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0.5em 0;
}
</style>
