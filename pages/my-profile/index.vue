<template>
  <Loading v-if="personalInfoStore.isLoading || preferreStore.isLoading || languageStore.isLoading || skillStore.isLoading || resumeStore.isLoading
  " />
  <div class="my-profile-page">
    <div class="my-profile-form">
      <div class="page-control">
        <div class="start">
          <!-- <a class="back-to-account-page" @click="$router.push('/my-account')">
            <i class="fa-regular fa-arrow-left"></i>
            {{ $t('Back') }}
          </a> -->
          <p></p>
        </div>
        <div class="end">
          <p class="orange" v-if="statusCheck === 'Pending'">
            <i class="fa-sharp fa-solid fa-circle-check"></i>
            <span>Your profile is under review.</span>
          </p>
          <p class="green" v-if="statusCheck === 'Approved'">
            <i class="fa-sharp fa-solid fa-circle-check"></i>
            <span>Your profile has been approved and is now
              visible to employers</span>
          </p>
        </div>
      </div>
      <PersonalInformation />
      <PreferredJob />
      <Education />
      <WorkExperience />
      <LanguageSkill />
      <OtherSkill />
      <ResumeFile />
      <div class="status">
        <p class="orange" v-if="statusCheck === 'Pending'">
          <i class="fa-sharp fa-solid fa-circle-check"></i>
          <span>Your profile is under review.</span>
        </p>
        <p class="green" v-if="statusCheck === 'Approved'">
          <i class="fa-sharp fa-solid fa-circle-check"></i>
          <span>Your profile has been approved and is now
            visible to employers</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Loading from '@/components/reuse/LogoLoading.vue'
import Education from './Education.vue'
import PersonalInformation from './PersonalInformation.vue'
import WorkExperience from './WorkExperience.vue'
import PreferredJob from './PreferredJob.vue'
import LanguageSkill from './LanguageSkill.vue'
import OtherSkill from './OtherSkill.vue'
import ResumeFile from './ResumeFile.vue'
import { usepreferreJobStore } from '@/store/preferredJob'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
const route = useRoute()
const router = useRouter()
const preferreStore = usepreferreJobStore()
const { submitStep2Form } = preferreStore
const { isAuth } = useAuthStore()
const userStore = useUserStore()

//Personal Information Store

const isCheckStatus = ref<any>(false)

import { usePersonalInformationStore } from '@/store/personalInfomation'
const personalInfoStore = usePersonalInformationStore()

//Language Store
import { useLanguageStore } from '@/store/language'
const languageStore = useLanguageStore()

//Skill Store
import { useSkillStore } from '@/store/otherSkill'
const skillStore = useSkillStore()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//Resume Store
import { useResumeStore } from '@/store/resume'
const resumeStore = useResumeStore()

const currentStep = ref<any>(1)
const currentStatus = ref<any>(false)

onMounted(async () => {
  if (!isAuth) {
    navigateTo('/auth/login?redirect=/my-account')
  }
})

watch(() => route.query?.step, async (value: any) => {
  currentStep.value = value ? Number(value) : 1
  currentStatus.value = true
  await userStore.fetchSeekerInfo()
  await userStore.fetchUserInfo()
  router.push({ query: { ...route.query, step: String(currentStep.value) } })
},
  { immediate: true }
)

const statusCheck = ref<any>("New Register")
watch(() => userStore?.userData?.profileStatus, (value: any) => {
  if (!value) {
    return
  }
  const profileStatus: any = {
    educationStatus: value.educationStatus,
    languageStatus: value.languageStatus,
    personalInformationStatus: value.personalInformationStatus,
    skillStatus: value.skillStatus,
    workHistoryStatus: value.workHistoryStatus,
    workPreferenceStatus: value.workPreferenceStatus,
    resumeStatus: value.resumeStatus
  }

  const isAllStatusComplete = Object.values(profileStatus).every((status) => status === true)
  if (isAllStatusComplete) {
    statusCheck.value = "Approved"
  } else {
    statusCheck.value = "Pending"
  }
}, { immediate: true })


</script>

<style lang="scss">
.my-profile-page {
  background-color: #fff;
  position: relative;
  z-index: 1;

  button {
    height: 3em;
    padding: 0 1.75em;
  }
}

