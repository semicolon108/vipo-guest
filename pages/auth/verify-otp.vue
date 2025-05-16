<template>
  <section>
    <div class="container">
      <form @submit.prevent="onSubmit" class="forgot-password-page">
        <div class="forgot-password-form">
          <h1>ຢືນຢັນລະຫັດ OTP</h1>
          <p>ທ່ານຈະໄດ້ຮັບລະຫັດ OTP ທາງຂໍ້ຄວາມ.</p>
          <hr />


          <div>
           <p style="font-size: 11px"> ຖ້າທ່ານຍັງບໍ່ໄດ້ຮັບລະຫັດ ກະລຸນາກວດສອບໝາຍເລກໂທລະສັບຂອງທ່ານຄືນ ຫຼື ສົ່ງລະຫັດອີກຄັ້ງ</p>
            <b style="font-size: 22px">{{route.query.mobile}}</b>
            <a
                v-if="!(isSending || cooldown > 0)"
                @click="handleResend"
                style="  background-color: #ff6d00;
  border-radius: 5px;
  color: white;
  padding: .2em;
  text-decoration: none;
margin-left: 10px;
cursor: pointer;
">ສົ່ງອີກຄັ້ງ</a>






            <p style="font-size: 11px">
              <span v-if="isSending">Sending...</span>
              <span v-else-if="cooldown > 0">
                ກະລຸນາລໍຖ້າ <b style="color: #ff6d00">{{ cooldown }}s</b> ເພື່ອສົ່ງອີກຄັ້ງ
              </span>
            </p>

            <br>
          </div>
          <div class="field">
            <label>ລະຫັດຢືນຢັນ OTP</label>
            <div class="control">
              <input
                  type="text"
                     v-model="verifyCode"
                  v-bind="verifyCodeProps"
                     placeholder="000000" />
              <p class="error-text">{{errors.verifyCode}}</p>
              <p class="error-text">{{apiError}}</p>
            </div>

          </div>

          <button
              type="submit"
            class="button light-blue"
          >
            ຢືນຢັນລະຫັດ
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useForm} from "vee-validate";
import * as yup from "yup";

const route = useRoute()
const apiError = ref('')
const config = useRuntimeConfig();

const isSending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const cooldown = ref(0)
let cooldownTimer: NodeJS.Timeout | null = null

const handleResend = async () => {
  if (isSending.value || cooldown.value > 0) return

  isSending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {

    const form = {
      verifyToken:  route.query.token
    }

    const { data, error }: any = await useFetch(`${config.public.apiBase}/resend-verify-mobile-email-vipo`, {
      method: 'POST',
      body: form,
    });

    if(error.value) {
      apiError.value =  error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    successMessage.value = 'OTP sent successfully!'
    startCooldown(30) // 30-second cooldown
  } catch (err: any) {
    errorMessage.value = err.message || 'Failed to resend OTP'
  } finally {
    isSending.value = false
  }
}

function startCooldown(seconds: number) {
  cooldown.value = seconds
  if (cooldownTimer) clearInterval(cooldownTimer)

  cooldownTimer = setInterval(() => {
    if (cooldown.value > 0) {
      cooldown.value--
    } else if (cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

const {
  values,
  errors,
  defineField,
  handleSubmit,
} = useForm({
  validationSchema: yup.object({
    verifyCode: yup.string().required("This field is required"),
  }),
});

const [verifyCode, verifyCodeProps] = defineField("verifyCode");


const verifyOtp = async () => {
  if(route.query.type === 'register' && route.query.mobile && route.query.token) {
    const form = {
      mobile: route.query.mobile,
      verifyCode: verifyCode.value,
      verifyToken:  route.query.token
    }

    const { data, error }: any = await useFetch(`${config.public.apiBase}/seeker-verification-code-vipo`, {
      method: 'POST',
      body: form,
    });

    if(error.value) {
      apiError.value =  error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    const token = data.value.token
    navigateTo('/auth/set-password?type=register&mobile=' + form.mobile + '&token=' + token)

  }
  else if(route.query.type === 'forgotPassword' && route.query.mobile && route.query.token) {

    const form = {
      mobile: route.query.mobile,
      verifyCode: verifyCode.value,
      verifyToken:  route.query.token
    }

    const { data, error }: any = await useFetch(`${config.public.apiBase}/seeker-verification-forgetpassword-vipo`, {
      method: 'POST',
      body: form,
    });

    if(error.value) {
      apiError.value =  error.value.data?.message || error.value.message || 'Something went wrong'
      setTimeout(() => {
        apiError.value = ''
      }, 2000)
      return
    }

    const token = data.value.token
    navigateTo('/auth/set-password?type=forgotPassword&mobile=' + form.mobile + '&token=' + token)
  }
}


const onSubmit = handleSubmit((values) => {
  verifyOtp()
})

startCooldown(30)

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
}
</style>
