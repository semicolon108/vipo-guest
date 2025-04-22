<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Toast from "@/components/Toast.vue";


useSeoMeta({
  title: "VIPO",
  ogTitle: "VIPO",
  description: "VIPO",
  ogDescription: "VIPO",
  ogImage: "",
  ogImageSecureUrl: "",
  ogImageWidth: "1280",
  ogImageHeight: "720",
  ogImageType: "image/png",
  ogImageAlt: "",
  ogUrl: "",
  ogSiteName: "",
  ogLocale: "en_US",
  ogType: "website",
  keywords: "",
  robots: "follow, index",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
});

const { isAuth } = useAuth();

const { $apiFetch } = useNuxtApp();
const { setUser } = useAuth();

const route = useRoute();

watch(
  () => route.path,
  () => {
    if (
      isAuth.value &&
      (route.path === "/auth/login" || route.path === "/auth/register")
    ) {
      navigateTo("/");
    }
  },
  { immediate: true }
);


const getCurrentUser = async () => {
  const { data }: any = await useAsyncData("getCurrentUser", () =>
    $apiFetch("/get-seeker-info-vipo")
  );
  const user = data.value;
  if (user) {
     console.log(user);
    setUser(user);
  }
};

watch(
  () => isAuth.value,
  () => {
    if (isAuth.value) {
      getCurrentUser();
    }
  },
  { immediate: true }
);

</script>

<style lang="scss">
body {
  font-family: var(--font-family);
  font-weight: 500;
}

section {
  padding: 2rem 0;
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
}
.container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>
