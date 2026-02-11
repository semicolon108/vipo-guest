<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '4' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 4 } })">
      <div class="start">
        <span>4</span>
        <h3>{{ $t('cvWorkExperience') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.workHistoryStatus || noExperience">
          Completed
        </div>
        <div class="tag" v-else>Blank</div>
      </div>
    </div>
    <div class="card-body">
      <div class="form-fields" v-if="!showForm">
        <div class="blank-card" v-if="!workExperience?.length">
          <p>
            {{ $t(`You haven't added any work experience yet.`) }}
          </p>
          <button class="button black m-t-10" @click="showForm = true">
            {{ $t('Add Experience') }}
          </button>
          <div class="field">
            <div class="checkbox m-t-10">
              <span :class="{ checked: noExperience }"
                @click="() => { noExperience = !noExperience; setIhaveNoExperience() }"></span>
              <p>{{ $t('cvNoWorkExperienceYet') }}</p>
            </div>
          </div>
        </div>

        <div class="list" v-for="i in workExperience">
          <div class="start">
            <h3>{{ i.company }}</h3>
            <p>{{ i.position }}</p>
            <p v-if="i.isCurrentJob">
              {{ formatMonthAndYear(i.startYear) }} - {{ $t('cvCurrentJob') }}
            </p>
            <p v-else>
              {{ formatMonthAndYear(i.startYear) }} -
              {{ formatMonthAndYear(i.endYear) }}
            </p>
          </div>
          <div class="end">
            <span class="blue" @click="setWorkExperienceField(i)"><i class="fa-solid fa-pen"></i></span>
            <span class="delete" @click.stop="deleteFunction(i)">
              <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>

        <div class="more-button" v-if="workExperience.length">
          <button class="button black m-t-10" @click="showForm = true">
            {{ $t('Add Experience') }}
          </button>
        </div>
      </div>
      <!-- ຕອນບໍ່ມີຂໍ້ມູນ -->

      <!-- ຕອນມີຂໍ້ມູນແລ້ວ -->
      <div class="form-fields" v-if="showForm">
        <div class="sub-form">
          <div class="field">
            <label>{{ $t('cvEmployerCompanyOrganization') }} <span>*</span></label>
            <div class="control">
              <input type="text" placeholder="Company" v-model="workExperienceStore.company"
                v-bind="workExperienceStore.companyProps" />
              <p class="error-text">{{ workExperienceStore.errors.company }}</p>
            </div>
          </div>
          <div class="field">
            <label>{{ $t('cvPosition') }} <span>*</span></label>
            <div class="control">
              <input type="text" placeholder="HR Manager" v-model="workExperienceStore.position"
                v-bind="workExperienceStore.positionProps" />
              <p class="error-text">
                {{ workExperienceStore.errors.position }}
              </p>
            </div>
          </div>
          <div class="field">
            <label>{{ $t('cvStartWorking') }}</label>
            <div class="control grids is-24 gap-10">
              <DateInput v-model="workExperienceStore.startYear" v-bind="workExperienceStore.startYearProps"
                style="width: 100%" :is-only-month-and-year="true" />
              <p class="error-text">
                {{ workExperienceStore.errors.startDate }}
              </p>
            </div>
          </div>
          <div class="field">
            <label>{{ $t('cvEndDate') }}</label>
            <div class="control grids is-24 gap-10" v-if="!workExperienceStore.isCurrentJob">
              <DateInput v-model="workExperienceStore.endYear" style="width: 100%" :is-only-month-and-year="true"
                v-bind="workExperienceStore.endYearProps" />
            </div>
            <div class="checkbox m-t-10">
              <span :class="{ checked: workExperienceStore.isCurrentJob }" @click="
                () => {
                  workExperienceStore.isCurrentJob =
                    !workExperienceStore.isCurrentJob
                  workExperienceStore.endYear = ''
                }
              "></span>
              <p>{{ $t('cvCurrentJob') }}</p>
            </div>
          </div>
          <div class="field">
            <label>{{ $t('cvResponsibilities') }} <span>*</span></label>
            <div class="control">
              <ClientOnly>
                <TextEditor v-model="workExperienceStore.responsibility" @keydown.enter.prevent />
              </ClientOnly>
              <p class="error-text">
                {{ workExperienceStore.errors.responsibility }}
              </p>
            </div>
          </div>
          <div class="sub-form-footer m-t-20">
            <button class="button black-100 round" @click="resetForm()">
              {{ $t('cvCancel') }}
            </button>
            <button type="button" class="button primary round" @click="addWorkExperience()">
              {{ $t('cvAdd') }}
            </button>
          </div>
        </div>
      </div>
      <div class="button-group" v-if="!showForm"><p></p>
        <!-- <a @click="router.push({ ...route, query: { ...route.query, step: 5 } })">{{ $t('Skip for now') }}</a> -->
        <p v-if="errorMsg" class="error-text">{{ $t('validWorkHistory') }}</p>
        <button class="button orange" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchCustom from '~/utils/global-useFetch'
import { useWorkExperienceStore } from '@/store/workExperience'
const workExperienceStore = useWorkExperienceStore()
const { onSubmit, handleReset, setFieldValue }: any = workExperienceStore
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
import { formatMonthAndYear } from '@/utils/formatter'
import { useAlertModal } from '@/composables/useAlertModal'
const { openDefaultConfirmModal, openDefaultModal } = useAlertModal()
import { useI18n } from 'vue-i18n'
const { t }: any = useI18n()
import DateInput from '@/components/DateInput.vue'
import TextEditor from '@/components/TextEditor.vue'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

//Field
const workExperience = ref<any>([])
const showForm = ref(false)
const noExperience = ref<any>(false)
const prevBodyOverflow = { value: '' }
const errorMsg = ref<any>(false)
//End field


const setIhaveNoExperience = async () => {
  const { data, error } = await useFetchCustom('update-no-experience-seeker-web').post({ noExperience: noExperience.value }).json()
  if (data.value) {
    await userStore.fetchSeekerInfo()
    await userStore.fetchUserInfo()
  }
}

watch(() => userStore?.seekerInfo, async (value: any) => {

  if (userStore?.seekerInfo) {
    workExperience.value = userStore?.seekerInfo?.workHistory ?? []
    noExperience.value = userStore?.seekerInfo?.noExperience ?? false
  }
}, { immediate: true })



onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = prevBodyOverflow.value
  }
})

