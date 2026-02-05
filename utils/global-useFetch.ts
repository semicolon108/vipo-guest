import { createFetch } from '@vueuse/core'
import { baseApi } from './global-variable-108'
import { useAuthStore } from '~/store/auth'

const useFetchCustom = createFetch({
  baseUrl: baseApi,
  options: {
    async beforeFetch({ options }: { options: RequestInit }) {
      const store = useAuthStore()
      if (store.token) {
        options.headers = {
          ...options.headers,
          Authorization: store.token
        }
      }
      return { options }
    },
    // ⭐ ADD THIS ⭐
    async onFetchError(ctx: any) {
      try {
        const cloned = ctx.response.clone()
        ctx.error = await cloned.json()
      } catch {
        // Fallback — leave original
      }
      return ctx
    }
  },

  combination: 'overwrite'
})



export default useFetchCustom
