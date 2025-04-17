<template>
  <section>
    <div class="container">
      <div class="register-form">
        <div class="form-header">
          <h1>ຝາກປະຫວັດ</h1>
          <h3>ຝາກປະຫວັດເພື່ອໃຫ້ສະດວກ ແລະ ວ່ອງໄວໃນການສະໝັກວຽກ</h3>
        </div>
        <form @submit.prevent="onSubmitBeforeValidate" class="form-body">
          <!-- Personal Information -->
          <div class="card">
            <div class="card-header">
              <h1>ຂໍ້ມູນສ່ວນໂຕ</h1>
            </div>
            <div class="field">
              <label for="">ຮູບຂອງເຈົ້າ</label>
              <div class="control image-upload">
                <div @click="profileImgRef.click()">
                  <img
                    v-if="profileImgObject"
                    :src="config.public.fileTmp + '/' + profileImg"
                  />
                  <img v-else-if="profileImg" :src="profileImg" />
                  <label v-else>
                    <i class="fa-solid fa-camera"></i>
                  </label>
                </div>

                <small class="image-size">ຮູບຕ້ອງມີຂະໜາດບໍ່ເກີນ 10MB</small>
                <input
                  v-show="false"
                  ref="profileImgRef"
                  type="file"
                  id="image"
                  @change="onProfileImgChange"
                />
              </div>
              <p v-if="errors.profileImg" class="error-text">
                {{ errors.profileImg }}
              </p>
            </div>

            <div class="field">
              <label>ເພດ</label>
              <div class="control options">
                <p
                  v-for="i in genderList"
                  @click="gender = i._id"
                  :class="{ checked: gender === i._id }"
                >
                  {{ i.name }}
                </p>
              </div>
              <p v-if="errors.gender" class="error-text">{{ errors.gender }}</p>
            </div>

            <div class="field">
              <label>ຊື່</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ຂອງເຈົ້າ"
                v-model="firstName"
              />
              <p v-if="errors.firstName" class="error-text">
                {{ errors.firstName }}
              </p>
            </div>

            <div class="field">
              <label>ນາມສະກຸນ</label>
              <input
                type="text"
                class="input"
                placeholder="ນາມສະກຸນ"
                v-model="lastName"
              />
              <p v-if="errors.firstName" class="error-text">
                {{ errors.firstName }}
              </p>
            </div>
            <div class="field">
              <label>ວັນເດືອນປີເກີດ</label>

              <DateInput v-model="dateOfBirth" />

              <p v-if="errors.dateOfBirth" class="error-text">
                {{ errors.dateOfBirth }}
              </p>
            </div>
            <div class="field">
              <label>ສະຖານະແຕ່ງງານ</label>
              <div class="control options">
                <p
                  v-for="i in maritalStatusList"
                  @click="maritalStatus = i._id"
                  :class="{ checked: maritalStatus === i._id }"
                >
                  {{ i.name }}
                </p>
              </div>
              <p v-if="errors.maritalStatus" class="error-text">
                {{ errors.maritalStatus }}
              </p>
            </div>
            <div class="field">
              <label>ແຂວງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select v-model="province" name="" id="">
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option :value="i._id" v-for="i in provincesList">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.province" class="error-text">
                  {{ errors.province }}
                </p>
              </div>
            </div>
            <div class="field">
              <label>ເມືອງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select
                    v-model="district"
                    name=""
                    id=""
                    :disabled="!province"
                  >
                    <option value="" selected disabled>ເລືອກເມືອງ</option>
                    <option v-for="i in districtsList" :value="i._id">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.district" class="error-text">
                  {{ errors.district }}
                </p>
              </div>
            </div>
          </div>

          <div class="card" v-for="(i, idx) in educations as any" :key="i.key">
            <div class="card-header">
              <h1>ການສຶກສາ</h1>
            </div>
            <div class="field">
              <label>ວິຊາທີ່ຮຽນ</label>
              <Field
                :name="`educations[${idx}].major`"
                as="input"
                type="text"
                placeholder="ການເງິນ ການບັນຊີ"
              />
              <ErrorMessage
                class="error-text"
                :name="`educations[${idx}].major`"
              />
            </div>

            <div class="field">
              <label>ສະຖາບັນການສຶກສາ</label>
              <Field
                :name="`educations[${idx}].university`"
                as="input"
                type="text"
                placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
              />
              <ErrorMessage
                class="error-text"
                :name="`educations[${idx}].university`"
              />
            </div>
            <div class="field">
              <label>ລະດັບການສຶກສາ</label>
              <div class="control">
                <div class="select">
                  <select v-model="i.value.degree">
                    <option v-for="o in educationLevelList" :value="o._id">
                      {{ o.name }}
                    </option>
                  </select>
                </div>

                <div v-show="false">
                  <Field
                    :name="`educations[${idx}].degree`"
                    as="input"
                    type="text"
                    placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
                  />
                </div>
                <ErrorMessage
                  class="error-text"
                  :name="`educations[${idx}].degree`"
                />
              </div>
            </div>

            <div class="field" v-if="!isLoading">
              <label>ເລີ່ມສຶກສາຕັ້ງແຕ່</label>
              <div class="selects">
                <DateInput
                  v-model="i.value.startDate"
                  style="width: 100%"
                  :is-only-month-and-year="true"
                />
              </div>

              <div v-show="false">
                <Field
                  :name="`educations[${idx}].startDate`"
                  as="input"
                  type="text"
                />
              </div>
              <ErrorMessage
                class="error-text"
                :name="`educations[${idx}].startDate`"
              />
            </div>
            <div
              class="field"
              :class="{ disabledzzz: i.value.isCurrentlyStudying }"
            >
              <label class="has-checkbox">
                ຈົນເຖິງ
                <!-- if true add class checked -->
                <p
                  class="checkbox"
                  @click="
                    i.value.isCurrentlyStudying = !i.value.isCurrentlyStudying
                  "
                  :class="{ checked: i.value.isCurrentlyStudying }"
                >
                  ກຳລັງເປັນນັກສຶກຢູ່
                </p>
              </label>
              <div class="selects" v-show="!i.value.isCurrentlyStudying">
                <DateInput
                  v-model="i.value.endDate"
                  style="width: 100%"
                  :is-only-month-and-year="true"
                />
              </div>
              <div v-show="false">
                <Field
                  :name="`educations[${idx}].endDate`"
                  as="input"
                  type="text"
                />
              </div>
              <ErrorMessage
                class="error-text"
                :name="`educations[${idx}].endDate`"
              />
            </div>
          </div>
          <!-- CV file start -->
          <div class="card">
            <div class="card-header">
              <h1>ໄຟສຊີວະປະຫວັດ (ຊີວີ້)</h1>
            </div>
            <div class="tabs">
              <ul>
                <li
                  v-for="(i, index) in cvFileUse"
                  :class="{ checked: tabName === i }"
                  @click="tabName = i"
                >
                  {{ i }}
                </li>
              </ul>
            </div>
            <div class="field" v-if="tabName === 'ຂ້ອຍມີຊີວີ້'">
              <div class="control">
                <label @click="cvFileRef.click()" class="file-upload">
                  <i class="fa-regular fa-arrow-up-from-bracket"></i>
                  <p>ກະລຸນາເລືອກໄຟສ</p>
                  <small
                    >ຮັບສະເພາະໄຟສ PDF, Word, JPG ແລະ ຂະໜາດໄຟສບໍ່ເກີນ 5MB.</small
                  >
                </label>
                <input
                  v-show="false"
                  ref="cvFileRef"
                  type="file"
                  @change="onCVFileChange"
                />
              </div>
              <div class="uploaded-file" v-if="cvFile">
                <span class="file-name">
                  <i class="fa-regular fa-file-pdf"></i>
                  {{ cvFile }}
                </span>
              </div>
              <p class="error-text">{{ errors.cvFile }}</p>
            </div>
            <div
              v-if="tabName === 'ໃຫ້ VIPO ສ້າງຊີວີ້ໃຫ້'"
              class="vipo-cv-generator"
            >
              <div class="cv-box">
                <div class="guide">
                  <p>ຕື່ມຂໍ້ມູນທັງໝົດໃຫ້ຄົບຖ້ວນ.</p>
                  <p>ກົດປຸ່ມບັນທຶກຂໍ້ມູນເພື່ອສ້າງຊີວີ້.</p>
                  <p>ລະບົບຂອງ vipo.cc ຈະທຳການສ້າງຊີວີ້ອັດຕະໂນມັດ.</p>
                  <p>ການສ້າງຊີວີ້ອາດໃຊ້ເລລາ 1 - 5 ນາທີ.</p>
                </div>
                <hr />
                <div class="file">
                  <div class="sample-file">
                    <span></span>
                  </div>
                  <a
                    ><i class="fa-solid fa-arrow-down-to-line"></i>ດາວໂຫລດໄຟສ</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- CV file end -->

          <div class="card" :class="{ disabled: isHaveNoExp }">
            <div class="card-header">
              <h1>ປະຫວັດການເຮັດວຽກ</h1>
              <p
                class="checkbox"
                @click="isHaveNoExp = !isHaveNoExp"
                :class="{ checked: isHaveNoExp }"
              >
                ຂ້ອຍຍັງບໍ່ເຄີຍເຮັດວຽກ
              </p>
            </div>
            <div v-for="(i, idx) in workHistories as any" :key="i.key">
              <div class="field">
                <label>ນາຍຈ້າງ / ບໍລິສັດ / ອົງກອນ</label>
                <Field
                  :name="`workHistories[${idx}].company`"
                  as="input"
                  type="text"
                  placeholder="ຊື່ບໍລິສັດ"
                />
                <ErrorMessage
                  class="error-text"
                  :name="`workHistories[${idx}].company`"
                />
              </div>
              <div class="field">
                <label>ຕຳແໜ່ງງານ</label>
                <Field
                  :name="`workHistories[${idx}].position`"
                  as="input"
                  type="text"
                  placeholder="ຕຳແໜ່ງງານ"
                />
                <ErrorMessage
                  class="error-text"
                  :name="`workHistories[${idx}].position`"
                />
              </div>
              <div class="field">
                <label>ເລີ່ມເຮັດວຽກ</label>
                <div class="selects">
                  <DateInput
                    v-model="i.value.startDate"
                    style="width: 100%"
                    :is-only-month-and-year="true"
                  />
                </div>
                <div v-show="false">
                  <Field
                    :name="`workHistories[${idx}].startDate`"
                    as="input"
                    type="text"
                  />
                </div>
                <ErrorMessage
                  class="error-text"
                  :name="`workHistories[${idx}].startDate`"
                />
              </div>

              <div
                class="field"
                :class="{ disabledzzz: i.value.isCurrentlyWorking }"
              >
                <label class="has-checkbox">
                  ຈົນເຖິງ
                  <!-- if true add class checked -->
                  <p
                    class="checkbox"
                    @click="
                      i.value.isCurrentlyWorking = !i.value.isCurrentlyWorking
                    "
                    :class="{ checked: i.value.isCurrentlyWorking }"
                  >
                    ນີ້ແມ່ນວຽກປັດຈຸບັນ
                  </p>
                </label>
                <div class="selects" v-show="!i.value.isCurrentlyWorking">
                  <DateInput
                    v-model="i.value.endDate"
                    style="width: 100%"
                    :is-only-month-and-year="true"
                  />
                </div>
                <div v-show="false">
                  <Field
                    :name="`workHistories[${idx}].endDate`"
                    as="input"
                    type="text"
                  />
                </div>
                <ErrorMessage
                  class="error-text"
                  :name="`workHistories[${idx}].endDate`"
                />
              </div>
              <div class="field">
                <label for="">ໜ້າທີ່ຮັບຜິດຊອບ</label>
                <div class="control">
                  <textarea
                    v-model="i.value.detail"
                    name=""
                    id=""
                    rows="5"
                  ></textarea>

                  <div v-show="false">
                    <Field
                      :name="`workHistories[${idx}].detail`"
                      as="input"
                      type="text"
                      placeholder="ໜ້າທີ່ຮັບຜິດຊອບ"
                    />
                  </div>
                  <ErrorMessage
                    class="error-text"
                    :name="`workHistories[${idx}].detail`"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະດ້ານ ພາສາ</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div
                class="selects-container"
                v-for="(i, idx) in languages as any"
                :key="i.key"
              >
                <div class="selects">
                  <div class="select">
                    <select name="" id="" v-model="i.value.language">
                      <option value="" disabled selected>ເລືອກພາສາ</option>
                      <option :value="i._id" v-for="i in languagesList as any">
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div class="select">
                    <select name="" id="" v-model="i.value.level">
                      <option value="" disabled selected>ລະດັບ</option>
                      <option
                        :value="i._id"
                        v-for="i in languageLevelsList as any"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>

                  <a class="delete-button" @click="languagesRemove(idx)">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
                <div v-if="hasSubmitted">
                  <ErrorMessage
                    class="error-text"
                    :name="`languages[${idx}].language`"
                  />
                  <ErrorMessage
                    class="error-text"
                    :name="`languages[${idx}].level`"
                  />
                </div>
              </div>

              <button
                type="button"
                class="button add-button small light-orange"
                @click="languagesPush({ language: '', level: '' })"
              >
                ເພີ່ມ
              </button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະອື່ນໆ (ຖ້າມີ)</h1>
            </div>
            <div class="field">
              <label>ທັກສະ</label>
              <div
                class="selects-container"
                v-for="(i, idx) in otherSkills as any"
                :key="i.key"
              >
                <div class="selects">
                  <SkillInput v-model="i.value.skill" />
                  <!--                  <input type="text" class="input"  placeholder="ທັກສະ" />-->
                  <div class="select">
                    <select name="" id="" v-model="i.value.level">
                      <option value="" disabled selected>ລະດັບ</option>
                      <option :value="i._id" v-for="i in skillLevels as any">
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <a @click="otherSkillsRemove(idx)">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
                <div v-if="hasSubmitted">
                  <ErrorMessage
                    class="error-text"
                    :name="`otherSkills[${idx}].skill`"
                  />
                  <ErrorMessage
                    class="error-text"
                    :name="`otherSkills[${idx}].level`"
                  />
                </div>
              </div>
              <button
                type="button"
                @click="otherSkillsPush({ skill: '', level: '' })"
                class="button add-button small light-orange"
              >
                ເພີ່ມ
              </button>
            </div>
          </div>
          <button type="submit" class="button submit-button orange">
            ບັນທຶກຂໍ້ມູນ
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, useFieldArray, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DateInput from "@/components/DateInput.vue";
import dayjs from "dayjs";

