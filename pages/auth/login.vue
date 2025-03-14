<template>
  <section>
    <div class="container">
      <div class="login-page">
        <div class="login-form">
          <h1>ເຂົ້າສູ່ລະບົບ</h1>
          <hr />
          <div class="field">
            <label>ເບີໂທລະສັບ</label>
            <div class="control">
              <input type="text" required placeholder="020" />
            </div>
          </div>
          <div class="field">
            <label
              >ລະຫັດຜ່ານ
              <span
                ><NuxtLink to="/auth/forgot-password"
                  >ລືມລະຫັດຜ່ານ</NuxtLink
                ></span
              ></label
            >
            <div class="control">
              <input type="text" required placeholder="**********" />
            </div>
          </div>
          <button class="button">ເຂົ້າສູ່ລະບົບ</button>
          <p class="regsiter-link">
            ຍັງບໍ່ທັນເປັນສະມາຊິກ<a href="">ສະໝັກສະມາຊິກ</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-page {
  height: calc(100vh - 13rem);
  display: flex;
  align-items: center;
}
.login-form {
  max-width: 350px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  hr {
    background-color: var(--orange-900);
    height: 3px;
    border-radius: 3px;
    border: none;
    width: 2.5rem;
    margin: 1rem 0;
  }
  h1 {
    font-weight: 700;
    font-size: var(--xlg-font);
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
  .regsiter-link {
    margin-top: 1rem;
    font-size: var(--sm-font);
    a {
      margin-left: 0.25rem;
      color: var(--orange-900);
    }
  }

  button {
    background-color: var(--orange-900);
    color: #fff;
  }
}
</style>
