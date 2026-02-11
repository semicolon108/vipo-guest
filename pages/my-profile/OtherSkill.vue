<template>
  <div class="card m-b-15" :class="{ selected: route.query.step === '6' }">
    <div class="card-header" @click="router.push({ ...route, query: { ...route.query, step: 6 } })">
      <div class="start">
        <span>6</span>
        <h3>{{ $t('cvOtherSkills') }}</h3>
      </div>
      <div class="end">
        <div class="tag completed" v-if="userStore?.userData?.validProfileStatus?.skillStatus">
          Completed
        </div>
        <div class="tag" v-else>Blank</div>
      </div>
    </div>
    <div class="card-body">
      <div class="skill-group">
        <div class="blank-card" v-if="!skillStore.skills.length">
          <p>{{ $t(`You haven't added any skill yet.`) }}</p>
          <button class="button black m-t-10" @click="addSkill()">
            {{ $t('cvAddSkill') }}
          </button>
        </div>
        <div class="skill-card" v-for="(i, index) in skillStore.skills" :key="index">
          <div class="field">
            <div class="control">
              <div class="select-skill">
                <SkillInput v-model="i.keySkill" />
                <p v-if="skillStore.errorsList[index]?.keySkill" class="error-text">
                  <!-- {{ skillStore.errorsList[index].keySkill }} -->
                  This field is required
                </p>
              </div>
              <div class="select-level">
                <div class="select">
                  <select v-model="i.skillLevelId">
                    <option disabled selected>{{ $t('cvLevel') }}</option>
                    <option v-for="level in skillLevelList" :value="level._id">
                      {{ level.name }}
                    </option>
                  </select>
                </div>
                <p v-if="skillStore.errorsList[index]?.skillLevelId" class="error-text">
                  <!-- {{ skillStore.errorsList[index].skillLevelId }} -->
                  This field is required
                </p>
              </div>
              <span class="delete" @click="removeLanguage(index)"><i class="fa-solid fa-trash"></i></span>
            </div>
          </div>
        </div>
        <div class="more-button" v-if="skillStore.skills.length">
          <button class="button black m-t-10" @click="addSkill()">
            {{ $t('cvAddSkill') }}
          </button>
        </div>
      </div>
      <div class="button-group">
        <p></p>
        <!-- <a @click="router.push({ ...route, query: { ...route.query, step: 7 } })">{{ $t('Skip for now') }}</a> -->
        <p v-if="errorMsg" class="error-text">{{ $t('validOtherSkill') }}</p>
        <button class="button orange" @click="submitForm()">{{ $t('Save and Next') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillInput from '@/components/SkillInput.vue'

import { useI18n } from 'vue-i18n'
import useFetchCustom from '~/utils/global-useFetch'
import { useSkillStore } from '@/store/otherSkill'
const skillStore = useSkillStore()
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { t, locale }: any = useI18n()
const isLang = ref<any>('LA')
const errorMsg = ref<any>(false)
const skillLevelList = ref<any[]>([])

const getReuse = async (type: string) => {
  try {
    const query = { lang: isLang.value, types: type }
    const queryString = '?' + new URLSearchParams(query).toString()

    const { data, error } = await useFetchCustom('/reuse-for-web' + queryString).get().json()

    skillLevelList.value = data.value?.getReuse
  } catch (e) {
    console.log(e)
  }
}

watch(() => userStore?.seekerInfo, async (value: any) => {
  await getReuse('SkillLevel')
  if (userStore?.seekerInfo) {
    const mapSkill = userStore?.seekerInfo?.skills?.map((i: any) => ({
      keySkill: i.name,
      skillLevelId: i.skillLevelId?._id
    }))
    skillStore.skills = mapSkill || []
  }
}, { immediate: true })

watch(() => locale.value, async (value: any) => {
  isLang.value = value ? value.toUpperCase() : 'LA'
  await getReuse('SkillLevel')
}, { immediate: true, deep: true })

const removeLanguage = (index: number) => {
  skillStore.skills.splice(index, 1)
}

const addSkill = () => {
  const field = {
    keySkill: '',
    skillLevelId: ''
  }
  skillStore.skills.push(field)
}

const submitForm = async () => {
  const hasEmptyField = skillStore.skills.some((skill: any) => {
    return !skill.keySkill || !skill.skillLevelId
  })

  if (!skillStore.skills.length || hasEmptyField) {
    errorMsg.value = true
    setTimeout(() => { errorMsg.value = false }, 4000)
    return
  }
  await skillStore.submitStep6Form()
  router.push({ ...route, query: { ...route.query, step: 7 } })
}
</script>

<style lang="scss" scoped>
.error-text {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

.has-addon-left {
  position: relative;

  i {
    position: relative;
    z-index: 0;
    margin-right: .5em;
  }
}

.skill-card {
  border-radius: 6px;

  &:not(:last-child) {
    margin-bottom: .5em;
  }

  .field {

    input,
    select {
      height: 3.3em !important;
    }

    .control {
      display: flex;
      align-items: flex-start;

      width: 100%;
      gap: .5em;

      .select-skill {
        flex-grow: 1;
        flex-basis: 0;
      }

      .select-level {
        flex-grow: 1;
        flex-basis: 0;
      }

      .delete {
        height: 2.8em;
        display: flex;
        align-items: center;
        position: relative;
        top: 0;
      }
    }
  }
}

.select-skill {
  position: relative;

  .skill-list {
    top: 3.6em;
    position: absolute;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 0 0 2px var(--black-300);
    border-radius: 6px;

    ul {
      list-style-type: none;

      li {
        height: 2.8em;
        display: flex;
        align-items: center;

        &:not(:last-child) {
          border-bottom: 1px solid var(--black-300);
        }
      }
    }
  }
}
</style>