import SkillInput from "@/components/SkillInput.vue";

const tabName = ref("ຂ້ອຍມີຊີວີ້");
const cvFileUse = ref<any>(["ຂ້ອຍມີຊີວີ້", "ໃຫ້ VIPO ສ້າງຊີວີ້ໃຫ້"]);

const { showToast } = useToast();

const { isAuth, user } = useAuth();
const { $apiFetch } = useNuxtApp();

const config = useRuntimeConfig();

const profileImgRef = ref();
const isHaveNoExp = ref(false);
const cvFileRef = ref();
const profileImgObject = ref<any>(null);
const cvFileObject = ref<any>(null);

const backupWorkingHistories = ref<any>({});


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
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    dateOfBirth: yup.string().required("This field is required"),
    maritalStatus: yup.string().required("This field is required"),
    province: yup.string().required("This field is required"),
    district: yup.string().required("This field is required"),

    cvFile: yup.string(),

    educations: yup
      .array()
      .of(
        yup.object().shape({
          major: yup.string().required("This field is required"),
          university: yup.string().required("This field is required"),
          degree: yup.string().required("This field is required"),
          startDate: yup.date().required("This field is required"),
          // endDate: yup.date().required('This field is required'),
          isCurrentlyStudying: yup.boolean().required("This field is required"),
        })
      )
      .min(1, "At least one education entry is required"),
    //
    workHistories: yup
      .array()
      .of(
        yup.object().shape({
          company: yup.string().required("This field is required"),
          position: yup.string().required("This field is required"),
          startDate: yup.date().required("This field is required"),
          // endDate: yup.date().required('This field is required'),
          detail: yup.string().required("This field is required"),
          isCurrentlyWorking: yup.boolean().required("This field is required"),
        })
      )
      .notRequired(),
    languages: yup.array().of(
      yup.object().shape({
        language: yup.string().required("This field is required"),
        level: yup.string().required("This field is required"),
      })
    ),
    otherSkills: yup.array().of(
      yup.object().shape({
        skill: yup.string().required("This field is required"),
        level: yup.string().required("This field is required"),
      })
    ),
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

