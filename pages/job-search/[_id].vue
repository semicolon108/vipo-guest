<template>
  <!-- Filter Header -->
  <Loading v-if="isLoading" />
  <section class="filter-header" v-else>
    <div class="container">
      <div class="filter-header-inner">
        <button class="btn-back" @click="router.back()">
          <i class="fa-regular fa-arrow-left"></i>
          {{ $t('Back') }}
        </button>
        <h1>{{ $t('jobdetail') }}</h1>
      </div>
    </div>
  </section>

  <!-- Section Body -->
  <section class="section-body">
    <div class="container">
      <div class="detail-grid">
        <!-- Grid 1: Photo List -->
        <div class="photo-section">
          <h2 class="section-title">{{ $t('photo') }}</h2>
          <ClientOnly>
            <Swiper v-if="photos.length > 0" class="photo-swiper"
              :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]" :navigation="true"
              :pagination="{ clickable: true }" :loop="true" :slides-per-view="1"
              :autoplay="{ delay: 3000, disableOnInteraction: false }">
              <SwiperSlide v-for="(photo, index) in photos" :key="index">
                <div class="photo-slide" @click="openModal(photo)">
                  <img :src="photo" :alt="'photo ' + (Number(index) + 1)" />
                  <div class="photo-overlay">
                    <i class="fa-regular fa-magnifying-glass-plus"></i>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
        </div>

        <!-- Grid 2: Position List + Company Detail -->
        <div class="position-section">

          <!-- Position List -->
          <div class="position-list">
            <h2 class="section-title"> {{ positions?.length === 1 ? $t('wfAPosition')
              : $t('wfPosition') }}</h2>
            <div class="position-card" v-for="(pos, index) in visiblePositions" :key="index">
              <div class="position-icon">
                <i class="fa-regular fa-briefcase"></i>
              </div>
              <span class="position-title">{{ pos.position }}</span>
              <span class="position-total">{{ pos.employeeCount }} {{ pos.employeeCount === 1 ?
                $t('Position') : $t('Positions') }}</span>
              <button class="btn-apply-pos" :class="{ 'applied': pos.appliedStatus }"
                :disabled="pos.appliedStatus || isSubmitting" @click.stop="!pos.appliedStatus && handleApplyClick(pos)">
                <template v-if="submittingPositionName === pos.position">
                  <i class="fa-regular fa-spinner fa-spin"></i>
                  ກຳລັງສົ່ງ...
                </template>
                <template v-else>
                  <i v-if="pos.appliedStatus" class="fa-regular fa-check"></i>
                  {{ pos.appliedStatus ? 'ສະໝັກແລ້ວ' : 'ສະໝັກ' }}
                </template>
              </button>
            </div>
            <button v-if="positions.length > 4" class="btn-show-more" @click="showAll = !showAll">
              <template v-if="!showAll">
                <i class="fa-regular fa-chevron-down"></i>
                {{ $t('show more') }} ({{ positions.length - 4 }} {{ positions.length - 4 === 1 ?
                  $t('Position') : $t('Positions') }})
              </template>
              <template v-else>
                <i class="fa-regular fa-chevron-up"></i>
                {{ $t('show less') }}
              </template>
            </button>
          </div>
          <!-- Caption / Description -->
          <div class="position-list" v-if="facebookMessage">
            <h2 class="section-title">{{ $t('Description') }}</h2>
            <div class="caption-content" v-html="facebookMessage"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Image Zoom Modal -->
  <Teleport to="body">
    <div class="photo-modal" v-if="selectedPhoto" @click.self="closeModal">
      <button class="modal-close" @click="closeModal">
        <i class="fa-regular fa-xmark"></i>
      </button>
      <img :src="selectedPhoto" class="modal-image" />
    </div>
  </Teleport>


</template>

<script setup lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Loading from '~/components/Loading.vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const id = route.params._id
if (!id || id === '?' || id === '') {
  router.replace('/job-search')
}
const isLoading = ref<boolean>(false)
const company = ref<any>({})
const positions = ref<any[]>([])
const photos = ref<any[]>([])
const facebookMessage = ref<any>("")
const selectedPhoto = ref<string | null>(null)
const showAll = ref(false)

const visiblePositions = computed(() => showAll.value ? positions.value : positions.value.slice(0, 4))

const openModal = (photo: string) => { selectedPhoto.value = photo }
const closeModal = () => { selectedPhoto.value = null }

