<template>
  <section class="job-detail-page">
    <Share ref="shareRef" />
    <div class="container">
      <a class="back-button" @click="$router.back()"
        ><i class="fa-regular fa-arrow-left"></i> ກັບໄປໜ້າຫຼັກ</a
      >

      <div class="page-content">
        <div class="start">
          <div class="box">
            <div class="box-header">
              <div class="box-header-start">
                <h1 class="job-title">{{ detail.title }}</h1>
                <ul>
                  <li><small>₭</small>{{ formatCurrency(detail.salary) }}</li>
                  <li>
                    <i class="fa-regular fa-building"></i>
                    {{ detail.companyName }}

                  </li>
                  <li>
                    <i class="fa-regular fa-location-dot"></i>
                    <span v-for="i in detail.workingLocation">{{ i.province }} </span>
                  </li>
                  <li>
                    <div class="tags">
                      <span>{{minutesToTimeString(detail.startTime)}} - {{minutesToTimeString(detail.endTime)}}</span>

                    </div>
                  </li>
                </ul>
              </div>
              <div class="logo">
                <img
                  :src="detail.logo"
                />
              </div>
            </div>
            <div class="buttons">

              <button
                  @click="shareRef.isPopupVisible = true"
                  class="button small share-button">
                <i class="fa-solid fa-link"></i> ແຊປະກາດວຽກ
              </button>


              <div
                  v-if="detail.isApply"

                  class="button small apply-button" style="background: gray; pointer-events: none">ສະໝັກແລ້ວ</div>
              <div v-else
                  @click="applyJob"
                  class="button small apply-button">ສະໝັກວຽກນີ້</div>
            </div>
            <div class="card-job-description">
              <div v-html="detail.description"></div>
<!--              <h3>ໜ້າທີ່ຮັບຜິດຊອບ</h3>-->
<!--              <ol>-->
<!--                <li>-->
<!--                  ການແນະນໍາສິນຄ້າ ແລະ ຂາຍສິນຄ້າ ປິດຍອດຂາຍໃຫ້ໄດ້ຕາມເປົ້າໜາຍ-->
<!--                </li>-->
<!--                <li>ການວາງແຜນກ່ອນອອກຢ້ຽມຢາມຮ້ານຄ້າໃນທຸກມື້</li>-->
<!--                <li>ການອອກຢ້ຽມຢາມຮ້ານຄ້າຕາມແຜນທີ່ວາງໄວ້ ແລະ ມີຄວາມຕໍ່ເນື່ອງ</li>-->
<!--                <li>-->
<!--                  ການເກັບກຳຂໍ້ມູນການເຄື່ອນໄຫຼວການຂາຍຂອງຮ້ານຄ້າ, ຕະຫຼາດ ແລະ-->
<!--                  ຄູ່ແຂ່ງ-->
<!--                </li>-->
<!--                <li>ມີກົນລະຍຸດໃນການນໍາສະເໜີສິນຄ້າ,</li>-->
<!--                <li>ເຮັດໃຫ້ເຫັນເຖີງຄຸນນະພາບຫລາຍກວ່າລາຄາ</li>-->
<!--                <li>ການລົງຢ້ຽມຢາມຮ້ານຄ້າຕາມແຜນການທີ່ວາງໄວ້,</li>-->
<!--                <li>ການສ້າງສາຍສໍາພັນທີ່ດີກັບຮ້ານຄ້າ ການກວດນັບສະຕ໋ອກຮ້ານຄ້າ,</li>-->
<!--                <li>ການເຕີມສະຕ໋ອກຂອງລຸ້ນທີ່ຂາດ</li>-->
<!--                <li>ການເຕີມສະຕ໋ອກສີນຄ້າທີ່ຂາດໃຫ້ກັບຮ້ານຄ້າໄດ້ຄົບຖ້ວນ</li>-->
<!--              </ol>-->
<!--              <h3>ເງິນໄຂການສະໝັກ</h3>-->
<!--              <ul>-->
<!--                <li>ທັກສະການສື່ສານ</li>-->
<!--                <li>ທັກສະການຫາຂໍ້ມູນ</li>-->
<!--                <li>ທັກສະການໂນ້ມນ້າວ</li>-->
<!--                <li>ທັກສະການປະສານງານ</li>-->
<!--                <li>ຊັ້ນສູງ ຫຼື ປະລິນຍາຕີສາຂາທີ່ກ່ຽວຂ້ອງ</li>-->
<!--                <li>Gender: ຍິງ/ຊາຍ</li>-->
<!--                <li>Age: 20 ຂື້ນໄປ</li>-->
<!--              </ul>-->
            </div>
            <div class="share-card">
              <p>ໝູ່ຂອງເຈົ້າອາດເໝາະກັບວຽກນີ້</p>
              <button class="button"
                      @click="shareRef.isPopupVisible = true"

              >
                <i class="fa-solid fa-link"></i> ສົ່ງວຽກນີ້ໃຫ້ໝູ່
              </button>
            </div>
          </div>
        </div>

        <div class="end">
          <div class="box ads">
            <img
              src="https://media.jobthai.com/v1/images/banners/4_331393_652d07112d4e2f780f783caf_1739262485961.jpeg?type=webp"
            />
            <img
              src="https://media.jobthai.com/v1/images/banners/4_327313_67c14a2c0d4dd8d135499f61_1740720684910.jpeg?type=webp"
            />

            <img
              src="https://www.jobthai.com/static/images/banner/freespace-super-hot-job.png?type=webp"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Share from '@/components/Share.vue'
