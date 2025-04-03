<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit" class="forgot-password-page">
        <div class="forgot-password-form">
          <h1>ລືມລະຫັດຜ່ານ</h1>
          <p>ໃສ່ເບີໂທຂອງທ່ານເພື່ອຮັບລະຫັດຢືນຢັນທາງຂໍ້ຄວາມ</p>
          <hr />
          <div class="field">
            <label>ເບີໂທລະສັບ</label>
            <div class="control">
              <input type="text"
                     v-model="mobile"
                     v-bind="mobileProps"
                     placeholder="020" />
            </div>
            <p class="error-text">{{apiError}}</p>
          </div>
          <button
              type="submit"
            class="button light-blue"
          >
            ຂໍລະຫັດຢືນຢັນ
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useForm} from "vee-validate";
import * as yup from "yup";

const config = useRuntimeConfig();

const apiError = ref('');

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
    mobile: yup.string().required("This field is required"),
  }),
});

const [mobile, mobileProps] = defineField("mobile");


const verifyMobile = async (form: any) => {

  try {
    const { data, error }: any = await useFetch(`${config.public.apiBase}/seeker-request-verification-code-vipo`, {
      method: 'POST',
      body: {
        mobile: form.mobile,
      },
    });

    if(error.value) {
      apiError.value =  error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    const token = data.value.token

    navigateTo('/auth/verify-otp?type=forgotPassword&mobile=' + form.mobile + '&token=' + token)


  } catch (e) {
    console.log(e)
  }
}


const onSubmit = handleSubmit((values) => {
  verifyMobile(values)
})

onMounted(() => {
  mobile.value = '58593344'
})


</script>

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
  .regsiter-link {
    margin-top: 1rem;
    font-size: var(--sm-font);
    a {
      margin-left: 0.25rem;
      color: var(--orange-900);
    }
  }
}
</style>