const [cvFile, cvFileProps] = defineField("cvFile");

const {
  fields: educations,
  push: educationsPush,
  remove: educationsRemove,
} = useFieldArray("educations");
const {
  fields: workHistories,
  push: workHistoriesPush,
  remove: workHistoriesRemove,
} = useFieldArray("workHistories");
const {
  fields: languages,
  push: languagesPush,
  remove: languagesRemove,
} = useFieldArray("languages");
const {
  fields: otherSkills,
  push: otherSkillsPush,
  remove: otherSkillsRemove,
} = useFieldArray("otherSkills");

const noExp = ref(false);
const isStudent = ref(false);
const isCurrentWork = ref(false);

const provincesList = ref<any>([]);

const districtsList = ref<any>([]);

const genderList = ref<any>([]);
const maritalStatusList = ref<any>([]);
const educationLevelList = ref<any>([]);

const degreesList = ref([]);

const languagesList = ref([]);

const languageLevelsList = ref([]);

const skills = ref([]);
const skillLevels = ref([]);

const hasSubmitted = ref(false);

const onSubmitBeforeValidate = async () => {
  hasSubmitted.value = true;

  setTimeout(() => {
    hasSubmitted.value = false;
  }, 5000);

  await onSubmit();
  // optional: you can check isValid here if you want to show a toast or log
};


