<template>
  <section>
    <Loading v-if="isSubmitting" />
    <div class="container">
      <div class="register-form">
        <div class="form-header">
          <h1>ຝາກປະຫວັດ</h1>
          <h3>ຝາກປະຫວັດເພື່ອໃຫ້ສະດວກ ແລະ ວ່ອງໄວໃນການສະໝັກວຽກ</h3>
        </div>
        <form @submit.prevent class="form-body">
          <!-- Personal Information -->
          <div class="card">
            <div class="card-header">
              <h1>ຂໍ້ມູນສ່ວນໂຕ</h1>
            </div>
            <div class="field" id="profileImg">
              <label for="">ຮູບຂອງເຈົ້າ</label>
              <div class="control image-upload">
                <div @click="profileImgRef.click()">
                  <img
                    v-if="profileImgObject"
                    :src="config.public.fileTmp + '/' + profileImg"
                  />
                  <img v-else-if="profileImg" :src="profileImg" />
                  <label v-else>
                    <i class="fa-solid fa-camera"></i>
                  </label>
                </div>

                <small class="image-size">ຮູບຕ້ອງມີຂະໜາດບໍ່ເກີນ 10MB</small>
                <input
                  v-show="false"
                  ref="profileImgRef"
                  type="file"
                  id="image"
                  @change="onProfileImgChange"
                />
              </div>
              <p v-if="errors.profileImg" class="error-text">
                {{ errors.profileImg }}
              </p>
            </div>

            <div class="field" id="gender">
              <label>ເພດ</label>
              <div class="control options">
                <p
                  v-for="i in genderList"
                  @click="gender = i._id"
                  :class="{ checked: gender === i._id }"
                >
                  {{ i.name }}
                </p>
              </div>
              <p v-if="errors.gender" class="error-text">{{ errors.gender }}</p>
            </div>

            <div class="field" id="firstName">
              <label>ຊື່</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ຂອງເຈົ້າ"
                v-model="firstName"
              />
              <p v-if="errors.firstName" class="error-text">
                {{ errors.firstName }}
              </p>
            </div>

            <div class="field" id="lastName">
              <label>ນາມສະກຸນ</label>
              <input
                type="text"
                class="input"
                placeholder="ນາມສະກຸນ"
                v-model="lastName"
              />
              <p v-if="errors.lastName" class="error-text">
                {{ errors.lastName }}
              </p>
            </div>
            <div class="field" id="dateOfBirth">
              <label>ວັນເດືອນປີເກີດ</label>
              <DateInput v-model="dateOfBirth" />
              <p v-if="errors.dateOfBirth" class="error-text">
                {{ errors.dateOfBirth }}
              </p>
            </div>
            <div class="field" id="maritalStatus">
              <label>ສະຖານະແຕ່ງງານ</label>
              <div class="control options">
                <p
                  v-for="i in maritalStatusList"
                  @click="maritalStatus = i._id"
                  :class="{ checked: maritalStatus === i._id }"
                >
                  {{ i.name }}
                </p>
              </div>
              <p v-if="errors.maritalStatus" class="error-text">
                {{ errors.maritalStatus }}
              </p>
            </div>
            <div class="field" id="province">
              <label>ແຂວງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select v-model="province" name="" id="">
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option :value="i._id" v-for="i in provincesList">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.province" class="error-text">
                  {{ errors.province }}
                </p>
              </div>
            </div>
            <div class="field" id="district">
              <label>ເມືອງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select
                    v-model="district"
                    name=""
                    id=""
                    :disabled="!province"
                  >
                    <option value="" selected disabled>ເລືອກເມືອງ</option>
                    <option v-for="i in districtsList" :value="i._id">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.district" class="error-text">
                  {{ errors.district }}
                </p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h1>ປະເພດວຽກທີ່ສົນໃຈ</h1>
            </div>
            <div class="field" id="currentJobTitle">
              <label
                >ຕຳແໜ່ງງານປະຈຸບັນ ຫຼື ຕຳແໜ່ງງານທີ່ສົນໃຈ
                <!--                <span>*</span>-->
              </label>
              <input
                v-model="currentJobTitle"
                type="text"
                class="input"
                placeholder="ພະນັກງານຂາຍ"
              />
              <p class="error-text">
                {{ errors.currentJobTitle }}
              </p>
            </div>
            <div class="field" id="expectedSalary">
              <label>ເງິນເດືອນທີ່ຕ້ອງການ</label>
              <CurrencyInput v-model="expectedSalary" />
              <!--              <input v-model="expectedSalary" type="text" class="input" placeholder="3.000.000" />-->
              <p class="error-text">
                {{ errors.expectedSalary }}
              </p>
            </div>
            <div class="field" id="provinceId">
              <label>ຢາກເຮັດວຽກຢູ່ແຂວງໃດ</label>

              <div class="control">
                <div class="select">
                  <select v-model="provinceId" name="" id="">
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option :value="i._id" v-for="i in provincesList">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.provinceId" class="error-text">
                  {{ errors.provinceId }}
                </p>
              </div>
            </div>
            <div class="field" id="industryId">
              <label>ຢາກເຮັດວຽກກັບທຸລະກິດປະເພດໃດ</label>

              <div class="control">
                <div class="select">
                  <select v-model="industryId" name="" id="">
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option :value="i._id" v-for="i in industryList">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <p v-if="errors.industryId" class="error-text">
                  {{ errors.industryId }}
                </p>
              </div>
            </div>
          </div>

          <!-- Eudcation -->
          <div class="card" >
            <div class="card-header">
              <h1>ການສຶກສາ</h1>
            </div>
           <div v-for="(i, idx) in educations as any" :key="i.key" >
             <div class="list" v-show="educations.length > 1">
               <ul>

                 <li v-if="educationLevelList.length && i.value.degree">{{educationLevelList.find((j: any) => j._id === i.value.degree)?.name}} - {{i.value.major}}</li>
                 <li>{{i.value.university}}</li>
                 <li><span>{{ formatMonthAndYear(i.value.startDate) }}</span> - <span>{{ formatMonthAndYear(i.value.endDate) }}</span></li>
               </ul>
               <div class="actions">
                 <a  @click="selectedEduIdx = idx" class="edit"><i class="fa-solid fa-pen"></i></a>
               </div>

               <ErrorMessage
                   class="error-text"
                   :name="`educations[${idx}]`"
               />
             </div>


             <div :class="{'modal-form': educations.length>1}" v-show="selectedEduIdx === idx || educations.length === 1">
               <div class="modal-form-area">
                 <div class="form-content">
                   <div class="field" :id="`educations[${idx}].major`">
                     <label>ວິຊາທີ່ຮຽນ</label>
                     <Field
                         :name="`educations[${idx}].major`"
                         as="input"
                         type="text"
                         placeholder="ການເງິນ ການບັນຊີ"
                     />
                     <ErrorMessage
                         class="error-text"
                         :name="`educations[${idx}].major`"
                     />
                   </div>
                   <div class="field" :id="`educations[${idx}].university`">
                     <label>ສະຖາບັນການສຶກສາ</label>
                     <Field
                         :name="`educations[${idx}].university`"
                         as="input"
                         type="text"
                         placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
                     />
                     <ErrorMessage
                         class="error-text"
                         :name="`educations[${idx}].university`"
                     />
                   </div>
                   <div class="field"  :id="`educations[${idx}].degree`">
                     <label>ລະດັບການສຶກສາ</label>
                     <div class="control">
                       <div class="select">
                         <select v-model="i.value.degree">
                           <option
                               v-for="o in educationLevelList"
                               :value="o._id"
                           >
                             {{ o.name }}
                           </option>
                         </select>
                       </div>

                       <div v-show="false">
                         <Field
                             :name="`educations[${idx}].degree`"
                             as="input"
                             type="text"
                             placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
                         />
                       </div>
                       <ErrorMessage
                           class="error-text"
                           :name="`educations[${idx}].degree`"
                       />
                     </div>
                   </div>
                   <div
                       class="field"
                       v-if="!isLoading"
                       :id="`educations[${idx}].startDate`"

                   >
                     <label>ເລີ່ມສຶກສາຕັ້ງແຕ່</label>
                     <div class="selects">
                       <DateInput
                           v-model="i.value.startDate"
                           style="width: 100%"
                           :is-only-month-and-year="true"
                       />
                     </div>

                     <div v-show="false">
                       <Field
                           :name="`educations[${idx}].startDate`"
                           as="input"
                           type="text"
                       />
                     </div>
                     <ErrorMessage
                         class="error-text"
                         :name="`educations[${idx}].startDate`"
                     />
                   </div>
                   <div
                       class="field"
                       :class="{ disabledzzz: i.value.isCurrentlyStudying }"
                   >
                     <label class="has-checkbox">
                       ຈົນເຖິງ
                       <!-- if true add class checked -->
                       <p
                           class="checkbox"
                           @click="
                          i.value.isCurrentlyStudying =
                            !i.value.isCurrentlyStudying
                        "
                           :class="{ checked: i.value.isCurrentlyStudying }"
                       >
                         ກຳລັງເປັນນັກສຶກຢູ່
                       </p>
                     </label>
                     <div
                         class="selects"
                         v-show="!i.value.isCurrentlyStudying"
                         :name="`educations[${idx}].endDate`"
                     >
                       <DateInput
                           v-model="i.value.endDate"
                           style="width: 100%"
                           :is-only-month-and-year="true"
                       />
                     </div>
                     <div v-show="false">
                       <Field
                           :name="`educations[${idx}].endDate`"
                           as="input"
                           type="text"
                       />
                     </div>
                     <ErrorMessage
                         class="error-text"
                         :name="`educations[${idx}].endDate`"
                     />
                   </div>
                   <div v-if="educations.length > 1" class="buttons">
                     <button
                         class="button add-button light-grey small"
                         @click="() => {
                           if(!i.value.major || !i.value.university || !i.value.degree ){
                             educationsRemove(idx);
                             selectedEduIdx = null;
                           }else {
                             selectedEduIdx = null;
                          }
                         }"
                     >
                       ຍົກເລີກ
                     </button>
                     <button
                         type="button"
                         class="button add-button small orange"
                         @click="
                         validateSingle('educations', idx)
                      "
                     >
                       ເພີ່ມ
                     </button>
                   </div>
                   <a
                       v-if="educations.length > 1"
                       @click="educationsRemove(idx); selectedEduIdx = null" class="delete">ລົບປະຫວັດນີ້</a>
                 </div>
               </div>
             </div>
           </div>
            <button
                style="margin-top: 20px"
                class="button add-button small orange"
                @click="() => {
                   educationsPush({
                     major: '',
                     university: '',
                     degree: '',
                     startDate: '',
                     endDate: '',
                     isCurrentlyStudying: false,
                   });
                   selectedEduIdx = educations.length - 1
                 }"
            >
              ເພີ່ມການສຶກສາ
            </button>
          </div>

          <!-- CV file start -->
          <div class="card">
            <div class="card-header">
              <h1>ໄຟສຊີວະປະຫວັດ (ຊີວີ້)</h1>
            </div>
            <div class="tabs">
              <ul>
                <li :class="{ checked: !useVipoCV }" @click="useVipoCV = false">
                  {{ cvFileUse[0] }}
                </li>
                <li :class="{ checked: useVipoCV }" @click="useVipoCV = true">
                  {{ cvFileUse[1] }}
                </li>
              </ul>
            </div>
            <div class="field" v-if="!useVipoCV">
              <div class="control">
                <label @click="cvFileRef.click()" class="file-upload">
                  <i class="fa-regular fa-arrow-up-from-bracket"></i>
                  <p>ກະລຸນາເລືອກໄຟສ</p>
                  <small
                    >ຮັບສະເພາະໄຟສ PDF, Word, JPG ແລະ ຂະໜາດໄຟສບໍ່ເກີນ 5MB.</small
                  >
                </label>
                <input
                  v-show="false"
                  ref="cvFileRef"
                  type="file"
                  @change="onCVFileChange"
                />
              </div>
              <div class="uploaded-file" v-if="cvFile">
                <a
                  class="file-name"
                  :href="cvFile"
                  target="_blank"
                  style="cursor: pointer"
                >
                  <i class="fa-regular fa-file-pdf"></i>
                  {{ cvFile }}
                </a>
              </div>
              <p class="error-text">{{ errors.cvFile }}</p>
            </div>
            <div v-else class="vipo-cv-generator">
              <div class="cv-box">
                <div class="guide" v-if="!vipoCVLink">
                  <p>ຕື່ມຂໍ້ມູນທັງໝົດໃຫ້ຄົບຖ້ວນ.</p>
                  <p>ກົດປຸ່ມບັນທຶກຂໍ້ມູນເພື່ອສ້າງຊີວີ້.</p>
                  <p>ລະບົບຂອງ vipo.cc ຈະທຳການສ້າງຊີວີ້ອັດຕະໂນມັດ.</p>
                  <p>ການສ້າງຊີວີ້ອາດໃຊ້ເລລາ 1 - 5 ນາທີ.</p>
                  <hr />
                </div>

                <div class="file">
                  <!-- <div class="sample-file">
                    <span></span>
                  </div> -->

                  <a
                    class="button blue"
                    v-if="vipoCVLink"
                    :href="vipoCVLink"
                    target="_blank"
                    style="color: white"
                  >
                    <i class="fa-solid fa-arrow-down-to-line"></i
                    >ດາວໂຫລດໄຟສຊີວີ້
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- CV file end -->

          <!-- Work Exp start -->
          <div class="card" :class="{ disabled: isHaveNoExp }">
            <div class="card-header">
              <h1>ປະຫວັດການເຮັດວຽກ</h1>
              <p
                  class="checkbox"
                  @click="isHaveNoExp = !isHaveNoExp"
                  :class="{ checked: isHaveNoExp }"
              >
                ຂ້ອຍຍັງບໍ່ເຄີຍເຮັດວຽກ
              </p>
            </div>

            <div v-for="(item, idx) in workHistories as any" :key="item.key">
              <div class="list">
                <ul>
                  <li><strong>ບໍລິສັດ:</strong> {{ item.value.company }}</li>
                  <li><strong>ຕຳແໜ່ງ:</strong> {{ item.value.position }}</li>
                  <li>
                    <strong>ເລີ່ມງານ:</strong> {{ formatMonthAndYear(item.value.startDate) }}
                    -
                    <span v-if="item.value.isCurrentlyWorking">ປັດຈຸບັນ</span>
                    <span v-else>{{ formatMonthAndYear(item.value.endDate) }}</span>
                  </li>
                </ul>
                <div class="actions">
                  <a @click="selectedWorkIdx = idx" class="edit"><i class="fa-solid fa-pen"></i></a>
                </div>
                <ErrorMessage class="error-text" :name="`workHistories[${idx}]`" />
              </div>

              <button
                  v-if="idx === workHistories.length - 1"
                  class="button add-button small orange"
                  type="button"
                  @click="() => {
        workHistoriesPush({
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          isCurrentlyWorking: false,
          detail: '',
        });
        selectedWorkIdx = workHistories.length - 1;
      }"
              >
                ເພີ່ມປະຫວັດການເຮັດວຽກ
              </button>

              <div class="modal-form" v-show="selectedWorkIdx === idx">
                <div class="modal-form-area">
                  <div class="form-content">
                    <div class="field" :id="`workHistories[${idx}].company`">
                      <label>ນາຍຈ້າງ / ບໍລິສັດ / ອົງກອນ</label>
                      <Field
                          :name="`workHistories[${idx}].company`"
                          as="input"
                          type="text"
                          placeholder="ຊື່ບໍລິສັດ"
                      />
                      <ErrorMessage class="error-text" :name="`workHistories[${idx}].company`" />
                    </div>

                    <div class="field" :id="`workHistories[${idx}].position`">
                      <label>ຕຳແໜ່ງງານ</label>
                      <Field
                          :name="`workHistories[${idx}].position`"
                          as="input"
                          type="text"
                          placeholder="ຕຳແໜ່ງງານ"
                      />
                      <ErrorMessage class="error-text" :name="`workHistories[${idx}].position`" />
                    </div>

                    <div class="field" :id="`workHistories[${idx}].startDate`">
                      <label>ເລີ່ມເຮັດວຽກ</label>
                      <DateInput
                          v-model="item.value.startDate"
                          style="width: 100%"
                          :is-only-month-and-year="true"
                      />
                      <ErrorMessage class="error-text" :name="`workHistories[${idx}].startDate`" />
                    </div>

                    <div class="field" :class="{ disabledzzz: item.value.isCurrentlyWorking }">
                      <label class="has-checkbox">
                        ຈົນເຖິງ
                        <p
                            class="checkbox"
                            @click="item.value.isCurrentlyWorking = !item.value.isCurrentlyWorking"
                            :class="{ checked: item.value.isCurrentlyWorking }"
                        >
                          ນີ້ແມ່ນວຽກປັດຈຸບັນ
                        </p>
                      </label>
                      <div class="selects" v-show="!item.value.isCurrentlyWorking">
                        <DateInput
                            v-model="item.value.endDate"
                            style="width: 100%"
                            :is-only-month-and-year="true"
                        />
                      </div>
                      <ErrorMessage class="error-text" :name="`workHistories[${idx}].endDate`" />
                    </div>

                    <div class="field" :id="`workHistories[${idx}].detail`">
                      <label>ໜ້າທີ່ຮັບຜິດຊອບ</label>
                      <ClientOnly>
                        <TextEditor v-model="item.value.detail" @keydown.enter.prevent />
                      </ClientOnly>
                      <ErrorMessage class="error-text" :name="`workHistories[${idx}].detail`" />
                    </div>

                    <div class="buttons">
                      <button
                          class="button add-button light-grey small"
                          @click="() => {
                // if (!item.value.company) {
                //   workHistoriesRemove(idx);
                //   selectedWorkIdx = null;
                // } else {
                  selectedWorkIdx = null;
               // }
              }"
                      >
                        ຍົກເລີກ
                      </button>

                      <button
                          type="button"
                          class="button add-button small orange"
                          @click="validateSingle('workHistories', idx)"
                      >
                        ເພີ່ມ
                      </button>
                    </div>

                    <a
                        v-if="workHistories.length > 1"
                        @click="workHistoriesRemove(idx); selectedWorkIdx = null"
                        class="delete"
                    >
                      ລົບປະຫວັດນີ້
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Work Exp End -->

          <div class="card">
            <div class="card-header">
              <h1>ທັກສະດ້ານ ພາສາ</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div
                class="selects-container"
                v-for="(i, idx) in languages as any"
                :key="i.key"
              >
                <div class="selects">
                  <div class="select">
                    <select name="" id="" v-model="i.value.language">
                      <option value="" disabled selected>ເລືອກພາສາ</option>
                      <option :value="i._id" v-for="i in languagesList as any">
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div class="select">
                    <select name="" id="" v-model="i.value.level">
                      <option value="" disabled selected>ລະດັບ</option>
                      <option
                        :value="i._id"
                        v-for="i in languageLevelsList as any"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>

                  <a class="delete-button" @click="languagesRemove(idx)">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
                <div v-if="hasSubmitted">
                  <ErrorMessage
                    class="error-text"
                    :name="`languages[${idx}].language`"
                  />
                  <ErrorMessage
                    class="error-text"
                    :name="`languages[${idx}].level`"
                  />
                </div>
              </div>

              <button
                type="button"
                class="button add-button small orange"
                @click="languagesPush({ language: '', level: '' })"
              >
                ເພີ່ມ
              </button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະອື່ນໆ (ຖ້າມີ)</h1>
            </div>
            <div class="field">
              <label>ທັກສະ</label>
              <div
                class="selects-container"
                v-for="(i, idx) in otherSkills as any"
                :key="i.key"
              >
                <div class="selects">
                  <SkillInput v-model="i.value.skill" />
                  <!--                  <input type="text" class="input"  placeholder="ທັກສະ" />-->
                  <div class="select">
                    <select name="" id="" v-model="i.value.level">
                      <option value="" disabled selected>ລະດັບ</option>
                      <option :value="i._id" v-for="i in skillLevels as any">
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <a @click="otherSkillsRemove(idx)">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
                <div v-if="hasSubmitted">
                  <ErrorMessage
                    class="error-text"
                    :name="`otherSkills[${idx}].skill`"
                  />
                  <ErrorMessage
                    class="error-text"
                    :name="`otherSkills[${idx}].level`"
                  />
                </div>
              </div>
              <button
                type="button"
                @click="otherSkillsPush({ skill: '', level: '' })"
                class="button add-button small orange"
              >
                ເພີ່ມ
              </button>
            </div>
          </div>
          <button
            @click="onSubmitBeforeValidate"
            v-if="!isSubmitting"
            class="button submit-button orange"
          >
            ບັນທຶກຂໍ້ມູນ
          </button>
          <button v-else disabled class="button submit-button orange">
            <i class="fas fa-spinner fa-spin fa-4x"></i>
            Loading...
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {formatDefaultDate, formatMonthAndYear} from "../../utils/formatter";

