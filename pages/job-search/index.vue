<template>
    <!-- Filter Header -->
    <section class="filter-header">
        <div class="container">
            <div class="filter-header-inner">
                <div class="search-input-wrapper">
                    <i class="fa-regular fa-magnifying-glass search-icon"></i>
                    <input type="text" v-model="search" class="filter-input" placeholder="ຄົ້ນຫາຕາມຊື່ບໍລິສັດ" />
                </div>
            </div>
        </div>
    </section>
    <!-- Section Body -->
    <section class="section-body">
        <div class="container">
            <div class="masonry-grid">
                <div class="masonry-item" v-for="(item, index) in items" :key="index"
                    @click="router.push('/job-search/' + item._id)"
                    :style="{ '--photo-count': item.photoLinks?.length || 1 }">

                    <div class="card-image-slider">
                        <div class="slider-track" :class="{ 'has-multiple': item.photoLinks?.length > 1 }">
                            <img v-for="(photo, pIndex) in item.photoLinks" :key="pIndex"
                                :class="pIndex === 0 ? 'primary-img' : 'absolute-img'" :style="getPhotoStyle(pIndex)"
                                :src="photo" :alt="item?.employer?.companyName || 'Company'" />
                            <img v-if="!item.photoLinks || item.photoLinks.length === 0" class="primary-img"
                                :src="item.employer?.logo || '/logo-circle.png'"
                                :alt="item?.employer?.companyName || 'Company'" />
                        </div>
                        <div class="dark-overlay"></div>
                    </div>

                    <div class="company-logo-btn" v-if="item.employer?.logo">
                        <img :src="item.employer.logo" alt="Logo" />
                    </div>

                    <div class="card-footer-glass">
                        <h3 class="company-name">{{ item?.employer?.companyName || 'Unknown Company' }}</h3>
                        <p class="start-date">
                            <i class="fa-regular fa-calendar"></i>
                            {{ formatDefaultDate(item?.createdAt) }}
                        </p>
                    </div>
                </div>
            </div>
            <div ref="infiniteScrollTrigger" class="no-more">
                <br />
                <p v-if="isLoading || isMore">{{ $t('loading') }}</p>
                <p v-else>{{ $t('loadMore') }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { formatDefaultDate } from '~/utils/formatter'
import useFetchCustom from '~/utils/global-useFetch'
import { useInfiniteScroll } from '@vueuse/core'
const router = useRouter()
const getPhotoStyle = (pIndex: string | number) => {
    const idx = Number(pIndex);
    if (idx > 0) {
        return { top: `${idx * 100}%` };
    }
    return {};
}
const search = ref<any>('')
const page = ref<any>(0)
const items = ref<any[]>([])
const isLoading = ref<boolean>(false)
const isMore = ref<boolean>(true)
const totals = ref<number>(0)

const infiniteScrollTrigger = ref<HTMLElement | null>(null)
useInfiniteScroll(infiniteScrollTrigger, () => {
    fetchVipoJobList()
}, { distance: 10 })

const fetchVipoJobList = async () => {
    if (isLoading.value || !isMore.value) return
    isLoading.value = true
    try {
        page.value++
        const form = {
            name: search.value ?? "",
            page: page.value || 1,
            perPage: 10
        }
        const { data, error } = await useFetchCustom('/get-job-vipo-list')
            .post(form)
            .json();

        // Check if error exists before accessing data.value
        if (error.value) {
            console.error('API Error:', error.value);
            return;
        }

        const jobs = data?.value?.jobVipos
        if (Array.isArray(jobs) && jobs.length > 0) {
            items.value.push(...jobs)
            totals.value = data?.value?.totals || 0

            if (items.value.length >= totals.value) {
                isMore.value = false
            }
        } else {
            if (page.value === 1) {
                items.value = [];
            }
            totals.value = 0;
            isMore.value = false
        }
    } catch (e) {
        console.error('Error fetching VIPO jobs:', e)
    } finally {
        isLoading.value = false
    }
}
let searchTimeout: any = null;
watch(search, () => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        items.value = []; // Clear current list
        page.value = 0;   // Reset page
        isMore.value = true;
        fetchVipoJobList();
    }, 800)

});

