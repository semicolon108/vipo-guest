export const useAuth = () => {
    const tokenCookie = useCookie('auth-token');

    const isAuth = computed(() => !!tokenCookie.value);

    const logout = () => {
        tokenCookie.value = null; // Clear the cookie
        navigateTo('/auth/login');     // Redirect user to login
    };

    return { isAuth, token: tokenCookie, logout };
};