const addWorkExperience = async () => {
  await onSubmit()
  await userStore.fetchSeekerInfo()
  await userStore.fetchUserInfo()
  showForm.value = false
  resetForm()
}

const resetForm = () => {
  handleReset({
    values: {
      _id: '',
      company: '',
      position: '',
      startYear: '',
      endYear: '',
      responsibility: '',
      isCurrentJob: false
    }
  })
  showForm.value = false
}



const deleteFunction = async (item: any) => {
  openDefaultConfirmModal({
    title: t('cvDeleteThisItem'),
    description: t('Are you sure you want to delete this experience?'),
    onConfirm: async () => {
      await workExperienceStore.deleteWorkExperienceItem(item._id)
      await userStore.fetchSeekerInfo()
      await userStore.fetchUserInfo()
      openDefaultModal({ status: 'success', title: 'Deleted!' })
    }
  })
}

const setWorkExperienceField = (item: any) => {
  const fields = [
    '_id',
    'company',
    'position',
    'startYear',
    'endYear',
    'responsibility',
    'isCurrentJob'
  ]
  fields.forEach((f) => {
    setFieldValue(f, item[f] ?? (f === 'isCurrentJob' ? false : ''))
  })
  showForm.value = true
}

const submitForm = () => {
  if (!workExperience.value?.length && !noExperience.value) {
    errorMsg.value = true
    setTimeout(() => { errorMsg.value = false }, 4000)
    return
  } else {
    router.push({ ...route, query: { ...route.query, step: 5 } })
  }
}
</script>

<style scoped lang="scss">
.error-text {
  color: red;
}
</style>