const onSubmit = handleSubmit(async (values) => {
  const object = values;

  const form: any = {
    noExperience: isHaveNoExp.value,
    profile: {
      firstName: object.firstName,
      lastName: object.lastName,
      dateOfBirth: object.dateOfBirth,
      genderId: object.gender,
      maritalStatusId: object.maritalStatus,
      //  currentResidenceId: object.province,
      districtId: object.district,
    },
    educations: object.educations.map((i: any) => ({
      //_id: i._id,
      subject: i.major,
      school: i.university,
      qualifications: i.degree,
      startYear: i.startDate,
      endYear: i.endDate,
      currentlyStudying: i.isCurrentlyStudying,
    })),
    workHistories: object.workHistories.map((i: any) => ({
      // _id: i._id,
      company: i.company,
      position: i.position,
      startYear: i.startDate,
      endYear: i.endDate,
      isCurrentJob: i.isCurrentlyWorking,
      responsibility: i.detail,
    })),
    language:
      object.languages && object.languages.length
        ? object.languages.map((i: any) => ({
            // _id: i._id,
            LanguageId: i.language,
            LanguageLevelId: i.level,
          }))
        : [],
    skill:
      object.otherSkills && object.otherSkills.length
        ? object.otherSkills.map((i: any) => ({
            //_id: i._id,
            keySkill: i.skill,
            skillLevelId: i.level,
          }))
        : [],
  };

  if (profileImgObject.value) {
    form.profile.file = profileImgObject.value;
  }

  if (cvFileObject.value) {
    form.cv = cvFileObject.value;
  }

  // console.log(form)

  const { data }: any = await useAsyncData("updateSeekerInfo", () =>
    $apiFetch("/update-seeker-info-vipo", {
      method: "POST",
      body: form,
    })
  );

  if (data.value) {
    showToast("ປະຫວັດຂອງທ່ານອັບເດດສຳເລັດແລ້ວ", "ສຳເລັດ");
    window.location.reload();
  }

});

