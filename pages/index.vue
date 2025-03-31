<template>
  <section class="search-section">
    <div class="container">
      <h1 class="section-title">ຄົ້ນຫາວຽກ</h1>
      <div class="search-container">
        <div class="field">
          <input type="text" class="input" placeholder="ຊອກຕຳແໜ່ງ" required />
        </div>
        <div class="field">
          <div class="select">
            <select name="" id="" required>
              <option value="" disabled selected>ເລືອກແຂວງ</option>
              <option value="">ນະຄອນຫຼວງວຽງຈັນ</option>
              <option value="">ນະຄອນຫຼວງພະບາງ</option>
              <option value="">ວຽງຈັນ</option>
            </select>
          </div>
        </div>
        <div class="field">
          <div class="select">
            <select required>
              <option value="" disabled selected>ເວລາເຮັດວຽກ</option>
              <option value="">07:00 - 15:00</option>
              <option value="">16:00 - 21:00</option>
              <option value="">08:00 - 17:00</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="filter">
        <div class="start">
          <h1>ວຽກທັງໝົດ:</h1>
          <span>10</span>
        </div>
        <div class="end">
          <Paginate />
        </div>
      </div>
      <div class="job-card-list">
        <Jobcard v-for="i in 9" />
      </div>
      <div class="pages">
        <Paginate />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//Test
</script>

<style lang="scss" scoped>
.search-section {
  position: relative;
  background-color: var(--orange-100);
  @media screen and (max-width: 768px) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  svg {
    position: absolute;
    top: 100px;
  }
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  .start {
    display: flex;
    h1 {
      font-weight: 500;
    }
    span {
      margin-left: 0.25rem;
      font-weight: 700;
      color: var(--orange-900);
    }
  }
}
.pages {
  padding: 2rem 0 0;
  display: flex;
  justify-content: center;
}
.job-card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
.section-title {
  font-weight: 700;
  font-size: var(--lg-font);
  margin-bottom: 0.5rem;
}
.search-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  input {
    background-color: #fff;
  }
}
</style>
