<template>
  <section class="banner-section">
    <div class="container">
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :navigation="true"
        :pagination="true"
        class="mySwiper swiper"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
      >
        <SwiperSlide v-for="(slide, index) in slides" :key="index">
          <img
            :src="slide.image"
            alt="Slide"
            @click="clickBanner(slide._id, slide.url)"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
  <section class="search-section">
    <div class="container">
      <h1 class="section-title">ຄົ້ນຫາວຽກ</h1>
      <div class="search-container">
        <div class="field">
          <label>ຕຳແໜ່ງງານ</label>
          <div class="control">
            <input
              v-model="searchText"
              type="text"
              class="input"
              placeholder="ພະນັກງານເສີບ"
              required
            />
          </div>
        </div>
        <div class="field">
          <label>ຄົນຫາຕຳແໜ່ງງານ</label>
          <div class="control">
            <MultiSelect
              v-model="provinces"
              :hasChild="true"
              :list="provincesList"
            />
          </div>
        </div>

        <div class="time-range">
          <div class="field">
            <label>ໂມງເລີ່ມວຽກ</label>
            <div class="control">
              <input
                v-model="workingTimeStart"
                type="time"
                placeholder="HH:MM"
                required
              />
            </div>
          </div>
          <div class="field">
            <label>ໂມງເລີກວຽກ</label>
            <div class="control">
              <input
                v-model="workingTimeEnd"
                type="time"
                placeholder="HH:MM"
                required
              />
            </div>
          </div>

          <a
            v-if="workingTimeStart || workingTimeEnd"
            class="clear-button"
            @click="clearTime"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </a>
        </div>
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
        <Jobcard v-for="i in jobs" :detail="i" />
      </div>
      <div class="pages">
        <Paginate :total="total" :lastPage="lastPage" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/pagination";
import MultiSelect from "@/components/MultiSelect.vue";

// Swiper
const slides = ref<any>([]);
//  [
//   "https://calculateaspectratio.com/img/16-9-aspect-ratio.png",
//   "https://calculateaspectratio.com/img/16-9-aspect-ratio.png",
//   "/images/slide3.jpg",
// ]

const config = useRuntimeConfig();

const { $apiFetch } = useNuxtApp();

const provinces = ref<any>([]);
const provincesList = ref([]);

const jobs = ref([]);
const total = ref(0);
const lastPage = ref(1);
const page = ref(1);
const perPage = ref(30);

const searchText = ref<any>("");

const route = useRoute();
const router = useRouter();

// const workingTimeStart = ref('08:00')
// const workingTimeEnd = ref('17:00')

const workingTimeStart = ref("");
const workingTimeEnd = ref("");

function groupWorkingLocations(workingLocations: any, provincesData: any) {
  const grouped: any = {};
  const districtToProvince: any = {};

  // Build district → province map
  for (const province of provincesData.provinces) {
    for (const district of province.item) {
      districtToProvince[district._id] = province._id;
    }
  }

  for (const id of workingLocations) {
    const isProvince = provincesData.provinces.some((p: any) => p._id === id);
    if (isProvince) {
      // Create group with empty district list if not exists
      if (!grouped[id]) {
        grouped[id] = [];
      }
    } else {
      const provinceId = districtToProvince[id];
      if (provinceId) {
        if (!grouped[provinceId]) {
          grouped[provinceId] = [];
        }
        grouped[provinceId].push(id);
      }
    }
  }

  // Convert to desired format
  return Object.entries(grouped).map(([provinceId, districtId]) => ({
    provinceId,
    districtId,
  }));
}

const getJobs = async () => {
  try {
    let workingL: any = [];

    if (provinces.value.length) {
      workingL = groupWorkingLocations(provinces.value, {
        provinces: provincesList.value,
      });
    }

    const { data }: any = await useFetch(
      config.public.apiBase + "/get-all-vipo-jobs",
      {
        method: "POST",
        body: {
          title: searchText.value,
          workingLocation: workingL,
          workinghours: {
            start: workingTimeStart.value,
            end: workingTimeEnd.value,
          },
          page: page.value,
          perPage: perPage.value,
        },
      }
    );

    jobs.value = data.value.info;
    total.value = data.value.totals;
  } catch (e) {
    console.log(e);
  }
};

const getProvinces = async () => {
  try {
    const { data }: any = await useAsyncData("provinces", () =>
      $apiFetch("/get-province-vipo", {
        query: { lang: "LA" },
      })
    );
    provincesList.value = data.value.provinces.map((i: any) => {
      return {
        _id: i._id,
        name: i.name,
        item: i.districts,
      };
    });
  } catch (e) {
    console.log(e);
  }
};

const clearTime = () => {
  workingTimeStart.value = "";
  workingTimeEnd.value = "";
};

const getTopBanner = async () => {
  try {
    const { data }: any = await useFetch(
      config.public.apiBase + "/get-top-banner-vipo"
    );
    slides.value = data.value.info;
  } catch (e) {
    console.log(e);
  }
};

const clickBanner = async (id: any, url: any) => {
  try {
    await $fetch(config.public.apiBase + "/record-banner-vipo", {
      method: "POST",
      body: { _id: id },
    });

    window.open(url, "_blank");
  } catch (e) {
    console.log(e);
  }
};

const debouncedSearchText = ref("");
let timeout: ReturnType<typeof setTimeout> | null = null;

// Watch searchText and debounce for 2 seconds
watch(searchText, (newVal) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    // Push to query URL
    router.replace({ query: { ...route.query, search: newVal || undefined } });

    // Fetch data after debounce
    getJobs();
  }, 500);
});

watch(
  provinces,
  (newProvinces) => {
    router.replace({
      query: {
        ...route.query,
        provinces: newProvinces.length ? newProvinces : undefined,
      },
    });
    getJobs();
  },
  { deep: true }
);

watch(
  () => workingTimeStart.value,
  () => {
    getJobs();
  }
);

watch(
  () => workingTimeEnd.value,
  () => {
    getJobs();
  }
);

if (route.query.search) searchText.value = route.query.search;
if (route.query.provinces) {
  const raw = route.query.provinces;
  provinces.value = Array.isArray(raw) ? raw : [raw];
}
await getTopBanner();
await getProvinces();
await getJobs();
</script>

<style lang="scss" scoped>
.search-section {
  position: relative;
  background-color: var(--orange-100);

  @media screen and (max-width: 768px) {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

.swiper {
  img {
    display: block;
    object-fit: contain;
    border-radius: 6px;
    border: 1px solid var(--black-300);
    width: 100%;
    cursor: pointer;

    @media screen and (min-width: 769px) {
      aspect-ratio: 16/6;
    }

    @media screen and (max-width: 768px) {
      aspect-ratio: 16/9;
    }
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

  .field {
    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: var(--md-font);
      font-weight: 600;
    }
  }
}

.time-range {
  display: flex;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
  .field {
    flex-grow: 1;
    .control {
      display: flex;
      input {
        flex-grow: 1;
        border: 1px solid var(--orange-900);
      }
    }
  }
  .clear-button {
    align-self: flex-end;
    display: flex;
    align-items: center;
    white-space: pre;
    cursor: pointer;
    user-select: none;
    font-size: var(--md-font);
    height: 2.8rem;
    padding: 0 0.75rem;
    background-color: var(--orange-900);
    border-radius: 6px;
    color: #fff;
  }
}
</style>
