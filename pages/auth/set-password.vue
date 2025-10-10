<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit" class="forgot-password-page">
        <div class="forgot-password-form">
          <h1>{{ route.query.type === 'register' ? 'ຕັ້ງລະຫັດຜ່ານ' : 'ຕັ້ງລະຫັດໃຫມ່' }}</h1>
          <hr />
          <div class="field">
            <label>{{ route.query.type === 'register' ? 'ລະຫັດຜ່ານ' : 'ລະຫັດໃຫມ່' }}</label>
            <div class="control">
              <div>
                <input type="password" v-model="password" v-bind="passwordAttrs" placeholder="Password" />
                <span class="error-text">{{ errors.password }}</span>
              </div>
            </div>
          </div>
          <div class="field">
            <label>{{ route.query.type === 'register' ? 'ພິມລະຫັດຜ່ານອີກຄັ້ງ' : 'ພິມລະຫັດໃຫມ່ອີກຄັ້ງ' }}</label>

            <div class="control">
              <input type="password" v-model="confirmPassword" v-bind="confirmPasswordAttrs"
                placeholder="Confirm Password" />
              <span class="error-text">{{ errors.confirmPassword }}</span>
            </div>
          </div>
          <button class="button" type="submit">
            {{ route.query.type === 'register' ? 'ສະໝັກສະມາຊິກ' : 'ບັນທຶກລະຫັດ' }}

          </button>
        </div>
        <!--        <div class="completed">-->
        <!--          <h1>ຕັ້ງລະຫັດໃຫມ່ສຳເລັດແລ້ວ</h1>-->
        <!--          <div class="buttons">-->
        <!--            <button class="button light-orange">ຊອກວຽກ</button>-->
        <!--            <button class="button orange">ເຂົ້າສູ່ລະບົບ</button>-->
        <!--          </div>-->
        <!--        </div>-->
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">

import { useForm } from "vee-validate";
import * as yup from "yup";
const config = useRuntimeConfig();
const apiError = ref('')

const route = useRoute()

// Validation schema with password confirmation
const validationSchema = yup.object({
  password: yup.string().min(6).required("This field is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const { values, errors, defineField, handleSubmit } = useForm({ validationSchema });

// Define fields with defineField
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');


const register = async () => {
  if (route.query.type === 'register' && route.query.mobile && route.query.token) {
    const form = {
      mobile: route.query.mobile,
      password: password.value,
      source: route.query?.source as string ?? "vipo"
    }
    const { data, error }: any = await useFetch(`${config.public.apiBase}/register-vipo-seeker`, {
      method: 'POST',
      body: form,
    });

    if (error.value) {
      apiError.value = error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    const token = data.value.token

    // Save the token in a secure cookie
    const tokenCookie = useCookie('auth-token', {
      maxAge: 60 * 60 * 24 * 365, // 7 days
      httpOnly: false,          // Set to true if managed from server-side
      secure: false,            // set to true if using HTTPS
      sameSite: 'lax',
    });

    tokenCookie.value = token;

    navigateTo('/')

  }
  else if (route.query.type === 'forgotPassword' && route.query.mobile && route.query.token) {

    const form = {
      changePassToken: route.query.token,
      newPassword: password.value,
      confirmPassword: confirmPassword.value
    }

    const { data, error }: any = await useFetch(`${config.public.apiBase}/seeker-reset-password-vipo`, {
      method: 'POST',
      body: form,
    });

    if (error.value) {
      apiError.value = error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    const token = data.value.token

    navigateTo('/auth/login')

  }




}

// Submit handler
const onSubmit = handleSubmit((values) => {
  register()
})

</script>

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
    }

    // label
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