const fetchData = async () => {
  try {
    isLoading.value = true
    const { $apiFetch } = useNuxtApp()
    const data = await $apiFetch<any>('/get-job-vipo-detail/' + id)
    if (data) {
      company.value = data.jobVipoDetail?.employer || {}
      const appliedPositions = data.jobVipoDetail?.appliedPositions || data.appliedPositions || []
      positions.value = (data.jobVipoDetail?.positions || []).map((pos: any) => ({
        ...pos,
        appliedStatus: pos.appliedStatus || appliedPositions.includes(pos.position) || false
      }))
      photos.value = data.jobVipoDetail?.photoLinks || []
      facebookMessage.value = data.jobVipoDetail?.caption || ""
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

fetchData()

const { isAuth, user } = useAuth()
const { showToast } = useToast()
const { openConfirm } = useConfirmModal()
const { openError } = useErrorModal()

const isSubmitting = ref(false)
const submittingPositionName = ref<string | null>(null)

const handleApplyClick = async (pos: any) => {
  if (!isAuth.value) {
    router.push(`/auth/login?redirect=${route.fullPath}`)
    return
  }
  if (user.value?.profile && !user.value.profile.firstName) {
    router.push('/auth/cv')
    return
  }

  const confirmed = await openConfirm(
    'ຍືນຍັນການສະໝັກ',
    `ທ່ານຕ້ອງການສະໝັກຕຳແໜ່ງ <strong>${pos.position}</strong> ແມ່ນບໍ່?`
  )

  if (confirmed) {
    try {
      submittingPositionName.value = pos.position
      isSubmitting.value = true
      const { $apiFetch } = useNuxtApp()

      const res = await $apiFetch<any>('/apply-job-for-vipo', {
        method: 'POST',
        body: {
          _id: id,
          positionName: pos.position
        }
      })

      showToast(`${pos.position}: ສະໝັກແລ້ວ`, 'success')

      // Use appliedPositions array from response to update UI locally first
      const appliedPositions = res?.appliedPositions || res?.data?.appliedPositions || []
      if (Array.isArray(appliedPositions) && appliedPositions.length > 0) {
        positions.value = positions.value.map((item: any) => ({
          ...item,
          appliedStatus: item.appliedStatus || appliedPositions.includes(item.position)
        }))
      } else {
        pos.appliedStatus = true
      }

      // Refresh apply status
      await fetchData()
    } catch (e: any) {
      console.error(e)
      const errMsg = e?.data?.message || 'Failed to apply'
      openError('ເກີດຂໍ້ຜິດພາດ', errMsg)
    } finally {
      isSubmitting.value = false
      submittingPositionName.value = null
    }
  }
}

const formatArray = (arr: any[]) => {
  return arr.map(item => item.name).join(', ')
}

</script>

<style scoped lang="scss">
.filter-header {
  background-color: #fff;
  border-bottom: 1px solid var(--black-200);
  padding: 1rem 0;

  .filter-header-inner {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: var(--md-font);
      font-weight: 700;
      color: var(--black-900);
    }
  }
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 36px;
  padding: 0 1rem;
  background-color: var(--black-100);
  border: 1px solid var(--black-200);
  border-radius: 8px;
  font-size: var(--sm-font);
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--black-900);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  margin-left: 5px;

  &:hover {
    background-color: var(--black-200);
  }
}

.section-body {
  background-color: var(--bg-color);
  padding: 1rem 0;
  min-height: 80vh;

  .container {
    max-width: 1120px;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1.1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.position-section {
  position: sticky;
  top: 1rem;
}

.section-title {
  font-size: var(--md-font);
  font-weight: 700;
  color: var(--black-900);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--black-200);
}

// Grid 1: Photos
.photo-section {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--black-200);

  .section-title {
    padding: 1.25rem 1.25rem 1rem;
    border-bottom: 1px solid var(--black-200);
    margin-bottom: 0;
  }
}

.photo-swiper {
  width: 100%;
  --swiper-navigation-color: var(--orange-900);
  --swiper-theme-color: var(--orange-900);
}

.photo-slide {
  position: relative;
  cursor: pointer;
  width: 100%;
  background-color: var(--black-100);

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  .photo-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;

    i {
      font-size: 2rem;
      color: #fff;
    }
  }

  &:hover {
    img {
      transform: scale(1.03);
    }

    .photo-overlay {
      opacity: 1;
    }
  }
}

