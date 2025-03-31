<template>
  <section>
    <div class="container">
      <div class="footer">
        <p>ສົນໃຈລົງໂຄສະນາ</p>
        <a href="mailto:108vipo@gmail.com"
          ><i class="fa-solid fa-envelope"></i>108vipo@gmail.com</a
        >
        <a href="https://wa.me/8562097946474" target="_blank"
          ><i class="fa-brands fa-square-whatsapp"></i>+856 20 9794 6474</a
        >
        <a
          href="https://www.facebook.com/profile.php?id=100090273971165"
          target="_blank"
          ><i class="fa-brands fa-facebook"></i>Facebook</a
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
section {
  background-color: var(--orange-100);
  .footer {
    font-weight: 600;
    display: flex;
    justify-content: center;
    gap: 1rem;
    font-size: var(--sm-font);
    color: var(--black-900);
    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }
    a {
      transition: all ease-in-out 0.15s;
      &:hover {
        color: var(--orange-900);
      }
      i {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
