<template>
  <b-modal v-model="showModal" hide-footer hide-header :centered="true">
    <tabs v-if="verification_step || emailphone_step" @selected="(emailphone_step = true), (verification_step = false)">
      <tab name="ایمیل" :selected="true" :icon="$root.isMobile ? undefined : 'email'">
        <div class="input-group d-flex align-items-center">
          <LoadingButton class="btn btn-dark" :loading="loading" v-if="!verification_step" @click.native="sendVcode('email')">ثبت</LoadingButton>
          <i class="material-icons-outlined text-superlight hover-danger" v-else @click="(emailphone_step = true), (verification_step = false)">edit</i>
          <input input-class="w-100" type="email" class="form-control mx-1 text-left" :readonly="verification_step" v-model="email" placeholder="example@ternobo.com" />
        </div>
      </tab>
      <tab name="شماره همراه" :icon="$root.isMobile ? undefined : 'phone'">
        <div class="input-group d-flex align-items-center">
          <LoadingButton class="btn btn-dark" :loading="loading" v-if="!verification_step" @click.native="sendVcode('phone')">ثبت</LoadingButton>
          <i class="material-icons-outlined text-superlight hover-danger" v-else @click="(emailphone_step = true), (verification_step = false)">edit</i>
          <input type="tel" class="form-control mx-1 text-left" :readonly="verification_step" v-model="phone_number" placeholder="09123456789" />
        </div>
      </tab>
    </tabs>
    <transition name="slide">
      <div v-if="verification_step">
        <div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
          <label class="w-100">کد تایید خود ‌را وارد کنید</label>
          <div class="input-group-icon">
            <otp-input input-class="w-100" class="material--sm mx-1 text-center" v-model="code" placeholder="111111" maxlength="6" />
            <i class="material-icons-outlined">verified_user</i>
          </div>
        </div>
        <LoadingButton :loading="loading" class="btn btn-dark mx-3 mt-4 w-50" @click.native="verifyCode">بعدی</LoadingButton>
      </div>
    </transition>
    <transition name="slide">
      <div v-if="personal_info_step">
        <h5 class="mb-4" style="border-bottom: 1px solid #000019; width: fit-content; align-self: center; margin-top: 20px; padding-bottom: 10px; padding-left: 0; padding-right: 0">اطلاعات تکمیلی</h5>
        <div>
          <material-text-field input-class="w-100" class="material--sm mb-3" v-model="first_name" placeholder="نام" />
          <material-text-field input-class="w-100" class="material--sm mb-3" v-model="last_name" placeholder="نام خانوادگی" />
          <material-text-field input-class="w-100" class="material--sm mb-3" v-model="username" placeholder="نام کاربری" />
          <v-select
            class="datepicker-list"
            :placeholder="'جنسیت'"
            dir="rtl"
            v-model="gender"
            :options="[
              { label: 'زن', code: '1' },
              { label: 'مرد', code: '2' },
            ]"
          >
            <template #no-options>موردی یافت نشد</template>
          </v-select>
        </div>
        <LoadingButton :loading="loading" class="btn btn-dark mx-auto mt-4 w-50" @click.native="savePersonal">بعدی</LoadingButton>
      </div>
    </transition>
    <transition name="slide">
      <div v-if="password_step">
        <h5 class="mb-4" style="border-bottom: 1px solid #000019; width: fit-content; display: flex; justify-content: center; margin-top: 20px; padding-bottom: 10px; padding-left: 0; padding-right: 0">رمزعبور</h5>
        <div class="d-flex flex-column" style="align-items: center">
          <material-text-field input-class="w-100" class="material--sm w-50 mx-1 text-right" v-model="password" type="password" placeholder="رمزعبور" />
          <material-text-field input-class="w-100" class="material--sm w-50 mx-1 text-right mt-3" v-model="password_repeat" type="password" placeholder="تکرار رمزعبور" />
        </div>
        <div class="mt-5">
          <p class="font-18">نکات امنیتی</p>
          <ul style="list-style: none" class="font-14 mt-3">
            <li>رمزعبور حداقل ۸ کاراکتر باشد</li>
            <li>بهتر است که از حروف کوچک، بزرگ و سمبل‌ها در رمزعبور خود استفاده کنید.</li>
          </ul>
        </div>
        <LoadingButton :loading="loading" class="btn btn-dark mx-auto mt-4 w-50" @click.native="savePassword">بعدی</LoadingButton>
      </div>
    </transition>
    <transition name="slide">
      <div v-if="profile_step" class="d-flex flex-column align-items-center">
        <ProfileImage @updated="updateProfile" :canChange="true" class="m-0" :src="$APP_URL + '/images/man-profile.png'"></ProfileImage>
        <div class="d-flex mt-4 flex-column">
          <span class="text-center">تصویر خود را وارد کنید</span>
          <inertia-link href="/feed" :loading="loading" class="btn btn-dark mx-auto mt-4 w-50" style="white-space: nowrap">رد شدن</inertia-link>
        </div>
      </div>
    </transition>
  </b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import LoadingButton from "../../Components/buttons/LoadingButton";