.photo-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .modal-image {
    max-width: 90vw;
    max-height: 85vh;
    border-radius: 12px;
    object-fit: contain;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    color: #fff;
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.35);
    }
  }
}

// Grid 2: Positions
.position-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.position-list {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid var(--black-200);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.position-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--black-200);
  background-color: var(--black-50);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary-500);
    background-color: var(--primary-100);
  }

  .position-icon {
    width: 34px;
    height: 34px;
    min-width: 34px;
    border-radius: 8px;
    background-color: var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: var(--sm-font);
      color: var(--primary-900);
    }
  }

  .position-title {
    flex: 1;
    font-size: var(--sm-font);
    font-weight: 600;
    color: var(--black-900);
  }

  .position-total {
    font-size: var(--xsm-font);
    font-weight: 600;
    color: var(--primary-900);
    background-color: var(--primary-100);
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    white-space: nowrap;
  }

  .btn-apply-pos {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.4rem 1.1rem;
    font-size: var(--xsm-font);
    font-family: var(--font-family);
    font-weight: 700;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1.5px solid var(--primary-500);
    background-color: var(--primary-500);
    color: #fff;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(255, 109, 0, 0.15);

    i {
      font-size: var(--xsm-font);
    }

    &:hover {
      background-color: var(--primary-600);
      border-color: var(--primary-600);
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(255, 109, 0, 0.25);
    }

    &:active {
      transform: translateY(0);
    }

    &.applied {
      background-color: #fff;
      border-color: var(--primary-500);
      color: var(--primary-500);
      box-shadow: none;

      i {
        color: var(--primary-500);
      }

      &:hover {
        background-color: var(--primary-500);
        color: #fff;

        i {
          color: #fff;
        }
      }
    }
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 0.75rem;
    align-items: center;
    padding: 0.75rem;

    .position-icon {
      grid-column: 1;
      grid-row: 1 / 3;
      align-self: center;
    }

    .position-title {
      grid-column: 2;
      grid-row: 1;
      font-size: var(--sm-font);
      line-height: 1.3;
      margin: 0;
    }

    .position-total {
      grid-column: 2;
      grid-row: 2;
      justify-self: start;
    }

    .btn-apply-pos {
      grid-column: 2;
      grid-row: 2;
      justify-self: end;
      padding: 0.35rem 0.9rem;
      box-shadow: none;
    }
  }
}

.btn-show-more {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.6rem;
  background-color: transparent;
  border: 1px dashed var(--black-200);
  border-radius: 8px;
  font-size: var(--sm-font);
  font-family: var(--font-family);
  font-weight: 600;
  color: var(--primary-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-100);
    border-color: var(--primary-500);
  }
}

// Caption content (inside .position-list, same style as position panel)
.caption-content {
  font-size: 0.875rem;
  font-family: "Noto Sans Lao", "Noto Sans Lao Looped", Satoshi, sans-serif;
  color: var(--black-900);
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;

  :deep(*) {
    font-size: inherit !important;
    font-family: inherit;
  }

  p {
    margin-bottom: 0.75rem;
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
  }

  strong,
  b {
    font-weight: 700;
    color: var(--black-900);
  }

  ul,
  ol {
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  li {
    margin-bottom: 0.25rem;
  }
}


// Company Detail
.company-detail {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid var(--black-200);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  .company-logo {
    width: 60px;
    height: 60px;
    min-width: 60px;
    border-radius: 10px;
    border: 1px solid var(--black-200);
    overflow: hidden;
    background-color: var(--black-100);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .company-info {
    flex: 1;

    .company-name {
      font-size: var(--md-font);
      font-weight: 700;
      color: var(--black-900);
      margin-bottom: 0.25rem;
    }

    .company-industry {
      font-size: var(--sm-font);
      color: var(--black-600);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.25rem;
    }

    .company-followers {
      font-size: var(--sm-font);
      color: var(--black-600);
      display: flex;
      align-items: center;
      gap: 0.4rem;

      b {
        color: var(--primary-900);
        font-weight: 700;
      }
    }
  }
}

.btn-company-profile {
  height: 36px;
  padding: 0 1rem;
  background-color: var(--primary-500);
  color: #fff;
  border-radius: 8px;
  font-size: var(--sm-font);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
}
</style>
