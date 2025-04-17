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