import ProfileImage from "../../Components/Profile/ProfileImage";
import { Inertia } from "@inertiajs/inertia";
import OtpInput from "../OtpInput/OtpInput.vue";

export default {
  methods: {
    updateProfile() {
      Inertia.visit("/feed");
    },
    sendVcode(type) {
      this.loading = true;
      const $this = this;
      var data = new FormData();
      if (type === "email") {
        data.append("email", this.email);
      } else {
        data.append("phone", this.phone_number);
      }

      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/verification",
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.result) {
            $this.emailphone_step = false;
            $this.verification_step = true;
          } else {
            const errors = response.data.errors;
            Object.keys(errors).forEach(function (item, index) {
              $this.$bvToast.toast(errors[item][0], {
                noCloseButton: true,
                toaster: "b-toaster-bottom-left",
                bodyClass: ["bg-dark", "text-right", "text-white"],
                solid: true,
              });
            });
          }
          $this.loading = false;
        })
        .catch(function (error) {
          $this.loading = false;
        });
    },
    verifyCode() {
      this.loading = true;
      const $this = this;
      var data = new FormData();
      data.append("code", this.code);

      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/verifycode",
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.result) {
            $this.verification_step = false;
            $this.personal_info_step = true;
          }
          $this.loading = false;
        })
        .catch(function (error) {
          $this.loading = false;
        });
    },
    savePersonal() {
      var $this = this;
      var data = new FormData();
      if (this.first_name !== undefined && this.first_name !== "") {
        data.append("firstname", this.first_name);
      }
      if (this.last_name !== undefined && this.last_name !== "") {
        data.append("lastname", this.last_name);
      }
      if (this.username !== undefined && this.username !== "") {
        data.append("username", this.username);
      }
      if (this.gender !== undefined) {
        data.append("gender", this.gender.code);
      }

      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/signup",
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.result) {
            $this.personal_info_step = false;
            $this.password_step = true;
          }
        })
        .catch(function (error) {
          $this.loading = false;
        });
    },
    savePassword() {
      var $this = this;
      var data = new FormData();
      if (this.password === this.password_repeat) {
        data.append("password", this.password);
        var config = {
          method: "post",
          url: this.$APP_URL + "/auth/setpassword",
          data: data,
        };

        axios(config)
          .then(function (response) {
            if (response.data.result) {
              $this.password_step = false;
              $this.profile_step = true;
            }
          })
          .catch(function (error) {
            $this.loading = false;
          });
      } else {
        this.$bvToast.toast("رمزعبور و تاییدیه آن برابر نیست", {
          noCloseButton: true,
          toaster: "b-toaster-bottom-left",
          bodyClass: ["bg-dark", "text-right", "text-white"],
          solid: true,
        });
      }
    },
  },
  data() {
    return {
      emailphone_step: true,
      verification_step: false,
      personal_info_step: false,
      profile_step: false,
      password_step: false,
      phone_number: undefined,
      email: undefined,
      code: undefined,
      first_name: undefined,
      last_name: undefined,
      username: undefined,
      gender: undefined,
      password: undefined,
      password_repeat: undefined,
      profile: "/images/man-profile.png",
      loading: false,
    };
  },
  mixins: [ModalMixin],
  name: "SignupModal",
  components: {
    LoadingButton,
    ProfileImage,
    OtpInput,
  },
};
</script>

<style></style>
