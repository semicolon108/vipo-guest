export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const tokenCookie = useCookie('auth-token');

    const apiFetch = $fetch.create({
        baseURL: config.public.apiBase,  // Use your runtimeConfig base URL
        onRequest({ options }) {
            const token = tokenCookie.value;
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `${token}`,  // Attach token automatically
                };
            }
        },
    });

    return {
        provide: {
            apiFetch, // Injected globally
        },
    };
});
