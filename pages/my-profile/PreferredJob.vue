<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '2' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 2 } })">
      <div class="start">
        <span>2</span>
        <h3>{{ $t('cvPreferredJobType') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.workPreferenceStatus">Completed
        </div>
        <div class="tag" v-else>Blank</div>
      </div>
    </div>
    <div class="card-body">
      <form action="" class="form-fields">
        <div class="field">
          <label>{{ $t('cvPresentJobTitleOrInterestedPosition') }}
            <span>*</span></label>
          <div class="control">
            <input type="text" :placeholder="$t('cvPresentJobTitleOrInterestedPosition')"
              v-model="preferreStore.currentJobTitle" v-bind="preferreStore.currentJobTitleProps" />
            <p class="error-text">{{ preferreStore.errors.currentJobTitle }}</p>
          </div>
        </div>
        <div class="field">
          <label>{{ $t('cvExpectedSalary') }} <span>*</span> </label>
          <div class="control has-addon">
            <div class="select-currency">
              <ul>
                <li @click="preferreStore.currency = '₭'" :class="{ selected: preferreStore.currency === '₭' }"
                  value="₭">
                  LAK
                </li>
                <li @click="preferreStore.currency = '$'" :class="{ selected: preferreStore.currency === '$' }"
                  value="$">
                  USD
                </li>
              </ul>
            </div>
            <CurrencyInput v-model="preferreStore.expectedSalary" />
          </div>
          <p class="error-text">{{ preferreStore.errors.expectedSalary }}</p>
        </div>
        <div class="field">
          <label>{{ $t('cvPreferredProvinceForWork') }} <span>*</span></label>
          <div class="control">
            <div class="select">
              <select name="" id="" v-model="preferreStore.provinceId">
                <option value="" selected disabled>
                  {{ $t('cvSelectProvince') }}
                </option>
                <option :value="i._id" v-for="i in provincesList">
                  {{ i.name }}
                </option>
              </select>
            </div>
            <p class="error-text">{{ preferreStore.errors.provinceId }}</p>
          </div>
        </div>
        <div class="field">
          <label>{{ $t('cvPreferredTypeOfBusinessToWorkWith') }}
            <span>*</span></label>
          <div class="select">
            <select v-model="preferreStore.industryId" name="" id="">
              <option value="" selected disabled>ເລືອກທຸລະກິດ</option>
              <option :value="i._id" v-for="i in industryList">
                {{ i.name }}
              </option>
            </select>
          </div>
          <p class="error-text">{{ preferreStore.errors.industryId }}</p>
        </div>
      </form>
      <div class="button-group">
        <a @click="router.push({ ...route, query: { ...route.query, step: 3 } })">{{ $t('Skip for now') }}</a>
        <button class="button primary" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usepreferreJobStore } from '@/store/preferredJob'
const preferreStore = usepreferreJobStore()
const { submitStep2Form } = preferreStore
import useFetchCustom from '~/utils/global-useFetch'
import { useI18n } from 'vue-i18n'
import CurrencyInput from '@/components/CurrencyInput.vue'
import { useUserStore } from '@/store/user'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { locale }: any = useI18n()
// set isLang

//Set field
const isLang = ref<any>('LA')

const industryList = ref<any>([])
const provincesList = ref<any>([])
//End field

const getReuse = async (type: string) => {
  try {
    const query = { lang: isLang.value, types: type }
    const queryString = '?' + new URLSearchParams(query).toString()

    const { data, error } = await useFetchCustom('/reuse-for-web' + queryString)
      .get()
      .json()

    const list = data.value?.getReuse
    switch (type) {
      case 'Province':
        provincesList.value = list
        break
      case 'Industry':
        industryList.value = list
        break
    }
  } catch (e) {
    console.log(e)
  }
}

getReuse('Province')
getReuse('Industry')


watch(() => locale.value, async (value:any) => {
  isLang.value = value ? value.toUpperCase() : 'LA'
  getReuse('Province')
  getReuse('Industry')
}, { immediate: true, deep: true })


watch(() => userStore?.seekerInfo, async (value:any) => {

  if (value) {
    const i = userStore?.seekerInfo?.workPreferences
    preferreStore.currency = i.currency || '₭'
    preferreStore.setFieldValue('currentJobTitle', i.currentJobTitle)
    preferreStore.setFieldValue('expectedSalary', i.salary)
    preferreStore.setFieldValue('industryId', i.industryId[0]?._id)
    preferreStore.setFieldValue('provinceId', i.workLocation[0]?._id)
  }
}, { immediate: true })


const submitForm = async () => {
  await submitStep2Form()

  const step = Math.min(Number(route.query.step) + 1 || 2, 7)
  router.push({ query: { ...route.query, step: String(step) } })

}
</script>

<style scoped lang="scss">
.error-text {
  color: red;
}

.has-addon {
  display: flex;
  gap: 0.5rem;
}

.select-currency {
  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    li {
      height: 3.3rem;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--black-100);
      border-radius: 6px;
      cursor: pointer;

      &.selected {
        background-color: var(--primary-900);
        color: #fff;
      }
    }
  }
}
</style>
