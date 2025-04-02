<template>
  <section>
    <div class="container">
      <div class="register-form">
        <div class="form-header">
          <h1>ຝາກປະຫວັດ</h1>
          <h3>ຝາກປະຫວັດເພື່ອໃຫ້ສະດວກ ແລະ ວ່ອງໄວໃນການສະໝັກວຽກ</h3>
        </div>
        <div class="form-body">
          <!-- Personal Information -->
          <div class="card">
            <div class="card-header">
              <h1>ຂໍ້ມູນສ່ວນໂຕ</h1>
            </div>
            <div class="field">
              <div class="field">
                <label for="">ຮູບຂອງເຈົ້າ</label>
                <div class="control">
                  <label for="image" class="image-upload">
                    <!-- <img
                  src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  /> -->
                    <i class="fa-solid fa-camera"></i>
                    <input type="file" id="image" />
                  </label>
                  <small class="image-size">ຮູບຕ້ອງມີຂະໜາດບໍ່ເກີນ 10MB</small>
                </div>
              </div>
              <label>ເພດ</label>
              <div class="control options">
                <p class="checked">ຊາຍ</p>
                <p>ຍິງ</p>
              </div>
            </div>
            <div class="field">
              <label>ຊື່</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ຂອງເຈົ້າ"
                required
              />
            </div>
            <div class="field">
              <label>ນາມສະກຸນ</label>
              <input
                type="text"
                class="input"
                placeholder="ນາມສະກຸນ"
                required
              />
            </div>
            <div class="field">
              <label>ວັນເດືອນປີເກີດ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ວັນທີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">2023</option>
                    <option value="">2024</option>
                    <option value="">2025</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ສະຖານະແຕ່ງງານ</label>
              <div class="control options">
                <p class="checked">ໂສດ</p>
                <p>ແຕ່ງານ</p>
              </div>
            </div>
            <div class="field">
              <label>ແຂວງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select
                      v-model="formState.province"
                      name="" id="" required>
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option :value="i._id" v-for="i in provincesList">{{i.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ເມືອງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" :disabled="!formState.province">
                    <option value="" selected disabled>ເລືອກເມືອງ</option>
                    <option v-for="i in districtsList.filter((i: any) => i.provinceId === formState.province)">{{i.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ການສຶກສາ</h1>
            </div>
            <div class="field">
              <label>ວິຊາທີ່ຮຽນ</label>
              <input
                type="text"
                class="input"
                placeholder="ການເງິນ ການບັນຊີ"
                required
              />
            </div>
            <div class="field">
              <label>ສະຖາບັນການສຶກສາ</label>
              <input
                type="text"
                class="input"
                placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
                required
              />
            </div>
            <div class="field">
              <label>ລະດັບການສຶກສາ</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" selected disabled>ລະດັບການສຶກສາ</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ເລີ່ມສຶກສາຕັ້ງແຕ່</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field" :class="{ disabled: isStudent }">
              <label class="has-checkbox">
                ຈົນເຖິງ
                <!-- if true add class checked -->
                <p
                  class="checkbox"
                  @click="isStudent = !isStudent"
                  :class="{ checked: isStudent }"
                >
                  ກຳລັງເປັນນັກສຶກຢູ່
                </p>
              </label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ໄຟສຊີວະປະຫວັດ (ຊີວີ້)</h1>
            </div>
            <div class="field">
              <div class="control">
                <label for="cv-file" class="file-upload">
                  <i class="fa-regular fa-arrow-up-from-bracket"></i>
                  <p>ກະລຸນາເລືອກໄຟສ</p>
                  <small
                    >Supported file format PDF, Word, JPG that has less than 5MB
                    size.</small
                  >
                  <input type="file" id="cv-file" />
                </label>
              </div>
              <div class="uploaded-file">
                <p><i class="fa-regular fa-file-pdf"></i>Filename</p>
                <i class="fa-regular fa-trash"></i>
              </div>
            </div>
          </div>
          <div class="card" :class="{ disabled: noExp }">
            <div class="card-header">
              <h1>ປະຫວັດການເຮັດວຽກ</h1>
              <p
                class="checkbox"
                @click="noExp = !noExp"
                :class="{ checked: noExp }"
              >
                ຂ້ອຍຍັງບໍ່ເຄີຍເຮັດວຽກ
              </p>
            </div>
            <div class="field">
              <label>ນາຍຈ້າງ / ບໍລິສັດ / ອົງກອນ</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ບໍລິສັດ"
                required
              />
            </div>
            <div class="field">
              <label>ຕຳແໜ່ງງານ</label>
              <input
                type="text"
                class="input"
                placeholder="ຕຳແໜ່ງງານ"
                required
              />
            </div>
            <div class="field">
              <label>ເລີ່ມເຮັດວຽກ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field" :class="{ disabled: isCurrentWork }">
              <label class="has-checkbox">
                ຈົນເຖິງ
                <!-- if true add class checked -->
                <p
                  class="checkbox"
                  @click="isCurrentWork = !isCurrentWork"
                  :class="{ checked: isCurrentWork }"
                >
                  ນີ້ແມ່ນວຽກປະຈຸບັນຂອງຂ້ອຍ
                </p>
              </label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="">ໜ້າທີ່ຮັບຜິດຊອບ</label>
              <div class="control">
                <textarea name="" id="" rows="5" required></textarea>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະດ້ານ ພາສາ</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເລືອກພາສາ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ລະດັບ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
              <button class="button add-button small light-orange">
                ເພີ່ມ
              </button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະອື່ນໆ (ຖ້າມີ)</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div class="selects">
                <input type="text" class="input" required placeholder="ທັກສະ" />
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ລະດັບ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
              <button class="button add-button small light-orange">
                ເພີ່ມ
              </button>
            </div>
          </div>
          <button class="button submit-button orange">ບັນທຶກຂໍ້ມູນ</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";



const formState = ref({
  profileImg: '',
  gender: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  maritalStatus: '',
  province: '',
  district: '',

  educations: [{
    major: '',
    university: '',
    degree: '',
    startDate: '',
    endDate: '',
  }],
  isCurrentlyStudy: false,

  cvFile: '',

  workHistories: [{
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    detail: '',
    isCurrentWork: false
  }],

  languages: [{
    language: '',
    level: ''
  }],

  otherSkills: [{
    skill: '',
    level: ''
  }]
})





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
    profileImg: yup.string().required("This field is required"),
    gender: yup.string().required("This field is required"),
    firstName:  yup.string().required("This field is required"),
    lastName:  yup.string().required("This field is required"),
    dateOfBirth:  yup.string().required("This field is required"),
    maritalStatus:  yup.string().required("This field is required"),
    province:  yup.string().required("This field is required"),
    district:  yup.string().required("This field is required"),

    cvFile: yup.string().required('This field is required'),

    educations: yup.array().of(
        yup.object().shape({
          major: yup.string().required('This field is required'),
          university: yup.string().required('This field is required'),
          degree: yup.string().required('This field is required'),
          startDate: yup.date().required('This field is required'),
          endDate: yup.date().required('This field is required'),
          isCurrentlyStudying: yup.boolean().required('This field is required'),
        })
    ),
        //.min(1, 'At least one education entry is required'),
    workHistories: yup.array().of(
        yup.object().shape({
          company: yup.string().required('This field is required'),
          position: yup.string().required('This field is required'),
          startDate: yup.date().required('This field is required'),
          endDate: yup.date().required('This field is required'),
          detail: yup.string().required('This field is required'),
          isCurrentlyWorking: yup.boolean().required('This field is required'),
        })
    ).min(1, 'At least one work history entry is required'),
    languages: yup.array().of(
        yup.object().shape({
          language: yup.string().required('This field is required'),
          level: yup.string().required('This field is required'),
        })
    ).min(1, 'At least one language entry is required'),
    otherSkills: yup.array().of(
        yup.object().shape({
          skill: yup.string().required('This field is required'),
          level: yup.string().required('This field is required'),
        })
    )
  }),
});

