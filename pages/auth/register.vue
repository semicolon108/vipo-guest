<template>
  <section>
    <div class="container">
      <div class="register-form">
        <div class="form-header">
          <h1>ຝາກປະຫວັດ</h1>
          <h3>ຝາກປະຫວັດເພື່ອໃຫ້ສະດວກ ແລະ ວ່ອງໄວໃນການສະໝັກວຽກ</h3>
        </div>
        <div class="form-body">
          <div class="card">
            <div class="card-header">
              <h1>ຂໍ້ມູນສ່ວນໂຕ</h1>
            </div>
            <div class="field">
              <div class="field">
                <label for="">ຮູບຂອງເຈົ້າ</label>
                <div class="control">
                  <label for="image" class="image-upload">
                    <!-- <img
                  src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  /> -->
                    <i class="fa-solid fa-camera"></i>
                    <input type="file" id="image" />
                  </label>
                  <small class="image-size">ຮູບຕ້ອງມີຂະໜາດບໍ່ເກີນ 10MB</small>
                </div>
              </div>
              <label>ເພດ</label>
              <div class="control options">
                <p class="checked">ຊາຍ</p>
                <p>ຍິງ</p>
              </div>
            </div>
            <div class="field">
              <label>ຊື່</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ຂອງເຈົ້າ"
                required
              />
            </div>
            <div class="field">
              <label>ນາມສະກຸນ</label>
              <input
                type="text"
                class="input"
                placeholder="ນາມສະກຸນ"
                required
              />
            </div>
            <div class="field">
              <label>ວັນເດືອນປີເກີດ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ວັນທີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">2023</option>
                    <option value="">2024</option>
                    <option value="">2025</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ສະຖານະແຕ່ງງານ</label>
              <div class="control options">
                <p class="checked">ໂສດ</p>
                <p>ແຕ່ງານ</p>
              </div>
            </div>
            <div class="field">
              <label>ແຂວງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" selected disabled>ເລືອກແຂວງ</option>
                    <option value="">ນະຄອນຫຼວງ</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ເມືອງຢູ່ປະຈຸບັນ</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" selected disabled>ເລືອກເມືອງ</option>
                    <option value="">ເມືອງສີສັດຕະນາກ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ການສຶກສາ</h1>
            </div>
            <div class="field">
              <label>ວິຊາທີ່ຮຽນ</label>
              <input
                type="text"
                class="input"
                placeholder="ການເງິນ ການບັນຊີ"
                required
              />
            </div>
            <div class="field">
              <label>ສະຖາບັນການສຶກສາ</label>
              <input
                type="text"
                class="input"
                placeholder="ໂຮງຮຽນ / ວິທະຍາໄລ"
                required
              />
            </div>
            <div class="field">
              <label>ລະດັບການສຶກສາ</label>
              <div class="control">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" selected disabled>ລະດັບການສຶກສາ</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label>ເລີ່ມສຶກສາຕັ້ງແຕ່</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="has-checkbox">
                ຈົນເຖິງ
                <!-- if true add class checked -->
                <small class="">ຍັງເປັນນັກຮຽນຢູ່</small>
              </label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ໄຟສຊີວະປະຫວັດ (ຊີວີ້)</h1>
              <div class="field">
                <div class="control">
                  <label for="cv-file" class="file-upload">
                    <i class="fa-regular fa-arrow-up-from-bracket"></i>
                    <p>ກະລຸນາເລືອກໄຟສ</p>
                    <small
                      >Supported file format PDF, Word, JPG that has less than
                      5MB size.</small
                    >
                    <input type="file" id="cv-file" />
                  </label>
                </div>
                <div class="uploaded-file">
                  <p><i class="fa-regular fa-file-pdf"></i>Filename</p>
                  <i class="fa-regular fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ປະຫວັດການເຮັດວຽກ</h1>
            </div>
            <div class="field">
              <label>ນາຍຈ້າງ / ບໍລິສັດ / ອົງກອນ</label>
              <input
                type="text"
                class="input"
                placeholder="ຊື່ບໍລິສັດ"
                required
              />
            </div>
            <div class="field">
              <label>ຕຳແໜ່ງງານ</label>
              <input
                type="text"
                class="input"
                placeholder="ຕຳແໜ່ງງານ"
                required
              />
            </div>
            <div class="field">
              <label>ເລີ່ມເຮັດວຽກ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="has-checkbox">
                ຈົນເຖິງ
                <!-- if true add class checked -->
                <small class="">ນີ້ແມ່ນວຽກປະຈຸບັນຂອງຂ້ອຍ</small>
              </label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເດືອນ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ປີ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label for="">ໜ້າທີ່ຮັບຜິດຊອບ</label>
              <div class="control">
                <textarea name="" id="" rows="5" required></textarea>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະດ້ານ ພາສາ</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div class="selects">
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ເລືອກພາສາ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ລະດັບ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
              <button class="button add-button small light-orange">
                ເພີ່ມ
              </button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h1>ທັກສະອື່ນໆ (ຖ້າມີ)</h1>
            </div>
            <div class="field">
              <label>ພາສາ</label>
              <div class="selects">
                <input type="text" class="input" required placeholder="ທັກສະ" />
                <div class="select">
                  <select name="" id="" required>
                    <option value="" disabled selected>ລະດັບ</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
              <button class="button add-button small light-orange">
                ເພີ່ມ
              </button>
            </div>
          </div>
          <button class="button submit-button orange">ບັນທຶກຂໍ້ມູນ</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
section {
  background-color: var(--black-200);
}
.register-form {
  max-width: 500px;
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
        h1 {
          font-weight: 700;
          font-size: var(--lg-font);
          margin-bottom: 1rem;
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
        }
        input,
        select {
          background-color: var(--black-200);
        }
      }
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
.selects {
  display: flex;
  gap: 1rem;
}
label.has-checkbox {
  display: flex !important;
  align-items: flex-end;
  small {
    font-size: var(--sm-font);
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    user-select: none;
    &:hover,
    &.checked {
      color: var(--orange-900);
      &::before {
        background-color: var(--orange-900);
        border-radius: 9999px;
        box-shadow: 0 0 6px 1px var(--orange-900);
      }
    }
    &::before {
      margin-top: 0.15rem;
      transition: all ease-in-out 0.15s;
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 3px;
      background-color: var(--black-300);
    }
  }
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
  p {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: var(--md-font);
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
