/**
 * Make sure reAuthenticate finishes before we begin rendering.
 */
export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  await auth.reAuthenticate()
})
