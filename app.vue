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
  title: "VIPO - ວີໂປ",
  ogTitle: "VIPO - ວີໂປ ພື້ນທີ່ຊອກວຽກສຳລັບນັກສຶກສາ ແລະນັກສຶກສາໃໝ່",
  description:
    "Volunteer work, Internship, Apprenticeship, Part-Time jobs and Opportunities for Zero-Experience.",
  ogDescription: "VIPO",
  ogImage: "",
  ogImageSecureUrl: "",
  ogImageWidth: "1280",
  ogImageHeight: "630",
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
    //   console.log(user);
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
.error-text {
  color: red !important;
}
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

.card-job-description {
  border: 1px solid var(--black-300);
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1.5rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b {
    font-weight: 700;
  }

  ul,
  ol {
    margin: 0.5rem 0;

    li {
      margin-left: 2rem;
      line-height: 1.5;
    }
  }

  ul li {
    list-style-type: disc !important;
  }

  img {
    width: 100%;
    display: block;

    &:not(:last-child) {
      margin: 1rem 0;
    }
  }
}
</style>
