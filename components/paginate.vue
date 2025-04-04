<template>
  <div class="paginate">
    <label for="">ໜ້າ</label>
    <div class="select">
      <select name="" id="" class="small">

        <option v-for="i in lastPage" :value="i">{{ i }}</option>
      </select>
    </div>
    <p>/</p>
    <p class="number_of_page">{{ lastPage }}</p>
  </div>
</template>

<script setup lang="ts">

const {lastPage} = defineProps(['lastPage'])

</script>

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