definePageMeta({
  ssr: false,
});

import { ref } from "vue";
import { useForm, useFieldArray, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import DateInput from "@/components/DateInput.vue";
import dayjs from "dayjs";

import SkillInput from "@/components/SkillInput.vue";
import Loading from "@/components/Loading.vue";

import CurrencyInput from "@/components/CurrencyInput.vue";

// Default to top is instant
const { scrollToAnchor } = useAnchorScroll();

const tabName = ref("ຂ້ອຍມີຊີວີ້");
const cvFileUse = ref<any>(["ຂ້ອຍມີຊີວີ້", "ໃຫ້ VIPO ສ້າງຊີວີ້ໃຫ້"]);

const { showToast } = useToast();

// Tonh Edit Education and Work Exp
const showEducationForm = ref(false);
const selectedEduIdx = ref<any>(null);
const selectedWorkIdx = ref<any>(null);

const { isAuth, user } = useAuth();
const { $apiFetch } = useNuxtApp();

const config = useRuntimeConfig();

const profileImgRef = ref();
const isHaveNoExp = ref(false);

const useVipoCV = ref(false);
const vipoCVLink = ref("");

const cvFileRef = ref();
const profileImgObject = ref<any>(null);
const cvFileObject = ref<any>(null);

const backupWorkingHistories = ref<any>({});

const { errors, defineField, setFieldValue, handleSubmit, resetForm , validate} = useForm(
  {
    validationSchema: yup.object({
      profileImg: yup.string().required("This field is required"),
      gender: yup.string().required("This field is required"),
      firstName: yup.string().required("This field is required"),
      lastName: yup.string().required("This field is required"),
      dateOfBirth: yup.string().required("This field is required"),
      maritalStatus: yup.string().required("This field is required"),
      province: yup.string().required("This field is required"),
      district: yup.string().required("This field is required"),

      cvFile: yup.string(),

      educations: yup
        .array()
        .of(
          yup.object().shape({
            major: yup.string().required("This field is required"),
            university: yup.string().required("This field is required"),
            degree: yup.string().required("This field is required"),
            //    startDate: yup.string().required("This field is required"),
            // endDate: yup.date().required('This field is required'),
            isCurrentlyStudying: yup
              .boolean()
              .required("This field is required"),
          })
        )
        .min(1, "At least one education entry is required"),
      //
      workHistories: yup
        .array()
        .of(
          yup.object().shape({
            company: yup.string().required("This field is required"),
            position: yup.string().required("This field is required"),
            //   startDate: yup.string().required("This field is required"),
            // endDate: yup.date().required('This field is required'),
            detail: yup.string().required("This field is required"),
            isCurrentlyWorking: yup
              .boolean()
              .required("This field is required"),
          })
        )
        .notRequired(),
      languages: yup.array().of(
        yup.object().shape({
          language: yup.string().required("This field is required"),
          level: yup.string().required("This field is required"),
        })
      ),
      otherSkills: yup.array().of(
        yup.object().shape({
          skill: yup.string().required("This field is required"),
          level: yup.string().required("This field is required"),
        })
      ),

      currentJobTitle: yup.string().required("This field is required"),
      expectedSalary: yup.string().required("This field is required"),
      // industryId: yup.string().required("This field is required"),
      // provinceId: yup.string().required("This field is required"),
    }),
  }
);

const [profileImg] = defineField("profileImg");
const [gender] = defineField("gender");
const [firstName] = defineField("firstName");
const [lastName] = defineField("lastName");
const [dateOfBirth] = defineField("dateOfBirth");
const [maritalStatus] = defineField("maritalStatus");
const [province] = defineField("province");
const [district] = defineField("district");

const [cvFile] = defineField("cvFile");
const [currentJobTitle] = defineField("currentJobTitle");
const [expectedSalary] = defineField("expectedSalary");
const [industryId] = defineField("industryId");
const [provinceId] = defineField("provinceId");

const {
  fields: educations,
  push: educationsPush,
  remove: educationsRemove,
} = useFieldArray("educations");
const {
  fields: workHistories,
  push: workHistoriesPush,
  remove: workHistoriesRemove,
} = useFieldArray("workHistories");
const {
  fields: languages,
  push: languagesPush,
  remove: languagesRemove,
} = useFieldArray("languages");
const {
  fields: otherSkills,
  push: otherSkillsPush,
  remove: otherSkillsRemove,
} = useFieldArray("otherSkills");

const provincesList = ref<any>([]);

const districtsList = ref<any>([]);

const genderList = ref<any>([]);
const maritalStatusList = ref<any>([]);
const educationLevelList = ref<any>([]);

const languagesList = ref([]);
const languageLevelsList = ref([]);
const industryList = ref<any>([]);

const skills = ref([]);
const skillLevels = ref([]);

const isSubmitting = ref(false);
const hasSubmitted = ref(false);



const validateSingle = async (fieldName: string, index: number) => {
  const singlePath = `fieldName[${index}]`;
  const vld: any = validate
  const { valid, errors: fieldErrors } = await vld({ mode: 'field', field: singlePath });
  if (valid) {
    if(fieldName === 'educations') {
      selectedEduIdx.value = null
    }else if (fieldName === 'workHistories') {
      selectedWorkIdx.value = null
    }
  }
};

const onSubmitBeforeValidate = async () => {
  hasSubmitted.value = true;

  setTimeout(() => {
    hasSubmitted.value = false;
  }, 5000);

  let idx = 0;
  for (let i in errors.value) {
    if (idx > 0) break;
    console.log(i);
    scrollToAnchor(i);
    idx++;
  }

  await onSubmit();
};



const onSubmit = handleSubmit(async (values) => {
  const object = values;

  const form: any = {
    noExperience: isHaveNoExp.value,
    vipoCVStatus: useVipoCV.value,
    profile: {
      firstName: object.firstName,
      lastName: object.lastName,
      dateOfBirth: object.dateOfBirth,
      genderId: object.gender,
      maritalStatusId: object.maritalStatus,
      districtId: object.district,
    },
    educations: object.educations.map((i: any) => ({
      subject: i.major,
      school: i.university,
      qualifications: i.degree,
      startYear: i.startDate,
      endYear: i.endDate,
      currentlyStudying: i.isCurrentlyStudying,
    })),
    workHistories: object.workHistories.map((i: any) => ({
      company: i.company,
      position: i.position,
      startYear: i.startDate,
      endYear: i.endDate,
      isCurrentJob: i.isCurrentlyWorking,
      responsibility: i.detail,
    })),
    language:
      object.languages && object.languages.length
        ? object.languages.map((i: any) => ({
            LanguageId: i.language,
            LanguageLevelId: i.level,
          }))
        : [],
    skill:
      object.otherSkills && object.otherSkills.length
        ? object.otherSkills.map((i: any) => ({
            keySkill: i.skill,
            skillLevelId: i.level,
          }))
        : [],

    workPreference: {
      currentJobTitle: object.currentJobTitle,
      currency: "₭",
      expectedSalary: object.expectedSalary,
      industryId: object.industryId,
      provinceId: object.provinceId,
    },
  };

  if (profileImgObject.value) {
    form.profile.file = profileImgObject.value;
  }

  if (cvFileObject.value) {
    form.cv = cvFileObject.value;
  }

  isSubmitting.value = true;

  const { data }: any = await useAsyncData("updateSeekerInfo", () =>
    $apiFetch("/update-seeker-info-vipo", {
      method: "POST",
      body: form,
    })
  );

  if (data.value) {
    isSubmitting.value = false;
    showToast("ປະຫວັດຂອງທ່ານອັບເດດສຳເລັດແລ້ວ", "ສຳເລັດ");
    window.location.reload();
  }
});

const onProfileImgChange = async ($event: any) => {
  const file = $event.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const { data }: any = await useAsyncData("uploadImg", () =>
    $apiFetch("/upload-image", {
      method: "POST",
      body: formData,
    })
  );

  if (data.value) {
    profileImg.value = data.value.file.name;
    profileImgObject.value = data.value.file;
    profileImgRef.value.value = "";
  }
};

const onCVFileChange = async ($event: any) => {
  const file = $event.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const { data }: any = await useAsyncData("uploadResume", () =>
    $apiFetch("/upload-resume", {
      method: "POST",
      body: formData,
    })
  );

  if (data.value) {
    cvFile.value = data.value.myFile.name;
    cvFileObject.value = data.value.myFile;
    cvFileRef.value.value = "";
  }
};

const getProvinces = async () => {
  try {
    const { data }: any = await useAsyncData("provinces", () =>
      $apiFetch("/get-province-vipo", {
        query: { lang: "LA" },
      })
    );
    provincesList.value = data.value.provinces;
  } catch (e) {
    console.log(e);
  }
};

const getReuse = async (type: string) => {
  try {
    const { data }: any = await useAsyncData("reuse" + type, () =>
      $apiFetch("/get-reuse-vipo", {
        query: { lang: "LA", type },
      })
    );

    const list = data.value.info;
    switch (type) {
      case "Gender":
        genderList.value = list;
        break;
      case "MaritalStatus":
        maritalStatusList.value = list;
        break;
      case "Degree":
        educationLevelList.value = list;
        break;
      case "Language":
        languagesList.value = list;
        break;
      case "LanguageLevel":
        languageLevelsList.value = list;
        break;
      case "SkillLevel":
        skillLevels.value = list;
        break;
      case "Industry":
        industryList.value = list;
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

watch(
  () => province.value,
  () => {
    if (province.value) {
      const provinceIdx = provincesList.value.findIndex(
        (i: any) => i._id === province.value
      );
      districtsList.value = provincesList.value[provinceIdx].districts;
      district.value = districtsList.value[0]._id;
    }
  },
  { immediate: true }
);

watch(
  () => isHaveNoExp.value,
  () => {
    if (isHaveNoExp.value) {
      if (workHistories.value.length) {
        backupWorkingHistories.value = workHistories.value[0].value;
      }

      setTimeout(() => {
        workHistoriesRemove(0);
      }, 100);
    } else {
      if (backupWorkingHistories.value) {
        workHistoriesPush(backupWorkingHistories.value);
      } else {
        workHistoriesPush({
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          isCurrentlyWorking: false,
        });
      }
    }
  }
);

const getKeySkills = async () => {
  const { data }: any = await useAsyncData("getKeySkills", () =>
    $apiFetch("/get-keyskills-job-seeker-vipo", {
      query: { lang: "LA", page: 1, perPage: 10000, search: "" },
    })
  );

  skills.value = data.value.getKeySkill;
};

const isLoading = ref(true);

const addArray = () => {};

//Type not matching in model: Country,State,SkillLevel,KeySkills,CurrentResidence,Nationality,BannerType,BlogType,Degree,CompanySize,Gender,Industry,JobEducationLevel,JobExperience,JobFunction,JobZone,Language,LanguageLevel,MaritalStatus,Province,Tag,SalaryRange,District,JobTag,SkillTag,AdditionalTag,JobLevel

await getProvinces();
getReuse("Gender");
getReuse("MaritalStatus");
getReuse("Degree");
getReuse("Language");
getReuse("LanguageLevel");
getReuse("SkillLevel");
getReuse("Industry");
getKeySkills();

onMounted(async () => {
  setTimeout(() => {
    educationsPush({
      major: "",
      university: "",
      degree: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
    });

    workHistoriesPush({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
    });

    languagesPush({
      language: "",
      level: "",
    });

    otherSkillsPush({
      skill: "",
      level: "",
    });
  }, 1000);

  if (!isAuth.value) {
    alert("Please login first");
    navigateTo("/auth/login");
  } else {
    setTimeout(() => {
      //   console.log(user.value)

      console.log(user.value);
      useVipoCV.value = user.value.vipoCVStatus;
      if (user.value.vipoCV && user.value.vipoCV.src) {
        vipoCVLink.value = user.value.vipoCV ? user.value.vipoCV.src : "";
      }

      if (user.value.cv && user.value.cv.src) {
        cvFile.value = user.value.cv.src;
      }

      if (user.value.profile) {
        profileImg.value = user.value.profile.file
          ? user.value.profile.file.src
          : "";
        gender.value = user.value.profile.genderId
          ? user.value.profile.genderId._id
          : "";
        firstName.value = user.value.profile.firstName
          ? user.value.profile.firstName
          : "";
        lastName.value = user.value.profile.lastName
          ? user.value.profile.lastName
          : "";
        dateOfBirth.value = user.value.profile.dateOfBirth
          ? user.value.profile.dateOfBirth
          : "";
        maritalStatus.value = user.value.profile.maritalStatusId
          ? user.value.profile.maritalStatusId._id
          : "";
        province.value = user.value.profile.districtId
          ? user.value.profile.districtId.provinceId._id
          : "";
        setTimeout(() => {
          district.value = user.value.profile.districtId
            ? user.value.profile.districtId._id
            : "";
        });
      }

      if (user.value.workPreferences) {
        currentJobTitle.value = user.value.workPreferences.currentJobTitle;
        expectedSalary.value = user.value.workPreferences.salary;
        provinceId.value = user.value.workPreferences.workLocation[0]._id;
        industryId.value = user.value.workPreferences.industryId[0]._id;
      }

      // workPreference: {
      //   currentJobTitle: object.currentJobTitle,
      //       currency: "₭",
      //       expectedSalary: object.expectedSalary,
      //       industryId: object.industryId,
      //       provinceId: object.provinceId,
      // }

      if (user.value.education && user.value.education.length) {
        // const i = user.value.education[user.value.education.length - 1];
        // educationsRemove(0);
        // educationsPush({
        //   _id: i._id,
        //   major: i.subject,
        //   university: i.school,
        //   degree: i.qualifications ? i.qualifications._id : "",
        //   startDate: i.startYear,
        //   endDate: i.endYear,
        //   isCurrentlyStudying: i.currentlyStudying,
        // });

        educationsRemove(0);
        for (let i = 0; i < user.value.education.length; i++) {
          educationsPush({
            _id: user.value.education[i]._id,
            major: user.value.education[i].subject,
            university: user.value.education[i].school,
            degree: user.value.education[i].qualifications
              ? user.value.education[i].qualifications._id
              : "",
            startDate: user.value.education[i].startYear,
            endDate: user.value.education[i].endYear,
            isCurrentlyStudying: user.value.education[i].currentlyStudying,
          });
        }
      }

      if (user.value.noExperience) {
        isHaveNoExp.value = true;
        workHistoriesRemove(0);
      } else if (user.value.workHistory && user.value.workHistory.length) {
        // const i = user.value.workHistory[user.value.workHistory.length - 1];
        // workHistoriesRemove(0);
        // workHistoriesPush({
        //   _id: i._id,
        //   company: i.company,
        //   position: i.position,
        //   startDate: i.startYear,
        //   endDate: i.endYear,
        //   isCurrentlyWorking: i.isCurrentJob,
        //   detail: i.responsibility,
        // });

        workHistoriesRemove(0);

        for (let i = 0; i < user.value.workHistory.length; i++) {
          workHistoriesPush({
            _id: user.value.workHistory[i]._id,
            company: user.value.workHistory[i].company,
            position: user.value.workHistory[i].position,
            startDate: user.value.workHistory[i].startYear,
            endDate: user.value.workHistory[i].endYear,
            isCurrentlyWorking: user.value.workHistory[i].isCurrentJob,
            detail: user.value.workHistory[i].responsibility,
          });
        }
      }

      if (user.value.languageSkill && user.value.languageSkill.length) {
        languagesRemove(0);
        const list = user.value.languageSkill.map((i: any) => ({
          _id: i._id,
          language: i.LanguageId._id,
          level: i.LanguageLevelId._id,
        }));

        for (let i = 0; i < list.length; i++) {
          languagesPush(list[i]);
        }
      }

      if (user.value.skills && user.value.skills.length) {
        otherSkillsRemove(0);
        const list = user.value.skills.map((i: any) => ({
          _id: i._id,
          skill: i.keySkillId.name,
          level: i.skillLevelId._id,
        }));

        for (let i = 0; i < list.length; i++) {
          otherSkillsPush(list[i]);
        }
      }
    }, 1500);

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  }
});

</script>

<style scoped lang="scss">
section {
  background-color: var(--black-200);
}
.register-form {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  .form-header {
    text-align: center;
    h1 {
      font-size: var(--xlg-font);
      font-weight: 700;
    }
    h3 {
      font-weight: 500;
      font-size: var(--lg-font);
    }
  } // form-header
  .form-body {
    margin-top: 1rem;
    .card {
      border: 1px solid var(--black-300);
      padding: 1.5rem;
      border-radius: 16px;
      background-color: #fff;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .card-header {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        h1 {
          font-weight: 700;
          font-size: var(--lg-font);
          // color: var(--orange-900);
        }
      }
      .field {
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.35rem;
          font-weight: 600;
          font-size: var(--sm-font);
          span {
            color: red;
          }
        }
        input,
        select {
          background-color: var(--black-200);
        }
      }
    }
  }
}
.list {
  border: 1px solid var(--black-300);
  padding: 1rem 1.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  ul {
    li {
      font-size: var(--sm-font);
    }
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--sm-font);
      max-width: 35px;
      max-height: 35px;
      min-width: 35px;
      min-height: 35px;
      background-color: var(--black-200);
      color: var(--orange-900);
      border-radius: 6px;
      cursor: pointer;
      transition: all ease-in-out 0.15s;
      &:hover {
        background-color: var(--orange-900);
        color: #fff;
      }
    }
  }
}
.modal-form {
  overflow: auto;
  background-color: rgba(#000, 0.8);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  padding: 2rem;
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
  .modal-form-area {
    width: 100%;
    .form-content {
      background-color: #fff;
      padding: 2.5rem 1.5rem;
      width: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      border-radius: 6px;
      margin-left: auto;
      margin-right: auto;
      flex-grow: 1;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .buttons {
      justify-content: space-between;
      display: flex;
      gap: 0.5rem;
    }
    .delete {
      margin-top: 2rem;
      display: block;
      text-align: center;
      width: 100%;
      color: var(--black-800);
      cursor: pointer;
      font-size: var(--sm-font);
      user-select: none;
    }
  }
}
.disabled {
  &.card {
    background-color: var(--black-300) !important;
    .card-header {
      margin-bottom: 0 !important;
    }
  }
  input,
  select,
  textarea {
    pointer-events: none;
    user-select: none;
    background-color: var(--black-400) !important;
  }
  .checkbox {
    &:first-child {
      //pointer-events: none;
      //user-select: none;
      color: var(--black-400);
    }
  }
}
.tabs {
  margin-bottom: 0.5rem;
  ul {
    display: flex;
    gap: 0.5rem;
    li {
      background-color: var(--black-200);
      height: 2.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0 1rem;
      border-radius: 6px;
      user-select: none;
      cursor: pointer;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: var(--black-500);
      }
      &.checked {
        background-color: var(--light-blue-100);
        color: var(--deep-blue-900);
        &::before {
          background-color: var(--deep-blue-900);
          box-shadow: 0 0 6px 1px var(--deep-blue-900);
        }
      }
    }
  }
}
.cv-box {
  border: 1px solid var(--black-300);
  padding: 1rem;
  border-radius: 6px;
  .guide {
    p {
      font-size: var(--xsm-font);
      &::before {
        content: "-";
        margin-right: 0.5rem;
      }
    }
  } //guide
  hr {
    height: 1px;
    background-color: var(--black-300);
    border: none;
    margin: 1rem 0;
  }

  .file {
    display: flex;
    gap: 1rem;
    .sample-file {
      width: 100px;
      height: 120px;
      background-color: var(--black-300);
      cursor: pointer;
      border-radius: 6px;
    }
    a {
      display: block;
      margin-top: 0.5rem;
      cursor: pointer;
      color: var(--deep-blue-900);
      i {
        font-size: var(--md-font);
        margin-right: 0.25rem;
      }
    }
  }
}
.checkbox {
  font-size: var(--sm-font);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all ease-in-out 0.15s;
  &:hover {
    color: var(--orange-900);
  }
  &::before {
    content: "\f0c8";
    font-family: "Font Awesome 6 Pro" !important;
    margin-top: 0.25rem;
    font-size: var(--xsm-font);
  }
  &.checked {
    color: var(--orange-900) !important;
    &::before {
      content: "\f14a";
      font-weight: 700;
    }
  }
}
.options {
  display: flex;
  gap: 0.5rem;
  p {
    background-color: var(--black-200);
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: var(--black-500);
    }
    &.checked {
      background-color: var(--orange-100);
      color: var(--orange-900);
      &::before {
        background-color: var(--orange-900);
        box-shadow: 0 0 6px 1px var(--orange-900);
      }
    }
  }
}
.selects-container {
  margin-bottom: 0.75rem;
  .selects {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
      color: var(--orange-900);
      cursor: pointer;
    }
    .select {
      flex-grow: 1;
    }
  }
}
label.has-checkbox {
  display: flex !important;
  align-items: flex-end;
  justify-content: space-between;
  p {
    font-weight: 500;
  }
}
.error-text {
  color: var(--red-900);
  font-size: var(--xxsm-font);
  display: inline-block;
}
textarea {
  background-color: var(--black-200);
  padding: 1rem;
}
.add-button {
  margin-top: 0.5rem;
  border-radius: 6px;
  height: 2.3rem;
}
.submit-button {
  width: 100%;
}
.image-upload {
  display: inline-block;
  img {
    display: block;
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 6px;
    object-fit: cover;
    border: 2px solid var(--black-300);
  }
  label {
    background-color: var(--black-200);
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    display: flex !important;
    align-items: center;
    justify-content: center;
    margin-bottom: 0 !important;
  }

  input {
    display: none;
  }
  i {
    color: var(--black-500);
    font-size: var(--xlg-font);
  }
}

.file-upload {
  background-color: var(--black-200);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 !important;
  padding: 1.25rem 1rem;
  p {
    font-size: var(--md-font);
    color: var(--deep-blue-900);
    margin-bottom: 0.15rem;
  }
  small {
    font-size: var(--xxsm-font);
    color: var(--black-800);
  }
  input {
    display: none;
  }
  i {
    color: var(--deep-blue-900);
    font-size: var(--xlg-font);
    margin-bottom: 0.25rem;
  }
}
.image-size {
  font-size: var(--xsm-font);
  color: var(--black-800);
}
.uploaded-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--light-blue-100);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  color: var(--deep-blue-900);
  .file-name {
    font-weight: 600;
    font-size: var(--sm-font);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    i {
      margin-top: 0.15rem;
      margin-right: 0.25rem;
    }
  }
  i {
    font-size: var(--sm-font);
    cursor: pointer;
  }
}
</style>