.status {
  gap: 1em;
  font-size: .9em;
  margin-top: 1em;

  p {
    font-size: 1em;
    color: var(--black-700);
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-weight: 600;
    padding: 1em 1.25em;
    border-radius: 6px;

    @media screen and (max-width: 768px) {
      padding: 1em 1.25em;
    }

    &.orange {
      color: var(--orange-900);
      background-color: var(--orange-100);
    }

    &.green {
      color: var(--green-900);
      background-color: var(--green-100);
    }
  }
}

.my-profile-form {
  background-color: #fff;

  @media screen and (max-width: 768px) {
    padding: 1em;
  }

  @media screen and (min-width: 1024px) {
    padding: 1.5rem 0;
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }

  .page-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
      gap: .5em;
    }

    .start {
      .back-to-account-page {
        cursor: pointer;
        transition: all ease-in-out 0.15s;
        display: inline-flex;
        align-items: center;
        gap: 0.25em;
        height: 2.8em;
        background-color: var(--black-100);
        border-radius: 999px;
        padding: 0 1.25em;
        white-space: pre;
        font-size: .9em;

        &:hover {
          color: var(--primary-900);
        }

        i {
          font-size: 1em;
        }
      }
    }

    .end {
      display: flex;
      align-items: center;
      gap: 1em;
      font-size: .9em;

      button {
        height: 2.8em;
      }

      p {
        font-size: 1em;
        color: var(--black-700);
        display: flex;
        align-items: center;
        gap: 0.5em;
        height: 2.8em;
        padding: 0 1.25em;
        border-radius: 6px;

        @media screen and (max-width: 768px) {
          height: auto;
          padding: .75em 1em;
        }

        &.orange {
          color: var(--orange-900);
          background-color: var(--orange-100);

        }

        &.green {
          color: var(--green-900);
          background-color: var(--green-100);

        }
      }
    }

    // end
  }

  .card {
    overflow: hidden;
    border-radius: 12px;
    border: 2px dashed var(--black-300);
    scroll-margin-top: 120px;

    &.selected {
      border: 2px solid var(--primary-900);
      box-shadow: 0 0 3px 3px var(--primary-300);

      .card-header {
        cursor: pointer;
        background-color: var(--primary-100);

        &:hover {
          background-color: var(--primary-100);
        }

        .start {
          span {
            background-color: var(--primary-900);
            color: #fff;
          }
        }
      }

      // card-header
      .card-body {
        padding: 1em;
        max-height: 3000px;
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5em;
      height: 4em;
      background-color: #fff;
      padding: 0 1em;
      position: relative;
      transition: all ease-in-out 0.15s;
      cursor: pointer;

      &:hover {
        background-color: var(--black-100);
      }

      .start {
        display: flex;
        align-items: center;
        gap: 0.5em;

        h3 {
          font-weight: 600;
        }

        span {
          height: 35px;
          width: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--black-900);
          border-radius: 999px;
          color: #fff;
        }
      }

      .end {
        .tag {
          padding: 0.25em 0.5em;
          font-size: 0.8em;
          border-radius: 6px;
          background-color: var(--black-300);

          &.completed {
            background-color: var(--primary-200);
            color: var(--primary-900);
          }
        }
      }
    }

    //card-header
    .card-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height ease-in-out 0.15s;

      .list {
        border: 1px solid var(--black-300);
        border-radius: 12px;
        padding: 1em;
        display: flex;
        margin-bottom: 0.5em;

        .start {
          h3 {
            font-weight: 600;
          }

          p {
            font-size: 0.9em;
          }
        }

        .end {
          margin-left: auto;
          display: flex;
          gap: 0.5em;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 30px;
            max-width: 30px;
            height: 35px;
            border-radius: 6px;

            i {
              font-size: 0.9em;
            }

            &.blue {
              background-color: var(--primary-100);
              color: var(--primary-900);
            }

            &.delete {
              background-color: var(--red-100);
              color: var(--red-900);
            }

            cursor: pointer;
          }
        }
      }

      .form-fields {
        position: relative;
        z-index: 9999;

        .field-group {
          margin-top: 1em;

          .fields {
            display: flex;
            gap: 0.5em;

            .field {
              flex-grow: 1;
              flex-basis: 0;
              margin-bottom: 0.5em;
            }
          }

          button {
            width: 100%;
            border-radius: 6px;
            font-size: 0.9em;
          }
        }

        // field-group
        .list-group {
          margin-top: 1em;
          padding-top: 1em;
          border-top: 1px solid var(--black-300);

          h3 {
            font-weight: 600;
            font-size: 0.9em;
            margin-bottom: 0.5em;
          }

          ul {
            list-style-type: none;

            li {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid var(--black-300);
              border-radius: 6px;
              padding: 1em;
              height: 2.8em;

              &:not(:last-child) {
                margin-bottom: 0.5em;
              }

              .start {
                font-size: 0.9em;
              }

              .end {
                display: flex;
                align-items: center;
                gap: 0.5em;

                .tag {
                  background-color: var(--primary-100);
                  color: var(--primary-900);
                  padding: 0.25em 0.75em;
                  border-radius: 6px;
                  font-size: 0.9em;
                }

                .icon {
                  text-align: center;
                  font-size: 0.9em;
                  cursor: pointer;
                  color: var(--black-500);
                }
              }
            }
          }
        }

        // list-group
        .field {
          &:not(:last-child) {
            margin-bottom: 1em;
          }

          .checkbox {
            display: flex;
            align-items: center;
            gap: 0.25em;
            cursor: pointer;

            span {
              width: 20px;
              height: 20px;
              border-radius: 3px;
              border: 2px solid var(--black-300);
              display: flex;
              align-items: center;
              justify-content: center;

              &.checked {
                background-color: var(--primary-900);
                border: 2px solid var(--primary-900);

                &::before {
                  content: '\f00c';
                  font-family: 'Font Awesome 6 Pro';
                  color: #fff;
                  font-size: 0.8em;
                }
              }
            }
          }

          label {
            font-weight: 600;
            margin-bottom: 0.25rem;
          }

          textarea {
            display: block;
          }

          input,
          select {
            height: 3.3em;
            border-radius: 8px;
            background-color: #fff;
            color: var(--black-900);
          }

          .control {
            .toggle {
              margin-top: 0.5em;
              display: flex;
              align-items: center;
              flex-direction: row;
              gap: 0.75rem;
              height: 2.5em;

              @media screen and (min-width: 1024px) {
                flex-direction: row;
              }

              p {
                display: flex;
                gap: 0.25em;
                cursor: pointer;

                span {
                  min-width: 25px;
                  min-height: 25px;
                  max-width: 25px;
                  max-height: 25px;
                  border-radius: 999px;
                  border: 2px solid var(--black-300);
                  display: block;
                  position: relative;
                }

                &.selected {
                  span {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid var(--primary-900);

                    &::before {
                      content: '';
                      position: absolute;
                      width: 13px;
                      height: 13px;
                      border-radius: 999px;
                      background-color: var(--primary-900);
                      z-index: 9;
                    }
                  }
                }
              }
            }
          }

          .select {
            &.has-addon-left {
              i {
                position: absolute;
                color: var(--black-900);
                width: 30px;
                text-align: right;
                z-index: 9;
              }

              select {
                padding-left: 40px;
              }
            }

            // has-addon-left
            select {
              box-shadow: inset 0 0 0 2px var(--black-300);

              &:focus {
                outline: none;
                box-shadow: inset 0 0 0 2px var(--primary-900),
                  0 0 6px 0 var(--primary-500);
              }
            }
          }

          input {
            border: none;
            box-shadow: inset 0 0 0 2px var(--black-300);

            &:focus {
              outline: none;
              box-shadow: inset 0 0 0 2px var(--primary-900),
                0 0 6px 0 var(--primary-500) !important;
            }
          }
        }

        .blank-card {
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;

          a {
            display: block;
            cursor: pointer;
            color: var(--primary-900);
          }
        }

        .sub-form {
          .sub-form-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }

      .button-group {
        border-top: 1px solid var(--black-300);
        padding-top: 1em;
        margin-top: 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;

        a {
          cursor: pointer;
          color: var(--black-500);
        }

        button {
          height: 2.8em !important;
        }
      }
    }
  }
}
</style>
