import { defineStore } from 'pinia'

import { useRouter, useCookie } from '#app'

export const useAuthStore = defineStore('auth', () => {
  const token: any = useCookie<string | null>('auth-token', {
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  const isRegister = ref(false)
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
