<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

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
