import { defineStore } from 'pinia'

import { useRouter, useCookie } from '#app'

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie: any = useCookie<string | null>('auth-token', {
    sameSite: 'lax',
    secure: true, // set false if not HTTPS in dev
    path: '/',
  })

  const isRegister = ref(false)
  const token = ref<string | null>(tokenCookie.value || null)
  const isAuth = computed(() => !!token.value)
  const isLoginModal = ref(false)
  const loginType = ref('')

  // login modal
  const LoginModal = (data: any, type?: string) => {
    isLoginModal.value = data
    if (type === 'cv') {
      loginType.value = type

      const loginTypeCookie: any = useCookie('loginType')
      loginTypeCookie.value = 'cv'
    }
  }


  return {
    token,
    isAuth,
    isLoginModal,
    isRegister,
    LoginModal,
    loginType
  }
})
