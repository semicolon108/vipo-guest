<template>
  <section class="search-section">
    <div class="container">
      <h1 class="section-title">ຄົ້ນຫາວຽກ</h1>
      <div class="search-container">
        <div class="field">
          <input
              v-model="searchText"
              type="text" class="input" placeholder="ຊອກຕຳແໜ່ງ" />
        </div>
        <div class="field">
          <MultiSelect
              v-model="provinces"
              :hasChild="true"
              :list="provincesList"
          />
<!--          <div class="select">-->
<!--    -->
<!--            <select name="" id="" required>-->
<!--              <option value="" disabled selected>ເລືອກແຂວງ</option>-->
<!--              <option value="">ນະຄອນຫຼວງວຽງຈັນ</option>-->
<!--              <option value="">ນະຄອນຫຼວງພະບາງ</option>-->
<!--              <option value="">ວຽງຈັນ</option>-->
<!--            </select>-->
<!--          </div>-->
        </div>


            <div class="field" style="display: flex;">


           <div class="control">
             <input v-model="workingTimeStart"
                    type="time" required class="without_ampm"  />
           </div>



                  <div class="control">
                    <input v-model="workingTimeEnd" type="time" required class="without_ampm"  />

                  </div>

              <div>
                <button class="button" @click="clearTime">clear time</button>
              </div>


            </div>
<!--            <div class="field">-->

<!--            </div>-->
<!--            <select required>-->
<!--              <option value="" disabled selected>ເວລາເຮັດວຽກ</option>-->
<!--              <option value="">07:00 - 15:00</option>-->
<!--              <option value="">16:00 - 21:00</option>-->
<!--              <option value="">08:00 - 17:00</option>-->
<!--            </select>-->

      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="filter">
        <div class="start">
          <h1>ວຽກທັງໝົດ:</h1>
          <span>{{ total }}</span>
        </div>
        <div class="end">
          <Paginate :total="total" :lastPage="lastPage" />
        </div>
      </div>
      <div class="job-card-list">
        <Jobcard v-for="i in jobs"
        :detail="i"
        />
      </div>
      <div class="pages">
        <Paginate :total="total" :lastPage="lastPage" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MultiSelect from "@/components/MultiSelect.vue";

const config = useRuntimeConfig();

const { $apiFetch } = useNuxtApp();


const provinces = ref<any>([])
const provincesList = ref([])

const jobs = ref([])
const total = ref(0)
const lastPage = ref(1)
const page = ref(1)
const perPage = ref(30)

const searchText = ref<any>('')

const route = useRoute()
const router = useRouter()

// const workingTimeStart = ref('08:00')
// const workingTimeEnd = ref('17:00')

const workingTimeStart = ref('')
const workingTimeEnd = ref('')












function groupWorkingLocations(workingLocations: any, provincesData: any) {
  const grouped: any = {}
  const districtToProvince: any = {}

  // Build district → province map
  for (const province of provincesData.provinces) {
    for (const district of province.item) {
      districtToProvince[district._id] = province._id
    }
  }

  for (const id of workingLocations) {
    const isProvince = provincesData.provinces.some((p: any) => p._id === id)
    if (isProvince) {
      // Create group with empty district list if not exists
      if (!grouped[id]) {
        grouped[id] = []
      }
    } else {
      const provinceId = districtToProvince[id]
      if (provinceId) {
        if (!grouped[provinceId]) {
          grouped[provinceId] = []
        }
        grouped[provinceId].push(id)
      }
    }
  }

  // Convert to desired format
  return Object.entries(grouped).map(([provinceId, districtId]) => ({
    provinceId,
    districtId
  }))
}





const getJobs = async () => {
  try {

    let  workingL: any = []

    if(provinces.value.length) {
      workingL = groupWorkingLocations(provinces.value,  { provinces: provincesList.value } )
    }

    const { data }: any = await useFetch(config.public.apiBase + '/get-all-vipo-jobs', {
      method: 'POST',
      body: {
        title: searchText.value,
        workingLocation: workingL,
        workinghours: {
          start: workingTimeStart.value,
          end: workingTimeEnd.value
        },
        page: page.value,
        perPage: perPage.value
      },
    });

    jobs.value = data.value.info
    total.value = data.value.totals


  }catch(e) {
    console.log(e)
  }
}



const getProvinces = async () => {
  try {

    const { data }: any = await useAsyncData('provinces', () =>
        $apiFetch('/get-province-vipo', {
          query: { lang: 'LA' },
        })
    );
    provincesList.value = data.value.provinces.map((i: any) => {
      return {
        _id: i._id,
        name: i.name,
        item: i.districts
      }
    })


  }catch(e) {
    console.log(e)
  }
}






const clearTime = () => {
  workingTimeStart.value = ''
  workingTimeEnd.value = ''
}


const debouncedSearchText = ref('')
let timeout: ReturnType<typeof setTimeout> | null = null

// Watch searchText and debounce for 2 seconds
watch(searchText, (newVal) => {
  if (timeout) clearTimeout(timeout)

  timeout = setTimeout(() => {
    // Push to query URL
    router.replace({ query: { ...route.query, search: newVal || undefined } })

    // Fetch data after debounce
    getJobs()
  }, 500)
})


watch(provinces, (newProvinces) => {
  router.replace({
    query: {
      ...route.query,
      provinces: newProvinces.length ? newProvinces : undefined,
    }
  })
  getJobs()
}, { deep: true })


watch(() => workingTimeStart.value, () => {
  getJobs()
})

watch(() => workingTimeEnd.value, () => {
  getJobs()
})


if(route.query.search) searchText.value = route.query.search
if (route.query.provinces) {
  const raw = route.query.provinces;
  provinces.value = Array.isArray(raw) ? raw : [raw];
}

await getProvinces()
await getJobs()

</script>

<!--<style lang="scss">-->
<!--input[type=time]::-webkit-datetime-edit-ampm-field {-->
<!--  display: none;-->
<!--}-->
<!--</style>-->

<style lang="scss" scoped>
.search-section {
  position: relative;
  background-color: var(--orange-100);
  @media screen and (max-width: 768px) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  svg {
    position: absolute;
    top: 100px;
  }
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  .start {
    display: flex;
    h1 {
      font-weight: 500;
    }
    span {
      margin-left: 0.25rem;
      font-weight: 700;
      color: var(--orange-900);
    }
  }
}
.pages {
  padding: 2rem 0 0;
  display: flex;
  justify-content: center;
}
.job-card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
.section-title {
  font-weight: 700;
  font-size: var(--lg-font);
  margin-bottom: 0.5rem;
}
.search-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  input {
    background-color: #fff;
  }
}
</style>
