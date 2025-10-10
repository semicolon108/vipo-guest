<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit" class="login-page">
        <div class="login-form">
          <h1>ສະໝັກສະມາຊິກ</h1>
          <hr />
          <div class="field">
            <div>
              <label>ເບີໂທລະສັບ (ບໍ່ພິມ 020)</label>
              <div class="control">
                <input type="text" v-model="mobile" v-bind="mobileProps" placeholder="12345678" />
                <p class="error-text">{{ errors.mobile }}</p>
              </div>
              <p class="error-text">{{ apiError }}</p>
            </div>
          </div>
          <button type="submit" class="button">ສະໝັກສະມາຊິກ</button>
          <p class="regsiter-link">
            ມີບັນຊີຢູ່ແ້ລວ<NuxtLink to="/auth/login">ເຂົ້າສູ່ລະບົບ</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const config = useRuntimeConfig();
const route = useRoute()
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
  }),
});

const [mobile, mobileProps] = defineField("mobile");
const source = ref<any>("")
const verifyMobile = async (form: any) => {
  try {
    const { data, error }: any = await useFetch(
      `${config.public.apiBase}/verify-mobile-email-vipo`,
      {
        method: "POST",
        body: {
          mobile: form.mobile,
        },
      }
    );

    if (error.value) {
      apiError.value =
        error.value.data?.message ||
        error.value.message ||
        "Something went wrong";
      setTimeout(() => {
        apiError.value = "";
      }, 2000);
      return;
    }

    const token = data.value.token;
    navigateTo(
      `/auth/verify-otp?type=register&mobile=${form.mobile}&source=${source.value}&token=${token}`
    )
  } catch (e) {
    console.log(e);
  }
};

const onSubmit = handleSubmit((values) => {
  verifyMobile(values);
});

watch(() => route.query.source, (value) => {
  source.value = value ?? "vipo"
}, { immediate: true })
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