const [profileImg, profileImgProps] = defineField("profileImg");
const [gender, genderProps] = defineField("gender");
const [firstName, firstNameProps] = defineField("firstName");
const [lastName, lastNameProps] = defineField("lastName");
const [dateOfBirth, dateOfBirthProps] = defineField("dateOfBirth");
const [maritalStatus, maritalStatusProps] = defineField("maritalStatus");
const [province, provinceProps] = defineField("province");
const [district, districtProps] = defineField("district");

const [educations, educationsProps] = defineField("educations");
const [workHistories, workHistoriesProps] = defineField("workHistories");
const [languages, languagesProps] = defineField("languages");
const [otherSkills, otherSkillsProps] = defineField("otherSkills");













const noExp = ref(false);
const isStudent = ref(false);
const isCurrentWork = ref(false);


const provincesList = ref([
  {
    _id: '1',
    name: 'Vientiane'
  },
  {
    _id: '2',
    name: 'LPB'
  }
])

const districtsList = ref([
  {
    _id: '11',
    name: 'Sisattanark',
    provinceId: '1'
  },
  {
    _id: '22',
    name: 'LLLPPP',
    provinceId: '2'
  }
])


const degreesList = ref([
  {
    _id: '1',
    name: 'First Degree',
  }
])

const languagesList  = ref([
  {
    _id: '1',
    name: 'English',
  }
])

