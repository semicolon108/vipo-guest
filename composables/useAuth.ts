// composables/useAuth.ts
// export const useAuth = () => {
//     const tokenCookie = useCookie<string | null>('auth-token', { default: () => null });
//     const user = useState<any>('currentUser', () => null);
//
//     const isAuth = computed(() => !!tokenCookie.value && !!user.value);
//
//     const setUser = (userData: any) => {
//         user.value = userData;
//     };
//
//     const setToken = (token: string) => {
//         tokenCookie.value = token;
//     };
//
//     const logout = () => {
//         tokenCookie.value = null;
//         user.value = null;
//         navigateTo('/auth/login', { replace: true });
//     };
//
//     return {
//         isAuth,
//         token: tokenCookie,
//         user,
//         setUser,
//         setToken,
//         logout
//     };
// };


import { useAuthStore } from '~/store/auth'

export const useAuth = () => {
    const authStore = useAuthStore()
    const user = useState<any>('currentUser', () => null)

    const setUser = (userData: any) => {
        user.value = userData
    }

    const isAuth = computed(() => !!authStore.token)

    const token = computed({
        get: () => authStore.token,
        set: (val) => {
            authStore.token = val
        }
    })

    const logout = () => {
        authStore.token = null // Clear the cookie
        navigateTo('/auth/login')     // Redirect user to login
    }

    return { isAuth, token, logout, user, setUser }
}