import {minutesToTimeString} from "~/utils/formatter";

const { $apiFetch } = useNuxtApp();

const { isAuth, user, token } = useAuth();

const config = useRuntimeConfig();

const route = useRoute()

const detail = ref<any>({})

const shareRef = ref()



const getJobById = async () => {
  try {

    const { data }: any = await useAsyncData('getJobDetail', () =>
        $apiFetch('/get-one-job-vipo', {
          method: 'POST',
          body: {
            token: token.value,
            _id: route.params._id },
        })
    )

   // console.log(data)
    detail.value = data.value.info

  }catch(e) {
    console.log(e)
  }
}

const applyJob = async () => {

  if(!isAuth.value) {
    return navigateTo('/auth/login')
  }
  if (user.value.profile && !user.value.profile.firstName) {
    return navigateTo('/auth/cv')
  }

  const isConfirmed = confirm('Are you sure you want to apply this job?');
  if(!isConfirmed) return

  try {

    const { data } = await useAsyncData('applyJob', () =>
        $apiFetch('/apply-job-vipo', {
          method: 'POST',
          body: { _id: route.params._id },
        })
    );

    if(data.value) {
      detail.value.isApply = true
      //alert('Applied')
    }




  }catch(e) {
    console.log(e)
  }
}


await  getJobById()


onMounted(() => {
  setTimeout(() => {
    shareRef.value.shareLink = 'https://new.vipo.cc' + route.fullPath
  })
})


useSeoMeta({
  robots: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
  title: detail.value.title,
  ogTitle:  detail.value.title,
  description: detail.value.title,
  ogDescription:  detail.value.title,
  ogImage: '',
  ogImageSecureUrl: '',
  ogImageWidth: '1280',
  ogImageHeight: '720',
  ogImageType: 'image/jpeg',
  ogImageAlt: detail.value.title,
  ogUrl: 'https://new.vipo.cc' + route.fullPath,
  ogSiteName: '',
  ogType: 'article',
  articlePublishedTime: detail.value.createdAt,
  articleModifiedTime:  detail.value.updatedAt,
  articleTag: [],
  twitterCard: 'summary_large_image',
  twitterTitle:  detail.value.title,
  twitterDescription:  detail.value.title,
  twitterImage: '',
  twitterImageAlt: detail.value.title,
  twitterLabel1: '',
  twitterData1: '',
  twitterLabel2: 'Time to read',
  twitterData2: 'Less than a minute'
})


</script>

<style lang="scss" scoped>
.job-detail-page {
  min-height: calc(100vh - 8rem);
  .back-button {
    font-size: var(--sm-font);
    cursor: pointer;
    height: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--black-600);
    transition: all ease-in-out 0.15s;
    &:hover {
      color: var(--orange-900);
    }
    i {
      margin-top: 0.25rem;
    }
  }
  .page-content {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 1rem;
    @media screen and (max-width: 768px) {
      grid-template-columns: 100%;
    }
    .ads {
      padding: 1rem;
      img {
        width: 100%;
        display: block;
        border-radius: 6px;
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
}

.box {
  border: 1px solid var(--black-300);
  padding: 1.5rem;
  border-radius: 8px;
  font-size: var(--md-font);
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .box-header {
    display: flex;
    .box-header-start {
      flex-grow: 1;
      .job-title {
        font-size: var(--lg-font);
        font-weight: 800;
      }
      .salary {
        font-weight: 600;
      }
      ul {
        margin-top: 0.75rem;
        li {
          font-size: var(--sm-font);
          color: var(--black-800);
          font-weight: 600;
          small {
            font-size: var(--sm-font);
            font-weight: 700;
            margin-right: 0.25rem;
          }
          i {
            font-size: var(--sm-font);
          }
          .tags {
            margin-top: 0.25rem;
            display: flex;
            gap: 0.25rem;
            span {
              background-color: var(--black-200);
              padding: 0 0.5rem;
              height: 1.8rem;
              border-radius: 3px;
              display: flex;
              align-items: center;
              font-size: var(--xsm-font);
              user-select: none;
            }
          }
        }
      }
    }
    .logo {
      img {
        display: block;
        min-width: 75px;
        min-height: 75px;
        max-width: 75px;
        max-height: 75px;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid var(--black-300);
        @media screen and (max-width: 768px) {
          max-width: 60px;
          max-height: 60px;
          min-width: 60px;
          min-height: 60px;
        }
      }
    }
  }
  .buttons {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    .share-button {
      background-color: var(--orange-100);
      color: var(--orange-900);
      border: 1px solid var(--orange-300);
    }
    .apply-button {
      background-color: var(--orange-900);
      color: #fff;
    }
  }
  .card-job-description {
    border: 1px solid var(--black-300);
    border-radius: 6px;
    padding: 1rem;
    margin-top: 1.5rem;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    b {
      font-weight: 700;
    }
    ul,
    ol {
      margin: 0.5rem 0;
      li {
        margin-left: 2rem;
        line-height: 1.5;
      }
    }
    ul li {
      list-style-type: disc;
    }
    img {
      width: 100%;
      display: block;
      &:not(:last-child) {
        margin: 1rem 0;
      }
    }
  }
  .share-card {
    border-radius: 8px;
    margin-top: 1rem;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    background-color: var(--orange-100);
    p {
      font-weight: 600;
    }
    button {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 500;
      color: var(--orange-900);
      box-shadow: inset 0 0 0 1px var(--orange-900);
      background-color: var(--orange-900);
      color: #fff;
    }
  }
}
</style>