const levelsList = ref([
  {
    _id: '1',
    name: 'Beginner',
  }
])



const getProvincesList = async () => {
  const { data, error } = await useFetch('/get-province-vipo', {
    baseURL: useRuntimeConfig().public.apiBase,  // Automatically uses the global base URL
  });

  console.log(data)
}

onMounted(() => {
  getProvincesList()
})

</script>

<style scoped lang="scss">
section {
  background-color: var(--black-200);
}
.register-form {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  .form-header {
    text-align: center;
    h1 {
      font-size: var(--xlg-font);
      font-weight: 700;
    }
    h3 {
      font-weight: 500;
      font-size: var(--lg-font);
    }
  } // form-header
  .form-body {
    margin-top: 1rem;
    .card {
      border: 1px solid var(--black-300);
      padding: 1.5rem;
      border-radius: 16px;
      background-color: #fff;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .card-header {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        h1 {
          font-weight: 700;
          font-size: var(--lg-font);
          // color: var(--orange-900);
        }
      }
      .field {
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.35rem;
          font-weight: 600;
          font-size: var(--sm-font);
        }
        input,
        select {
          background-color: var(--black-200);
        }
      }
    }
  }
}
.disabled {
  &.card {
    background-color: var(--black-300) !important;
  }
  input,
  select,
  textarea {
    pointer-events: none;
    user-select: none;
    background-color: var(--black-400) !important;
  }
  .checkbox {
    &:first-child {
      pointer-events: none;
      user-select: none;
      color: var(--black-400);
    }
  }
}
.checkbox {
  font-size: var(--sm-font);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all ease-in-out 0.15s;
  &:hover {
    color: var(--orange-900);
  }
  &::before {
    content: "\f0c8";
    font-family: "Font Awesome 6 Pro" !important;
    margin-top: 0.25rem;
    font-size: var(--xsm-font);
  }
  &.checked {
    color: var(--orange-900) !important;
    &::before {
      content: "\f14a";
      font-weight: 700;
    }
  }
}
.options {
  display: flex;
  gap: 0.5rem;
  p {
    background-color: var(--black-200);
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: var(--black-500);
    }
    &.checked {
      background-color: var(--orange-100);
      color: var(--orange-900);
      &::before {
        background-color: var(--orange-900);
        box-shadow: 0 0 6px 1px var(--orange-900);
      }
    }
  }
}
.selects {
  display: flex;
  gap: 1rem;
}
label.has-checkbox {
  display: flex !important;
  align-items: flex-end;
  justify-content: space-between;
  p {
    font-weight: 500;
  }
}

textarea {
  background-color: var(--black-200);
  padding: 1rem;
}
.add-button {
  margin-top: 0.5rem;
  border-radius: 6px;
  height: 2.3rem;
}
.submit-button {
  width: 100%;
}
.image-upload {
  background-color: var(--black-200);
  min-width: 100px;
  min-height: 100px;
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 !important;

  input {
    display: none;
  }
  i {
    color: var(--black-500);
    font-size: var(--xlg-font);
  }
}

.file-upload {
  background-color: var(--black-200);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 !important;
  padding: 1.25rem 1rem;
  p {
    font-size: var(--md-font);
    color: var(--deep-blue-900);
    margin-bottom: 0.15rem;
  }
  small {
    font-size: var(--xxsm-font);
    color: var(--black-800);
  }
  input {
    display: none;
  }
  i {
    color: var(--deep-blue-900);
    font-size: var(--xlg-font);
    margin-bottom: 0.25rem;
  }
}
.image-size {
  font-size: var(--xsm-font);
  color: var(--black-800);
}
.uploaded-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--light-blue-100);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  color: var(--deep-blue-900);
  p {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: var(--md-font);
    i {
      margin-top: 0.15rem;
      margin-right: 0.25rem;
    }
  }
  i {
    font-size: var(--sm-font);
    cursor: pointer;
  }
}
</style>