onMounted(() => {
    fetchVipoJobList();
});
</script>

<style scoped lang="scss">
.filter-header {
    background-color: var(--orange-900);
    padding: 1.5rem 0;

    @media (max-width: 768px) {
        padding: 0.75rem 0;
    }

    .container {
        @media (max-width: 768px) {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }
    }

    .filter-header-inner {
        display: flex;
        align-items: center;
        gap: 1rem;

        h2 {
            font-size: var(--xlg-font);
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
        }

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;

            h2 {
                white-space: normal;
                font-size: clamp(1.2rem, 5vw, 1.5rem);
                line-height: 1.4;
            }
        }
    }
}

.section-body {
    padding: 2rem 0;
    min-height: 80vh;
}


.filter-input {
    height: 50px;
    width: 100%;
    padding: 0 1rem 0 2.75rem;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 8px;
    font-size: var(--sm-font);
    font-family: var(--font-family);
    color: var(--black-900);
    background-color: #fff;
    outline: none;
    flex-shrink: 0;

    &:focus {
        border-color: #fff;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
        height: 40px;
        font-size: var(--xsm-font);
        padding: 0 0.75rem 0 2.25rem;
    }
}

.search-input-wrapper {
    position: relative;
    width: 500px;

    @media (max-width: 768px) {
        width: 100%;
    }

    .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--black-600);
        font-size: var(--sm-font);
        pointer-events: none;

        @media (max-width: 768px) {
            left: 0.75rem;
            font-size: var(--xsm-font);
        }
    }
}

// ── Masonry layout ──────────────────────────────────────────────
.masonry-grid {
    columns: 4;
    column-gap: 1.25rem;

    @media (max-width: 1024px) {
        columns: 3;
    }

    @media (max-width: 768px) {
        columns: 2;
        column-gap: 1rem;
    }

    @media (max-width: 480px) {
        columns: 1;
    }
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 1.25rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background-color: #fff;
    border: 1px solid var(--black-200);
    cursor: pointer;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    position: relative;

    &:hover {
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        transform: translateY(-10px);

        .slider-track.has-multiple {
            transform: translateY(calc(-100% * (var(--photo-count) - 1)));
            transition: transform calc(4.5s * (var(--photo-count) - 1)) linear;
        }

        .slider-track img {
            transform: scale(1.05) translateY(-15px);
        }

        .company-logo-btn,
        .card-footer-glass,
        .dark-overlay {
            opacity: 0;
            visibility: hidden;
        }
    }

    .card-image-slider {
        position: relative;
        width: 100%;
        overflow: hidden;
        min-height: 250px;
        background-color: var(--black-800);

        .slider-track {
            position: relative;
            width: 100%;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);

            img {
                width: 100%;
                display: block;
                object-fit: cover;
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }

            .primary-img {
                height: auto;
                min-height: 250px;
            }

            .absolute-img {
                position: absolute;
                left: 0;
                height: 100%;
            }
        }

        .dark-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.1) 100%);
            pointer-events: none;
            z-index: 1;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
    }

    .company-logo-btn {
        position: absolute;
        top: 16px;
        right: 9px;
        width: 48px;
        height: 48px;
        background: #fff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 6px;
        z-index: 2;
        transition: opacity 0.3s ease, visibility 0.3s ease;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }
    }

    .card-footer-glass {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: none;
        padding: 12px 16px;
        z-index: 2;
        color: var(--black-900);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: opacity 0.3s ease, visibility 0.3s ease;

        .company-name {
            font-size: 1rem;
            font-weight: 700;
            color: var(--black-900);
            margin-bottom: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .start-date {
            font-size: var(--sm-font);
            color: var(--black-600);
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: 500
        }
    }
}

// ── Infinite scroll sentinel ─────────────────────────────────────
.no-more {
    text-align: center;
    padding: 1rem 0;
    color: var(--black-500);
    font-size: var(--sm-font);
}
</style>