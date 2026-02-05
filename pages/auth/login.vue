<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit" class="login-page">
        <div class="login-form">
          <h1>ເຂົ້າສູ່ລະບົບ</h1>
          <hr />
          <div class="field">
            <label>ເບີໂທລະສັບ (ບໍ່ພິມ 020)</label>
            <div class="control">
              <input type="text" v-model="mobile" v-bind="mobileProps" placeholder="12345678" />

              <p class="error-text">{{ errors.mobile }}</p>
            </div>
          </div>
          <div class="field">
            <label>
              ລະຫັດຜ່ານ
              <span>
                <NuxtLink to="/auth/forgot-password"> ລືມລະຫັດຜ່ານ </NuxtLink>
              </span>
            </label>
            <div class="control">
              <input v-model="password" v-bind="passwordProps" type="password" placeholder="**********" />
              <p class="error-text">{{ errors.password }}</p>
            </div>
            <p class="error-text">{{ apiError }}</p>
          </div>

          <button type="submit" class="button">ເຂົ້າສູ່ລະບົບ</button>
          <p class="regsiter-link">
            ຍັງບໍ່ທັນເປັນສະມາຊິກ
            <NuxtLink to="/auth/register"> ສະໝັກສະມາຊິກ </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
const config = useRuntimeConfig();

const apiError = ref("");

const {
  values,
  errors,
  defineField,
  setFieldValue,
  handleSubmit,
  resetForm,
  setErrors,
} = useForm({
  validationSchema: yup.object({
    mobile: yup
      .string()
      .required("This field is required")
      .matches(/^\d{8}$/, "Mobile number must be exactly 8 digits"),
    password: yup.string().required("This field is required"),
  }),
});

const [mobile, mobileProps] = defineField("mobile");
const [password, passwordProps] = defineField("password");

const login = async (form: any) => {
  try {
    const { data, error }: any = await useFetch(
      `${config.public.apiBase}/seeker-signIn-vipo`,
      {
        method: "POST",
        body: {
          email: form.mobile,
          password: form.password,
        },
      }
    );

    if (error.value) {
      apiError.value = "Mobile or password is incorrect";
      setTimeout(() => {
        apiError.value = "";
      }, 2000);
      return;
    }

    const token = data.value.token;

    // Save the token in a secure cookie
    const tokenCookie: any = useCookie("auth-token", {
      maxAge: 60 * 60 * 24 * 365, // 7 days
      httpOnly: false, // Set to true if managed from server-side
      secure: false, // set to true if using HTTPS
      sameSite: "lax",
    });

    tokenCookie.value = token;

    navigateTo("/");
  } catch (e) {
    console.log(e);
  }
};

const onSubmit = handleSubmit((values) => {
  login(values);
});

// onMounted(() => {
//   mobile.value = "58593344";
// });
</script>

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
    }

    // label
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
