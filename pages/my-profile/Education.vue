<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '3' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 3 } })">
      <div class="start">
        <span>3</span>
        <h3>{{ $t('cvEducation') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.educationStatus">Completed
        </div>
        <div class="tag " v-else>Blank</div>
      </div>
    </div>
    <div class="card-body">
      <div class="form-fields" v-if="!showForm">
        <div class="blank-card" v-if="!education?.length">
          <p>{{ $t(`You haven't added any education yet.`) }}</p>
          <button class="button black m-t-10" @click="showForm = true">
            {{ $t('addEducation') }}
          </button>
        </div>
        <div class="list" v-for="i in education">
          <div class="start">
            <h3 class="subject">{{ i.subject }}</h3>
            <p>{{ i.school }}</p>
            <p v-if="i.currentlyStudying">
              {{ formatMonthAndYear(i.startYear) }} -
              {{ $t('cvCurrentlyStudying') }}
            </p>
            <p v-else>
              {{ formatMonthAndYear(i.startYear) }} -
              {{ formatMonthAndYear(i.endYear) }}
            </p>
          </div>
          <div class="end">
            <span class="blue" @click="setEducationField(i)"><i class="fa-solid fa-pen"></i></span>
            <span class="delete" @click.stop="deleteFunction(i)"><i class="fa-solid fa-trash"></i></span>
          </div>
        </div>
        <div class="more-button" v-if="!showForm && education.length">
          <button class="button black m-t-10" @click="showForm = true">
            {{ $t('addEducation') }}
          </button>
        </div>
      </div>
      <form class="form-fields" v-if="showForm">
        <div class="sub-form">
          <div class="field">
            <label for="">{{ $t('cvMajor') }}</label>
            <div class="control">
              <input type="text" :placeholder="$t('cvMajor')" v-model="educationStore.subject"
                v-bind="educationStore.subjectProps" />
              <p class="error-text">{{ educationStore.errors.subject }}</p>
            </div>
          </div>
          <div class="field">
            <label for="">{{ $t('cvEducationalInstitution') }}</label>
            <div class="control">
              <input type="text" :placeholder="$t('cvEducationalInstitution')" v-model="educationStore.school"
                v-bind="educationStore.schoolProps" />
              <p class="error-text">{{ educationStore.errors.school }}</p>
            </div>
          </div>
          <div class="field">
            <label>{{ $t('cvEducationLevel') }} <span>*</span></label>
            <div class="control">
              <div class="select">
                <select v-model="educationStore.qualifications">
                  <option value="" selected disabled>
                    {{ $t('cvEducationLevel') }}
                  </option>
                  <option v-for="o in educationLevelList" :value="o._id">
                    {{ o.name }}
                  </option>
                </select>
              </div>
              <p class="error-text">
                {{ educationStore.errors.qualifications }}
              </p>
            </div>
          </div>
          <div class="field">
            <label for="">{{ $t('cvStartStudyingFrom') }}</label>
            <div class="control">
              <DateInput v-model="educationStore.startYear" :is-only-month-and-year="true" />
            </div>
          </div>
          <div class="field">
            <label for="">{{ $t('cvEndDate') }}</label>
            <div class="control" v-if="!educationStore.currentlyStudying">
              <DateInput v-model="educationStore.endYear" :is-only-month-and-year="true" />
            </div>
            <div class="checkbox m-t-10">
              <span :class="{ checked: educationStore.currentlyStudying }" @click="
                () => {
                  educationStore.currentlyStudying =
                    !educationStore.currentlyStudying
                  educationStore.endYear = ''
                }
              "></span>
              <p>{{ $t('cvStartStudyingFrom') }}</p>
            </div>
          </div>
          <div class="sub-form-footer m-t-20">
            <button type="button" class="button black-100 round" @click="resetForm()">
              {{ $t('cvCancel') }}
            </button>
            <button type="button" class="button primary round" @click="addWorkEducation()">
              {{ $t('cvAdd') }}
            </button>
          </div>
        </div>
      </form>
      <div class="button-group" v-if="!showForm">
        <a @click="router.push({ ...route, query: { ...route.query, step: 4 } })">{{ $t('Skip for now') }}</a>
        <p v-if="errorMsg" class="error-text">{{ $t('validEducation') }}</p>
        <button class="button orange" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchCustom from '~/utils/global-useFetch'
import { useEducationStore } from '@/store/education'
const educationStore = useEducationStore()
const { onSubmit, handleReset, setFieldValue } = educationStore
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
import { formatMonthAndYear } from '@/utils/formatter'
import { useAlertModal } from '@/composables/useAlertModal'
const { openDefaultConfirmModal, openDefaultModal } = useAlertModal()
import { useI18n } from 'vue-i18n'
const { t, locale }: any = useI18n()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//Fields
const isLang = ref<any>('LA')
const education = ref<any>([])
const showForm = ref(false)
const educationLevelList = ref<any>([])
const errorMsg = ref<any>(false)
//End Fields

watch(() => userStore?.seekerInfo, async (value: any) => {

  education.value = userStore?.seekerInfo?.education ?? []

}, { immediate: true })


const submitForm = async () => {
  if (!education.value?.length) {
    errorMsg.value = true
    setTimeout(() => { errorMsg.value = false }, 4000)
    return
  } else {
    router.push({ ...route, query: { ...route.query, step: 4 } })
  }
}

const addWorkEducation = async () => {
  await onSubmit()
  await userStore.fetchSeekerInfo()
  showForm.value = false
  resetForm()
}

const resetForm = () => {
  handleReset({
    values: {
      _id: '',
      subject: '',
      school: '',
      startYear: '',
      endYear: '',
      qualifications: '',
      currentlyStudying: false
    }
  })
  showForm.value = false
}

const deleteFunction = async (item: any) => {
  openDefaultConfirmModal({
    title: t('deleteEducationTitle'),
    description: t('confirmationDeleteEducation'),
    onConfirm: async () => {
      await educationStore.deleteEducationItem(item._id)
      await userStore.fetchSeekerInfo()
      openDefaultModal({ status: 'success', title: 'Deleted!' })
    }
  })
}

const setEducationField = (item: any) => {
  setFieldValue('_id', item._id || '')
  setFieldValue('subject', item.subject || '')
  setFieldValue('school', item.school || '')
  setFieldValue('startYear', item.startYear || '')
  setFieldValue('endYear', item.endYear || '')
  setFieldValue('qualifications', item.qualifications?._id || '')
  setFieldValue('currentlyStudying', item.currentlyStudying ?? false)

  showForm.value = true
}

const getReuse = async (type: string) => {
  try {
    const query = { lang: isLang.value, types: type }
    const queryString = '?' + new URLSearchParams(query).toString()

    const { data, error } = await useFetchCustom('/reuse-for-web' + queryString)
      .get()
      .json()

    educationLevelList.value = data.value?.getReuse
  } catch (e) {
    console.log(e)
  }
}

getReuse('Degree')

watch(() => locale.value, async (value: any) => {
  isLang.value = value ? value.toUpperCase() : 'LA'
  getReuse('Degree')
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.error-text {
  color: red;
}

// form {
//   border: 1px solid var(--black-300);
//   padding: 2rem 0;
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: #fff;
//   overflow-y: auto;
//   max-width: 100%;
//   display: flex;
//   flex-direction: column;
//   overflow-x: hidden;
//   .form-header {
//     padding-left: 1.5em;
//     padding-right: 1.5em;

//     h3 {
//       font-size: var(--lg-font);
//       font-weight: 700;
//     }
//   }

//   .form-body {
//     padding: 1.5em;
//     height: 100%;
//     // overflow-y: auto;
//   }

//   .form-footer {
//     display: flex;
//     justify-content: flex-end;
//     gap: 0.5rem;
//     padding-left: 1.5em;
//     padding-right: 1.5em;
//   }
// }

.more-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
