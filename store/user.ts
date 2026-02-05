import { defineStore } from 'pinia'
import { useAuthStore } from '~/store/auth'
import useFetchCustom from '@/utils/global-useFetch'
import { seekerInformation } from '~/utils/global-variables'

// Define the User interface
interface User {
  _id: string | null
  fullName: string | null
  profile: string | null
  memberLevel: string | null
  cv: string | null
  percentage: number
  cvUpdatedAt: string,
  profileStatus: null | any
  validProfileStatus: null | any
}

export const useUserStore = defineStore('user', () => {
  const seekerProfile: string = seekerInformation // Assuming this is a URL or API endpoint string
  const Auth = useAuthStore()

  // State store
  const userLevel = ref<string | null>(null)
  const userData = ref<User | null>(null)

  // Fetch userData
  const fetchUserInfo = async () => {
    if (Auth.isAuth === false) return
    try {
      const { data, error, statusCode } = await useFetchCustom(seekerProfile)
        .post()
        .json()
      if (statusCode.value === 200 || data.value) {
        const res: any = data.value
        const mappedUser: User = {
          _id: res.seekerProfile._id,
          fullName: res.seekerProfile.fullName,
          profile: res.seekerProfile.profile,
          memberLevel: res.seekerProfile.memberLevel,
          cv: res.seekerProfile.cv,
          percentage: res?.seekerProfile?.percentage,
          cvUpdatedAt: res?.seekerProfile?.cvUpdatedAt,
          profileStatus: res?.seekerProfile?.profileStatus,
          validProfileStatus: res?.seekerProfile?.validProfileStatus
        }

        userData.value = mappedUser
        userLevel.value = mappedUser.memberLevel
      }
    } catch (e) {
      console.error('Error fetching user info:', e)
    }
  }


  const seekerInfo = ref<any>(null)

  const fetchSeekerInfo = async () => {

    try {
      // Example API call
      const { data, error } = await useFetchCustom('/profile-information-event-client').get().json()
      if (data?.value) {
        seekerInfo.value = data.value
      }
    } catch (error) {
      console.error(error)
    }
  }

  const isSearchableStatus = async (isSearchable: boolean) => {

    return new Promise(async (resolve, reject) => {
      try {
        const form: any = {
          isSearchable
        }

        const res = await useFetchCustom('issearchable-seeker-web').post(form).json()

        resolve(res)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  const isLoading = ref<any>(false)
  const errorMsg = ref<any>("")
  const errorMsgDisconnect = ref<any>("")
  const apiType = ref<any>()
  const saveToDatabase = async (item: any, type: any) => {
    return new Promise(async (resolve, reject) => {
      apiType.value = type
      if (!item?.email_verified && apiType.value === 'google') {
        errorMsg.value = "email_not_verified"
        setTimeout(() => { errorMsg.value = "" }, 3000)
        return
      }

      isLoading.value = true
      const form = {
        id: item?.sub,
        email: item?.email,
        type
      }
      if (apiType.value === 'facebook') form.id = item.id
      const { data, error, statusCode } = await useFetchCustom('/sync-google-facebook-seeker-web').post(form).json()
      isLoading.value = false
      if (data?.value) {
        resolve(data.value)
      }
      if (error.value && statusCode.value === 409) {
        errorMsg.value = "This email already synced another account"
        setTimeout(() => { errorMsg.value = "" }, 5000)
        reject(statusCode)
      }
    })
  }

  const disconnectGoogleFacebookAccount = async (form: any) => {
    return new Promise(async (resolve, reject) => {
      apiType.value = form.type
      isLoading.value = true

      const { data, error, statusCode } = await useFetchCustom('/disconnect-google-facebook-seeker-web').post(form).json()

      isLoading.value = false

      if (data?.value) {
        resolve(data.value)
      }
      if (error.value && statusCode.value === 409) {
        errorMsgDisconnect.value = "Can not disconnect from your account"
        setTimeout(() => { errorMsgDisconnect.value = "" }, 5000)
        reject(statusCode)
      }
    })
  }

  const changePassword = async (form: any) => {
    const { data, error, statusCode } = await useFetchCustom('/change-password').post(form).json()

    return { data, error, statusCode }
  }

  const sendOTP = async (form: any) => {
    const { data, error, statusCode } = await useFetchCustom('/send-verification-code').post(form).json()
    return { data, error, statusCode }
  }

  const verifyCode = async (form: any) => {
    const { data, error, statusCode } = await useFetchCustom('/verify-code').post(form).json()
    return { data, error, statusCode }
  }



  const getRecommendJobAI = async () => {
    const { data, error, statusCode } = await useFetchCustom('/get-recommend-job-by-ai').post().json()
    return data.value?.jobs ?? []
  }


  const getProfileViewCompaniesAPI = async () => {
    const { data, error, statusCode } = await useFetchCustom('/get-profile-viewed-by-companies').get().json()
    return data.value?.companies ?? []
  }

  return {
    userData,
    userLevel,
    fetchUserInfo,
    seekerInfo,
    fetchSeekerInfo,
    isSearchableStatus,
    saveToDatabase,
    apiType,
    errorMsg,
    isLoading,
    disconnectGoogleFacebookAccount,
    errorMsgDisconnect,
    changePassword,
    sendOTP,
    verifyCode,
    getRecommendJobAI,
    getProfileViewCompaniesAPI
  }
})
