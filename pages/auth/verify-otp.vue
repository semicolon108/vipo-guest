<template>
  <section>
    <div class="container">
      <div class="forgot-password-page">
        <div class="forgot-password-form">
          <h1>ຢືນຢັນລະຫັດ OTP</h1>
          <p>ທ່ານຈະໄດ້ຮັບລະຫັດ OTP ທາງຂໍ້ຄວາມ.</p>
          <hr />
          <div class="field">
            <label>ລະຫັດຢືນຢັນ OTP</label>
            <div class="control">
              <input type="text" required placeholder="000000" />
            </div>
          </div>
          <button
            class="button light-blue"
            @click="$router.push('/auth/set-password')"
          >
            ຢືນຢັນລະຫັດ
          </button>
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
}
</style>