const onProfileImgChange = async ($event: any) => {
  const file = $event.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const { data }: any = await useAsyncData("uploadImg", () =>
    $apiFetch("/upload-image", {
      method: "POST",
      body: formData,
    })
  );

  if (data.value) {
    profileImg.value = data.value.file.name;
    profileImgObject.value = data.value.file;
    profileImgRef.value.value = "";
  }
};

const onCVFileChange = async ($event: any) => {
  const file = $event.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const { data }: any = await useAsyncData("uploadResume", () =>
    $apiFetch("/upload-resume", {
      method: "POST",
      body: formData,
    })
  );

  if (data.value) {
    cvFile.value = data.value.myFile.name;
    cvFileObject.value = data.value.myFile;
    cvFileRef.value.value = "";
  }
};

const getProvinces = async () => {
  try {
    const { data }: any = await useAsyncData("provinces", () =>
      $apiFetch("/get-province-vipo", {
        query: { lang: "LA" },
      })
    );
    provincesList.value = data.value.provinces;
  } catch (e) {
    console.log(e);
  }
};

const getReuse = async (type: string) => {
  try {
    const { data }: any = await useAsyncData("reuse" + type, () =>
      $apiFetch("/get-reuse-vipo", {
        query: { lang: "LA", type },
      })
    );

    const list = data.value.info;
    switch (type) {
      case "Gender":
        genderList.value = list;
        break;
      case "MaritalStatus":
        maritalStatusList.value = list;
        break;
      case "Degree":
        educationLevelList.value = list;
        break;
      case "Language":
        languagesList.value = list;
        break;
      case "LanguageLevel":
        languageLevelsList.value = list;
        break;
      case "SkillLevel":
        skillLevels.value = list;
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => province.value,
  () => {
    if (province.value) {
      const provinceIdx = provincesList.value.findIndex(
        (i: any) => i._id === province.value
      );
      districtsList.value = provincesList.value[provinceIdx].districts;
      district.value = districtsList.value[0]._id;
    }
  },
  { immediate: true }
);

watch(
  () => isHaveNoExp.value,
  () => {
    if (isHaveNoExp.value) {
      if (workHistories.value.length) {
        backupWorkingHistories.value = workHistories.value[0].value;
      }

      setTimeout(() => {
        workHistoriesRemove(0);
      }, 100);
    } else {
      if (backupWorkingHistories.value) {
        workHistoriesPush(backupWorkingHistories.value);
      } else {
        workHistoriesPush({
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          isCurrentlyWorking: false,
        });
      }
    }
  }
);

const getKeySkills = async () => {
  const { data }: any = await useAsyncData("getKeySkills", () =>
    $apiFetch("/get-keyskills-job-seeker-vipo", {
      query: { lang: "LA", page: 1, perPage: 10000, search: "" },
    })
  );

  skills.value = data.value.getKeySkill;
};

const isLoading = ref(true);

//Type not matching in model: Country,State,SkillLevel,KeySkills,CurrentResidence,Nationality,BannerType,BlogType,Degree,CompanySize,Gender,Industry,JobEducationLevel,JobExperience,JobFunction,JobZone,Language,LanguageLevel,MaritalStatus,Province,Tag,SalaryRange,District,JobTag,SkillTag,AdditionalTag,JobLevel

await getProvinces();
getReuse("Gender");
getReuse("MaritalStatus");
getReuse("Degree");
getReuse("Language");
getReuse("LanguageLevel");
getReuse("SkillLevel");
getKeySkills();

onMounted(async () => {
  setTimeout(() => {
    educationsPush({
      major: "",
      university: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
    });

    workHistoriesPush({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
    });

    languagesPush({
      language: "",
      level: "",
    });

    otherSkillsPush({
      skill: "",
      level: "",
    });
  }, 1000);

  if (!isAuth.value) {
    alert("Please login first");
    navigateTo("/auth/login");
  } else {
    setTimeout(() => {
      if (user.value.cv && user.value.cv.src) {
        cvFile.value = user.value.cv.src;
      }

      if (user.value.profile) {
        profileImg.value = user.value.profile.file
          ? user.value.profile.file.src
          : "";
        gender.value = user.value.profile.genderId
          ? user.value.profile.genderId._id
          : "";
        firstName.value = user.value.profile.firstName
          ? user.value.profile.firstName
          : "";
        lastName.value = user.value.profile.lastName
          ? user.value.profile.lastName
          : "";
        dateOfBirth.value = user.value.profile.dateOfBirth
          ? user.value.profile.dateOfBirth
          : "";
        maritalStatus.value = user.value.profile.maritalStatusId
          ? user.value.profile.maritalStatusId._id
          : "";
        province.value = user.value.profile.districtId
          ? user.value.profile.districtId.provinceId._id
          : "";
        setTimeout(() => {
          district.value = user.value.profile.districtId
            ? user.value.profile.districtId._id
            : "";
        });
      }

      if (user.value.education && user.value.education.length) {
        const i = user.value.education[user.value.education.length - 1];
        educationsRemove(0);
        educationsPush({
          _id: i._id,
          major: i.subject,
          university: i.school,
          degree: i.qualifications ? i.qualifications._id : "",
          startDate: i.startYear,
          endDate: i.endYear,
          isCurrentlyStudying: i.currentlyStudying,
        });
      }

      if (user.value.noExperience) {
        isHaveNoExp.value = true;
        workHistoriesRemove(0);
      } else if (user.value.workHistory && user.value.workHistory.length) {
        const i = user.value.workHistory[user.value.workHistory.length - 1];
        workHistoriesRemove(0);
        workHistoriesPush({
          _id: i._id,
          company: i.company,
          position: i.position,
          startDate: i.startYear,
          endDate: i.endYear,
          isCurrentlyWorking: i.isCurrentJob,
          detail: i.responsibility,
        });
      }

      if (user.value.languageSkill && user.value.languageSkill.length) {
        // const i = user.value.languageSkill[user.value.languageSkill.length-1]
        // languagesRemove(0)
        // languagesPush({
        //   _id: i._id,
        //   language: i.LanguageId._id,
        //   level: i.LanguageLevelId._id
        // })

        languagesRemove(0);
        const list = user.value.languageSkill.map((i: any) => ({
          _id: i._id,
          language: i.LanguageId._id,
          level: i.LanguageLevelId._id,
        }));

        for (let i = 0; i < list.length; i++) {
          languagesPush(list[i]);
        }
      }

      if (user.value.skills && user.value.skills.length) {
        otherSkillsRemove(0);
        const list = user.value.skills.map((i: any) => ({
          _id: i._id,
          skill: i.keySkillId.name,
          level: i.skillLevelId._id,
        }));

        for (let i = 0; i < list.length; i++) {
          otherSkillsPush(list[i]);
        }
      }
    }, 1500);

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
});
</script>

<style scoped lang="scss">
section {
  background-color: var(--black-200);
}
.register-form {
  max-width: 650px;
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
    .card-header {
      margin-bottom: 0 !important;
    }
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
      //pointer-events: none;
      //user-select: none;
      color: var(--black-400);
    }
  }
}
.tabs {
  margin-bottom: 0.5rem;
  ul {
    display: flex;
    gap: 0.5rem;
    li {
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
        background-color: var(--light-blue-100);
        color: var(--deep-blue-900);
        &::before {
          background-color: var(--deep-blue-900);
          box-shadow: 0 0 6px 1px var(--deep-blue-900);
        }
      }
    }
  }
}
.cv-box {
  border: 1px solid var(--black-300);
  padding: 1rem;
  border-radius: 6px;
  .guide {
    p {
      font-size: var(--xsm-font);
      &::before {
        content: "-";
        margin-right: 0.5rem;
      }
    }
  } //guide
  hr {
    height: 1px;
    background-color: var(--black-300);
    border: none;
    margin: 1rem 0;
  }

  .file {
    display: flex;
    gap: 1rem;
    .sample-file {
      width: 100px;
      height: 120px;
      background-color: var(--black-300);
      cursor: pointer;
      border-radius: 6px;
    }
    a {
      display: block;
      margin-top: 0.5rem;
      cursor: pointer;
      color: var(--deep-blue-900);
      i {
        font-size: var(--md-font);
        margin-right: 0.25rem;
      }
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
.selects-container {
  margin-bottom: 0.75rem;
  .selects {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      color: var(--orange-900);
      cursor: pointer;
    }
    .select {
      flex-grow: 1;
    }
  }
}
label.has-checkbox {
  display: flex !important;
  align-items: flex-end;
  justify-content: space-between;
  p {
    font-weight: 500;
  }
}
.error-text {
  color: var(--red-900);
  font-size: var(--xxsm-font);
  display: inline-block;
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
  img {
    display: block;
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 6px;
  }
  label {
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
  }

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
  .file-name {
    font-weight: 600;
    font-size: var(--sm-font);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
