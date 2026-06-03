<template>
    <!-- Filter Header -->
    <section class="filter-header">
        <div class="container">
            <div class="filter-header-inner">
                <input type="text" v-model="search" class="filter-input" placeholder="ຄົ້ນຫາຕາມຊື່ບໍລິສັດ" />
            </div>
        </div>
    </section>
    <!-- Section Body -->
    <section class="section-body">
        <div class="container">
            <div class="masonry-grid">
                <div class="masonry-item" v-for="(item, index) in items" :key="index"
                    @click="router.push('/job-search/' + item._id)">
                    <div class="card-image">
                        <img :src="item.photoLinks?.[0] || item.employer?.logo || '/logo-circle.png'"
                            :alt="item?.employer?.companyName || 'Company'" />
                    </div>
                    <div class="card-body">
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
    width: 500px;
    padding: 0 1rem;
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
        width: 100%;
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
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--black-200);
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        transform: translateY(-3px);
    }

    .card-image {
        width: 100%;
        overflow: hidden;
        background-color: var(--black-100);

        img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        &:hover img {
            transform: scale(1.05);
        }
    }

    .card-body {
        padding: 0.875rem 1rem;

        .company-name {
            font-size: var(--md-font);
            font-weight: 700;
            color: var(--black-900);
            margin-bottom: 0.4rem;
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

            i {
                color: var(--black-500);
            }
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