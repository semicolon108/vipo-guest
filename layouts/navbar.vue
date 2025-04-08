<template>
  <nav>
    <div class="container">
      <div class="navbar">
        <div class="navbar-start">
          <a class="logo" href="/">
            <img src="../assets/images/vipo-plus-logo-color.svg" alt="" />
          </a>
        </div>
        <div class="navbar-end">
          <NuxtLink v-if="!isAuth" to="/auth/login">ເຂົ້າສູ່ລະບົບ</NuxtLink>
          <NuxtLink to="/auth/cv" class="button register-button">
            <i class="fa-light fa-file-pdf"></i> ຝາກປະຫວັດ
          </NuxtLink>
          <a v-if="isAuth" @click="logout" class="logout" to="/auth/login">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            <span>ອອກລະບົບ</span></a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isAuth } = useAuth();

const logout = () => {
  const isConfirmed = confirm("Are you sure you want to logout?");
  if (!isConfirmed) return;

  useAuth().logout();
};
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  // background-color: var(--orange-100);
  padding: 0 1rem;
  box-shadow: 0 0 2px 0 var(--black-500);
}
.navbar {
  display: flex;
  align-items: center;
  height: 4rem;
  // color: #fff;
  .navbar-start {
    img {
      display: block;
      height: 2.5rem;
      cursor: pointer;
    }
  }
  .navbar-end {
    margin-left: auto;
    display: flex;
    gap: 1rem;
    align-items: center;
    a {
      transition: all ease-in-out 0.15s;
      &:hover {
        color: var(--orange-900);
      }
    }
  }
  .logout {
    font-size: var(--sm-font);
    display: flex;
    align-items: center;
    color: var(--black-800);
    gap: 0.25rem;
    cursor: pointer;
    i {
      font-size: var(--xsm-font);
      padding-top: 0.25rem;
    }
  }
  .register-button {
    // background-color: transparent;
    border-width: 1.5px;
    display: flex;
    gap: 0.25rem;
    background-color: var(--orange-100);
    color: var(--orange-900);
    box-shadow: inset 0 0 0 1px var(--orange-900);
    &:hover {
      color: #fff !important;
      background-color: var(--orange-900);
      &::after {
        background-color: transparent;
      }
    }
  }
}
</style>
