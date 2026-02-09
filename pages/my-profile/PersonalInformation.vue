<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '1' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 1 } })">
      <div class="start">
        <span>1</span>
        <h3>{{ $t('cvPersonalInformation') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.personalInformationStatus">Completed
        </div>
        <div class="tag" v-else>Blank</div>
      </div>
    </div>
    <!-- <div class="card-body" v-if="route.query.step === '1'"> -->
    <div class="card-body">
      <form class="form-fields">
        <div class="field">
          <label class="text-center m-b-10">{{ $t('cvYourPhoto') }}</label>
          <div class="control">
            <label for="image" class="porfile-image">
              <i class="fa-solid fa-camera"></i>
              <img v-if="profileImg" :src="fileTmp + '/' + profileImg" />
              <img v-else-if="formStore.file?.src" :src="formStore.file.src" />
              <label v-else>
                <i class="fa-solid fa-camera"></i>
              </label>
              <input type="file" id="image" ref="profileImgRef" @change="onProfileImgChange"
                v-bind="formStore.fileProps" />
            </label>
            <p class="guide-text text-center m-t-5">
              {{ $t('cvThePhotoMustNotExceed') }} 10MB
            </p>
          </div>
          <p class="error-text">{{ formStore.errors.file }}</p>
        </div>
        <div class="field">
          <label for="">{{ $t('cvGender') }} <span>*</span></label>
          <div class="control">
            <div class="toggle">
              <p :class="{ selected: formStore?.genderId === i._id }" v-for="i in genderList"
                @click="formStore.genderId = i._id" v-bind="formStore.genderIdProps">
                <span></span>{{ i.name }}
              </p>
            </div>
            <p class="error-text">{{ formStore.errors.genderId }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvName') }} <span>*</span></label>
          <div class="control">
            <input type="text" :placeholder="$t('cvName')" v-model="formStore.firstName"
              v-bind="formStore.firstNameProps" />
            <p class="error-text">{{ formStore.errors.firstName }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvLastName') }} <span>*</span></label>
          <div class="control">
            <input type="text" :placeholder="$t('cvLastName')" v-model="formStore.lastName"
              v-bind="formStore.lastNameProps" />
            <p class="error-text">{{ formStore.errors.lastName }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvMaritalStatus') }} <span>*</span></label>
          <div class="control">
            <div class="toggle">
              <p :class="{ selected: formStore?.maritalStatusId === i._id }" v-for="i in maritalStatusList"
                @click="formStore.maritalStatusId = i._id" v-bind="formStore.maritalStatusIdProps">
                <span></span>{{ i.name }}
              </p>
            </div>
            <p class="error-text">{{ formStore.errors.maritalStatusId }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvDateOfBirth') }} <span>*</span></label>
          <div class="control">
            <DateInput v-model="formStore.dateOfBirth" v-bind="formStore.dateOfBirthProps" />
            <p class="error-text">{{ formStore.errors.dateOfBirth }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvCurrentProvince') }}<span>*</span></label>
          <div class="control">
            <div class="select m-b-10">
              <select v-model="formStore.provinceId" name="" id="">
                <option value="" selected disabled>
                  {{ $t('cvSelectProvince') }}
                </option>
                <option :value="i._id" v-for="i in provincesList">
                  {{ i.name }}
                </option>
              </select>
            </div>
            <p class="error-text">{{ formStore.errors.provinceId }}</p>
            <div class="select has-addon-left">
              <i class="fa-regular fa-arrow-turn-down-right"></i>
              <select v-model="formStore.districtId" name="" id="" :disabled="!formStore.provinceId">
                <option value="" selected disabled>
                  {{ $t('cvSelectDistrict') }}
                </option>
                <option v-for="i in districtsList" :value="i._id">
                  {{ i.name }}
                </option>
              </select>
            </div>

            <p class="error-text">{{ formStore.errors.districtId }}</p>
          </div>
        </div>

        <div class="field">
          <label for="">{{ $t('cvprofessionalSummary') }} </label>
          <div class="control">
            <textarea type="text" :placeholder="$t('cvprofessionalSummary')"
              v-model="formStore.professionalSummary"></textarea>
          </div>
        </div>
      </form>
      <div class="button-group">
        <a @click="router.push({ ...route, query: { ...route.query, step: 2 } })">{{ $t('Skip for now') }}</a>
        <button class="button orange" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersonalInformationStore } from '@/store/personalInfomation'
import useFetchCustom from '~/utils/global-useFetch'
const formStore = usePersonalInformationStore()
const { submitStep1Form } = formStore
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
import { fileTmp } from '@/utils/global-variables'
import { useI18n } from 'vue-i18n'
import DateInput from '@/components/DateInput.vue'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { locale }: any = useI18n()
// set isLang
const isLang = ref<any>('LA')

//field
const profileImg = ref<any>(null)
const profileImgRef = ref()
const provincesList = ref<any>([])

const districtsList = ref<any>([])

const genderList = ref<any>([])
const maritalStatusList = ref<any>([])
const educationLevelList = ref<any>([])

const languagesList = ref([])
const languageLevelsList = ref([])
const industryList = ref<any>([])

//End field

watch(() => userStore?.seekerInfo, async (value: any) => {

  if (value) {
    const i = userStore?.seekerInfo?.profile

    formStore.setFieldValue('file', i.file)
    if (i.file?.src) formStore.file.name = i.file.link.split('/').pop()
    formStore.setFieldValue('firstName', i.firstName)
    formStore.setFieldValue('lastName', i.lastName)
    formStore.setFieldValue('genderId', i.genderId?._id)
    formStore.setFieldValue('maritalStatusId', i.maritalStatusId?._id)
    formStore.setFieldValue('dateOfBirth', i.dateOfBirth)
    formStore.setFieldValue('provinceId', i.districtId?.provinceId?._id)
    formStore.setFieldValue('districtId', i.districtId?._id)
    formStore.setFieldValue('professionalSummary', i.professionalSummary)
  }
},
  { immediate: true }
)



const onProfileImgChange = async ($event: any) => {
  const file = $event.target.files[0] || null

  const formData = new FormData()
  formStore.setFieldValue('file', file)
  formData.append('file', file)

  const { data, error } = await useFetchCustom('/upload-image')
    .post(formData)
    .json()

  if (data.value) {
    profileImg.value = data.value.file.name
    formStore.file.value = data.value.file
    profileImgRef.value.value = ''
    formStore.checkUploadProfile = true
  }
}

const getProvinces = async () => {
  try {
    const query = { lang: isLang.value }
    const queryString = '?' + new URLSearchParams(query).toString()

    const { data, error } = await useFetchCustom(
      '/get-province-web' + queryString
    )
      .get()
      .json()

    provincesList.value = data.value?.provinces

    //I set this code because I need district change follow the language
    if (provincesList.value?.length) {
      const provinceIdx = provincesList.value.findIndex(
        (i: any) => i?._id === formStore?.provinceId
      )
      districtsList.value = provincesList.value[provinceIdx]?.districts
    }
  } catch (e) {
    console.log(e)
  }
}

const getReuse = async (type: string) => {
  try {
    const query = { lang: isLang.value, types: type }
    const queryString = '?' + new URLSearchParams(query).toString()

    const { data, error } = await useFetchCustom('/reuse-for-web' + queryString)
      .get()
      .json()

    const list = data.value?.getReuse
    switch (type) {
      case 'Gender':
        genderList.value = list
        break
      case 'MaritalStatus':
        maritalStatusList.value = list
        break
      case 'Degree':
        educationLevelList.value = list
        break
      case 'Language':
        languagesList.value = list
        break
      case 'LanguageLevel':
        languageLevelsList.value = list
        break
      case 'Industry':
        industryList.value = list
        break
    }
  } catch (e) {
    console.log(e)
  }
}

await getProvinces()
getReuse('Gender')
getReuse('MaritalStatus')
getReuse('Degree')
getReuse('Language')
getReuse('LanguageLevel')
getReuse('SkillLevel')
getReuse('Industry')

watch(() => locale.value, async (value: any) => {
  isLang.value = value ? value.toUpperCase() : 'LA'
  await getProvinces()
  getReuse('Gender')
  getReuse('MaritalStatus')
  getReuse('Degree')
  getReuse('Language')
  getReuse('LanguageLevel')
  getReuse('SkillLevel')
  getReuse('Industry')
},
  { immediate: true, deep: true }
)

watch(() => formStore.provinceId, (value: any) => {
  if (value) {
    const provinceIdx = provincesList.value.findIndex(
      (i: any) => i._id === value
    )
    districtsList.value = provincesList.value[provinceIdx].districts
    // formStore.districtId = districtsList.value[0]._id
  }
},
  { immediate: true }
)

const submitForm = async () => {
  await submitStep1Form()

  const step = Math.min(Number(route.query.step) + 1 || 2, 7)
  router.push({ query: { ...route.query, step: String(step) } })

}
</script>

<style scoped lang="scss">
.error-text {
  color: red;
}

.text-center {
  text-align: center;
}

.guide-text {
  font-size: var(--xsm-font);
  color: var(--black-500);
}

.porfile-image {
  margin-left: auto;
  margin-right: auto;
  width: 90px;
  height: 90px;
  border-radius: 999px;
  background-color: var(--black-100);
  box-shadow: 0 0 0 2px var(--black-300);
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: var(--md-font);
    color: var(--black-500);
    z-index: 1;
    position: absolute;
  }

  img {
    z-index: 2;
    width: 90px;
    height: 90px;
    border-radius: 999px;
    object-fit: cover;
  }

  cursor: pointer;

  input {
    display: none;
  }
}
</style>
