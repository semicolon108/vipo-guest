export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const tokenCookie = useCookie('auth-token');

    const apiFetch = $fetch.create({
        baseURL: config.public.apiBase,
        onRequest({ options }: any) {
            const token = tokenCookie.value;
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `${token}`,
                };
            }
        },
    });

    return {
        provide: {
            apiFetch,
        },
    };
});

// export default defineNuxtPlugin(() => {
//     const config = useRuntimeConfig();
//     const tokenCookie = useCookie('auth-token');
//
//     const apiFetch = $fetch.create({
//         baseURL: config.public.apiBase,
//         onRequest({ options }: any) {
//             const token = tokenCookie.value;
//             if (token) {
//                 options.headers = {
//                     ...options.headers,
//                     Authorization: `${token}`,
//                 };
//             }
//         },
//     });
//
//     return {
//         provide: {
//             apiFetch,
//         },
//     };
//
// });

// reverse of useFetch i true way of useFetch will cry to hook iw will try fix you