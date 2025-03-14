<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./navbar.vue";
import Footer from "./footer.vue";
</script>
<style lang="scss"></style>
