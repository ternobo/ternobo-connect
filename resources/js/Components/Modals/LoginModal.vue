<template>
  <div>
    <ResetPasswordModal :show.sync="resetpass"></ResetPasswordModal>
    <b-modal v-model="showModal" hide-footer hide-header no-stacking :centered="true">
      <div class="d-flex flex-column w-100 aling-items-center">
        <h5 class="mt-0 font-16 text-center mb-4 w-25" style="border-bottom: 1px solid #000019; width: fit-content; align-self: center; margin-top: 20px; padding-bottom: 10px; padding-left: 0; padding-right: 0">ورود</h5>
      </div>
      <form class="signup-login d-flex flex-column align-items-center justify-content-center clearfix" ref="loginForm" method="POST" action="javascript:;">
        <div class="w-100">
          <material-text-field type="text" class="material--sm w-100 bg-transparent mb-2" input-class="w-100" name="username" v-model="username" placeholder="تلفن، ایمیل یا شناسه" />
        </div>
        <div class="w-100" style="margin-top: 12px">
          <material-text-field type="password" class="material--sm w-100 bg-transparent" input-class="w-100" name="password" v-model="password" placeholder="رمزعبور" />
          <a class="text-primary float-left font-11" style="margin-top: 3px" @click="resetpass = true">فراموشی رمزعبور</a>
        </div>
        <loading-button @click.native="login" :loading="loading" class="btn btn-dark mt-2" type="button"> ورود </loading-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import ResetPasswordModal from "./ResetPasswordModal";

export default {
  data() {
    return {
      password: undefined,
      username: undefined,
      resetpass: false,
      loading: false,
    };
  },
  methods: {
    login() {
      const $this = this;
      if (this.username !== undefined && this.username !== "" && this.password !== undefined && this.password !== "") {
        this.loading = true;
        var data = new FormData();
        data.append("username", this.username);
        data.append("password", this.password);

        var config = {
          method: "post",
          url: this.$APP_URL + "/auth/login",
          data: data,
        };

        axios(config)
          .then(function (response) {
            if (response.data.result) {
              window.location = "/feed";
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
            $this.$bvToast.toast("خطا در برقراری ارتباط", {
              noCloseButton: true,
              toaster: "b-toaster-bottom-left",
              bodyClass: ["bg-dark", "text-right", "text-white"],
              solid: true,
            });
          });
      }
    },
  },

  mixins: [ModalMixin],
  components: {
    ResetPasswordModal,
  },
  name: "LoginModal",
};
</script>

<style></style>
