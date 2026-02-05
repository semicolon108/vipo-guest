import { defineStore } from 'pinia'
import { useForm } from "vee-validate";
import * as yup from "yup";
import useFetchCustom from '@/utils/global-useFetch'

export const usePersonalInformationStore = defineStore('personalInformation', () => {
    const isLoading = ref<any>(false)
    const checkUploadProfile = ref<any>(false)
    const route = useRoute()
    // Step 1
    const schema = yup.object({
        file: yup
            .mixed()
            .required('Profile field is required')
            .test('file-valid', 'Please select a valid file', (value: any) => {
                return value && typeof value === 'object' && value.name
            }),
        firstName: yup.string().required("FirstName field is required"),
        lastName: yup.string().required("LastName field is required"),
        genderId: yup.string().required("Gender field is required"),
        maritalStatusId: yup.string().required("MaritalStatus field is required"),
        dateOfBirth: yup.string().required("Date of birth field is required"),
        provinceId: yup.string().required("Province field is required"),
        districtId: yup.string().required("District field is required"),
        professionalSummary: yup.string().transform(value => value || null).nullable()
    })
    const {
        handleSubmit,
        setFieldValue,
        errors,
        defineField,
        validate,
        setErrors,
        handleReset,
    } = useForm({
        validationSchema: schema,
        initialValues: {
            file: null,
            firstName: "",
            lastName: "",
            genderId: "",
            maritalStatusId: "",
            dateOfBirth: "",
            provinceId: "",
            districtId: "",
            professionalSummary: ""
        }
    })

    const [file, fileProps] = defineField('file')
    const [firstName, firstNameProps] = defineField('firstName')
    const [lastName, lastNameProps] = defineField('lastName')
    const [genderId, genderIdProps] = defineField('genderId')
    const [maritalStatusId, maritalStatusIdProps] = defineField('maritalStatusId')
    const [dateOfBirth, dateOfBirthProps] = defineField('dateOfBirth')
    const [provinceId, provinceIdProps] = defineField('provinceId')
    const [districtId, districtIdProps] = defineField('districtId')
    const [professionalSummary, professionalSummaryProps] = defineField('professionalSummary')
    const submitStep1Form = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await handleSubmit(async (values: any, { resetForm }) => {
                    isLoading.value = true
                    const form: any = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        genderId: values.genderId,
                        maritalStatusId: values.maritalStatusId,
                        dateOfBirth: values.dateOfBirth,
                        districtId: values.districtId,
                        professionalSummary: values.professionalSummary,
                        event: route.query.event as string
                    }

                    if (checkUploadProfile.value) {
                        form.file = values.file?.value
                    } else {
                        form.file = null
                    }
                    // Example API call
                    const res = await useFetchCustom('add-seeker-profile-web').post(form).json()
                    // Success
                    isLoading.value = false
                    checkUploadProfile.value = false
                    resolve(res)
                })()
            } catch (error) {
                isLoading.value = false
                console.error(error)
                reject(error)
            }
        })
    }
    //End Step 1

    return {
        isLoading,
        checkUploadProfile,
        file,
        fileProps,
        firstName,
        firstNameProps,
        lastName,
        lastNameProps,
        genderId,
        genderIdProps,
        maritalStatusId,
        maritalStatusIdProps,
        dateOfBirth,
        dateOfBirthProps,
        provinceId,
        provinceIdProps,
        districtId,
        districtIdProps,
        professionalSummary,
        professionalSummaryProps,
        setErrors,
        handleReset,
        setFieldValue,
        errors,
        validate,
        submitStep1Form,
    }
})