// https://nitro.unjs.io/guide/websocket#usage
export default defineEventHandler(async () => {
  return $fetch(
    'https://raw.githubusercontent.com/unjs/crossws/main/examples/h3/public/index.html',
  )
})
