<template>
  <div class="paginate">
    <label for="">ໜ້າ</label>
    <div class="select">
      <select name="" id="" class="small">
        <option value="1">01</option>
        <option value="1">02</option>
        <option value="1">03</option>
      </select>
    </div>
    <p>/</p>
    <p class="number_of_page">30</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.paginate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .select {
    select {
      width: 60px;
      background-color: var(--black-200);
    }
  }
  .number_of_page,
  p {
    color: var(--black-600);
  }
}
</style>
