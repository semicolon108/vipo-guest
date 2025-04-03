<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

const { isAuth } = useAuth();

const route = useRoute()

watch(() => route.path, () => {
  if(isAuth.value && (route.path === '/auth/login' || route.path === '/auth/register')) {
    navigateTo('/')
  }
}, {immediate: true})
</script>

<style lang="scss">

.error-text {
  color: red;
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
</style>
