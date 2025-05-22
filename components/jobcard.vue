<template>
  <NuxtLink class="job-card" :to="`/job-detail/${detail._id}`">
    <div class="jobcard-header">
      <div class="header-start">
        <img :src="detail.logo" alt="" />
      </div>
      <div class="header-end">
        <small>ສະໝັກກ່ອນວັນທີ</small>
        <p>{{ formatDefaultDate(detail.closingDate) }}</p>
      </div>
    </div>
    <div class="jobcard-body">
      <p><i class="fa-solid fa-building"></i>{{ detail.companyName }}</p>
      <h3>{{ detail.title }}</h3>
      <ul>
        <li>
          <span v-for="i in detail.workTime || []"
            >{{ minutesToTimeString(i.startTime) }} -
            {{ minutesToTimeString(i.endTime) }}</span
          >
        </li>
      </ul>
      <div class="salary">
        ເງິນເດືອນເລີ່ມຕົ້ນ:
        <p class="salary">{{ formatCurrency(detail.salary) }} ກີບ</p>
      </div>
    </div>
    <div class="jobcard-footer">
      <div class="footer-start">
        <i class="fa-solid fa-location-dot"></i>

        <p
          style="
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ detail.isWorkingLocation.join(", ") }}
        </p>
      </div>
      <div class="footer-end">
        <button class="button small">ສະໝັກ</button>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  formatCurrency,
  formatDefaultDate,
  minutesToTimeString,
} from "~/utils/formatter";

const { detail }: any = defineProps(["detail"]);
</script>

<style lang="scss" scoped>
.job-card {
  background-color: #fff;
  border-radius: 8px;
  padding-top: 1rem;
  box-shadow: 0 0 0 1px var(--black-300), 0 0 8px 3px rgba(#000, 0.03);
  cursor: pointer;
  transition: all ease-in-out 0.25s;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 0 0 3px var(--orange-900), 0 0 0 rgba(#000, 0.05);
  }
  .jobcard-header {
    display: flex;
    align-items: flex-start;
    padding: 0 1rem;
    .header-start {
      img {
        background-color: #fff;
        height: 60px;
        width: 60px;
        border: 1px solid var(--black-300);
        border-radius: 999px;
        object-fit: contain;
        padding: 0.5rem;
      }
    }
    .header-end {
      margin-left: auto;
      text-align: right;
      small {
        font-size: var(--xsm-font);
        color: var(--black-600);
        font-weight: 400;
        line-height: 1;
      }
      p {
        line-height: 1.3;
        font-size: var(--sm-font);
      }
    }
  } //jobcard-header
  .jobcard-body {
    padding: 1rem;
    flex-grow: 1;
    p {
      font-size: var(--xsm-font);
      color: var(--black-600);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      i {
        font-size: var(--xxsm-font);
        height: 10px;
      }
    }
    h3 {
      font-size: var(--md-font);
      color: var(--black-900);
      font-weight: 700;
    }
    ul {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      margin-bottom: 0.75rem;
      li {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        span {
          background-color: var(--black-200);
          font-size: var(--xxsm-font);
          line-height: 1;
          height: 1.8rem;
          border-radius: 3px;
          padding: 0 0.5rem;
          display: flex;
          align-items: center;
        }
      }
    }
    .salary {
      font-size: var(--xsm-font);
      p {
        font-weight: 700;
        display: inline-block;
        background-color: var(--yellow-900);
        padding: 0.15rem 0.75rem;
        border-radius: 6px;
        font-size: var(--sm-font);
        color: #000;
      }
    }
  } // jobcard-body
  .jobcard-footer {
    border-top: 1px solid var(--black-300);
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    .footer-start {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      i {
        font-size: var(--xsm-font);
        display: block;
        height: 9px;
        color: var(--black-600);
      }
      p {
        font-size: var(--md-font);
        cursor: pointer;
        user-select: none;
      }
    }
    .footer-end {
      button.button {
        border: 1px solid var(--orange-900);
        color: var(--orange-900);
        line-height: 1;
        &:hover {
          background-color: var(--orange-900);
          color: #fff;
        }
      }
    }
  }
}
</style>
