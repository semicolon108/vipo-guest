<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

const { isAuth, user } = useAuth();

const { $apiFetch } = useNuxtApp();
const { setUser } = useAuth();

const route = useRoute()

watch(() => route.path, () => {
  if(isAuth.value && (route.path === '/auth/login' || route.path === '/auth/register')) {
    navigateTo('/')
  }
}, {immediate: true})


const getCurrentUser = async () => {

  const { data }: any = await useAsyncData('getCurrentUser', () =>
      $apiFetch('/get-seeker-info-vipo')
  );
 const user = data.value
  if (user) {
    console.log(  user)
    setUser(data.value);
  }

}

watch(() => isAuth.value, () => {
  if(isAuth.value){
    getCurrentUser()
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
