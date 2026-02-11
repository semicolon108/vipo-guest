<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '5' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 5 } })">
      <div class="start">
        <span>5</span>
        <h3>{{ $t('cvLanguageSkills') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.languageStatus">
          Completed
        </div>
        <div class="tag" v-else>Blank</div>
      </div>
    </div>
    <div class="card-body">
      <p>{{ $t('List the languages you speak') }}</p>
      <div class="form-fields">
        <div class="field-group">
          <div class="fields">
            <div class="field">
              <div class="select full-width">
                <select name="" id="" v-model="LanguageId" v-bind="LanguageIdProps">
                  <option disabled value="">{{ $t('select Language') }}</option>
                  <option v-for="lan in languageList" :value="lan._id">{{ lan?.name }}</option>
                </select>
              </div>
              <p class="error-text">{{ errors.LanguageId }}</p>
            </div>
            <div class="field">
              <div class="select full-width">
                <select name="" id="" v-model="LanguageLevelId" v-bind="LanguageLevelIdProps">
                  <option disabled value="">{{ $t('select Level') }}</option>
                  <option v-for="level in languageLevelList" :value="level._id">{{ level?.name }}</option>
                </select>
              </div>
              <p class="error-text">{{ errors.LanguageLevelId }}</p>
            </div>
          </div>
          <button class="button orange" @click="addLanguage()"> {{ $t('cvAddLanguage') }}</button>
        </div>
        <div class="list-group">
          <h3>{{ $t('Existing Language') }}</h3>
          <ul>
            <li v-for="(i, index) in languageStore.languageSkill" :key="index">
              <div class="start mouseClick" @click="updateLanguage(i, index)">{{ getLanguageName(i.LanguageId) }}</div>
              <div class="end">
                <div class="tag">{{ getLanguageLevelName(i.LanguageLevelId) }}</div>
                <div class="icon" @click="removeLanguage(index)"><i class="fa-regular fa-trash"></i></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-group"><p></p>
        <!-- <a @click="router.push({ ...route, query: { ...route.query, step: 6 } })">{{ $t('Skip for now') }}</a> -->
        <p v-if="errorMsg" class="error-text">{{ $t('validLanguage') }}</p>
        <button class="button orange" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchCustom from '~/utils/global-useFetch'
import { useLanguageStore } from '@/store/language'
const languageStore = useLanguageStore()
import * as yup from "yup"
import { useForm } from "vee-validate";
import { useUserStore } from '@/store/user'
const userStore = useUserStore()

import { useI18n } from 'vue-i18n'
const { t, locale }: any = useI18n()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//Fields
const isLang = ref<any>('LA')
const errorMsg = ref<any>(false)
const languageList = ref<any>([])
const languageLevelList = ref<any>([])
//End Fields

const updateLanguage = (item: any, index: any) => {
  setFieldValue('LanguageId', item.LanguageId)
  setFieldValue('LanguageLevelId', item.LanguageLevelId)
  setFieldValue('index', index)
}

const getReuse = async (type: string) => {
  try {
    const query = { lang: isLang.value, types: type }
    const queryString = '?' + new URLSearchParams(query).toString()
    const { data, error } = await useFetchCustom('/reuse-for-web' + queryString).get().json()

    const list = data.value?.getReuse
    switch (type) {
      case 'Language':
        languageList.value = list
        break
      case 'LanguageLevel':
        languageLevelList.value = list
        break
    }
  } catch (e) {
    console.log(e)
  }
}

watch(() => userStore?.seekerInfo, async (value: any) => {
  await getReuse('Language')
  await getReuse('LanguageLevel')
  if (userStore?.seekerInfo) {
    const mapLanguage = userStore?.seekerInfo?.languageSkill?.map((i: any) => ({
      LanguageId: i.LanguageId?._id,
      LanguageLevelId: i.LanguageLevelId?._id
    }))
    languageStore.languageSkill = mapLanguage || []
  }
}, { immediate: true })


watch(() => locale.value, async (value: any) => {
  isLang.value = value ? value.toUpperCase() : 'LA'
  await getReuse('Language')
  await getReuse('LanguageLevel')
}, { immediate: true, deep: true })

// ✅ Remove language
const removeLanguage = (index: number) => {
  languageStore.languageSkill.splice(index, 1)
}

const getLanguageName = (id: number) =>
  languageList.value.find((l: any) => l._id === id)?.name ?? "-";

const getLanguageLevelName = (id: number) =>
  languageLevelList.value.find((l: any) => l._id === id)?.name ?? "-";



const resetLanguageSelected = () => {
  resetForm({
    values: {
      LanguageId: "",
      LanguageLevelId: "",
      index: null
    }
  })
}

// Validate functiln 
const schema = yup.object({
  LanguageId: yup.string().required("Language field is required"),
  LanguageLevelId: yup.string().required("Language Level field is required"),
  index: yup.number().nullable()
})

const { handleSubmit, setFieldValue, errors, resetForm, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    LanguageId: "",
    LanguageLevelId: "",
    index: null
  }
})

const [LanguageId, LanguageIdProps] = defineField('LanguageId')
const [LanguageLevelId, LanguageLevelIdProps] = defineField('LanguageLevelId')


const addLanguage = async () => {
  await handleSubmit(async (values: any) => {
    if (values.index !== null) {
      languageStore.languageSkill[values.index] = {
        LanguageId: values.LanguageId,
        LanguageLevelId: values.LanguageLevelId
      }

      resetLanguageSelected();

      return;
    }

    // 2️⃣ If index is null → check by LanguageId
    const existIndex = languageStore.languageSkill.findIndex((i: any) => i.LanguageId === values.LanguageId);

    if (existIndex !== -1) {
      // If found → replace
      languageStore.languageSkill[existIndex] = {
        LanguageId: values.LanguageId,
        LanguageLevelId: values.LanguageLevelId
      };
    } else {
      // If not found → push new item
      languageStore.languageSkill.push({
        LanguageId: values.LanguageId,
        LanguageLevelId: values.LanguageLevelId
      });
    }
    resetLanguageSelected();
  })()

}


const submitForm = async () => {
  if (!languageStore.languageSkill.length) {
    errorMsg.value = true
    setTimeout(() => { errorMsg.value = false }, 4000)
    return
  }
  await languageStore.submitStep5Form()
  router.push({ ...route, query: { ...route.query, step: 6 } })
}
</script>

<style lang="scss" scoped>
.error-text {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mouseClick {
  cursor: pointer;
}
</style>
