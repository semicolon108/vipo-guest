<template>
  <section>
    <div class="container">
      <div class="forgot-password-page">
        <div class="forgot-password-form">
          <h1>ຕັ້ງລະຫັດໃຫມ່</h1>
          <hr />
          <div class="field">
            <label>ລະຫັດໃຫມ່</label>
            <div class="control">
              <input type="text" required placeholder="**********" />
            </div>
          </div>
          <div class="field">
            <label>ພິມລະຫັດໃຫມ່ອີກຄັ້ງ</label>
            <div class="control">
              <input type="text" required placeholder="**********" />
            </div>
          </div>
          <button class="button" @click="$router.push('/auth/set-password')">
            ບັນທຶກລະຫັດ
          </button>
        </div>
        <div class="completed">
          <h1>ຕັ້ງລະຫັດໃຫມ່ສຳເລັດແລ້ວ</h1>
          <div class="buttons">
            <button class="button light-orange">ຊອກວຽກ</button>
            <button class="button orange">ເຂົ້າສູ່ລະບົບ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.forgot-password-page {
  height: calc(100vh - 13rem);
  display: flex;
  align-items: center;
  flex-direction: column;
}
hr {
  background-color: var(--deep-blue-900);
  height: 3px;
  border-radius: 3px;
  border: none;
  width: 2.5rem;
  margin: 1rem 0;
}
.forgot-password-form {
  max-width: 350px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  h1 {
    font-weight: 700;
    font-size: var(--xlg-font);
    margin-bottom: 0.25rem;
  }
  p {
    font-size: var(--md-font);
  }
  .field {
    margin-bottom: 1rem;
    width: 100%;
    label {
      margin-bottom: 0.25rem;
      display: block;
      font-size: var(--sm-font);
      &:has(span) {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        span {
          font-size: var(--xsm-font);
          color: var(--orange-900);
          transition: all ease-in-out 0.15s;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    } // label
    input {
      background-color: var(--black-200);
    }
  }

  button {
    background-color: var(--deep-blue-900);
    color: #fff;
  }
}
.completed {
  h1 {
    font-size: var(--xlg-font);
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
