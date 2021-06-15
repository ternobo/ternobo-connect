<template>
	<b-modal v-model="showModal" hide-footer hide-header :centered="true">
		<div class="d-flex w-100 justify-content-center aling-items-center">
			<h5 class="mt-0 font-16 text-center mb-4 w-25" style="border-bottom: 1px solid #000019; width: fit-content; align-self: center; margin-top: 20px; padding-bottom: 10px; padding-left: 0; padding-right: 0">بازیابی رمزعبور</h5>

			<div style="position: absolute; left: 20px" @click="$emit('back')">
				<a class="text-muted hover-dark clickable">بازگشت</a>
			</div>
		</div>
		<div class="signup-login d-flex flex-column align-items-center justify-content-center clearfix" v-if="!passwordChage" ref="loginForm" action="javascript:;">
			<div class="w-100">
				<input type="text" class="form-control bg-transparent mb-2" name="username" v-model="input" placeholder="تلفن، ایمیل یا شناسه" />
			</div>
			<loading-button @click.native="sendResetCode" :loading="loading" class="btn btn-dark mt-2 w-50" type="button"> ارسال کد بازیابی </loading-button>
		</div>
		<div class="signup-login d-flex flex-column align-items-center justify-content-center clearfix" v-else>
			<MaterialTextField v-model="resetCode" class="material--sm mb-3" placeholder="کد بازیابی"></MaterialTextField>
			<MaterialTextField v-model="password" type="password" class="material--sm mb-3" placeholder="رمزعبور جدید"></MaterialTextField>
			<MaterialTextField v-model="password1" type="password" class="material--sm mb-3" placeholder="تکرار رمزعبور جدید"></MaterialTextField>

			<loading-button @click.native="changePassord" :loading="loading" class="btn btn-dark mt-2 w-50" type="button"> تغییر رمزعبور </loading-button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import MaterialTextField from "../inputs/MaterialTextField";
export default {
	data() {
		return {
			input: undefined,
			loading: false,
			passwordChage: false,
			resetCode: undefined,
			password: undefined,
			password1: undefined,
		};
	},
	methods: {
		sendResetCode() {
			this.loading = true;
			axios
				.post("rest-password", {
					input: this.input,
				})
				.then((response) => {
					const data = response.data;
					if (data !== false) {
						if (data.result) {
							this.toast(data.msg, "check", "text-success");
							this.passwordChage = true;
						} else {
							this.handleError(data.errors);
						}
					} else {
						this.toast(__.get("messages.all-inputs-required"));
					}
				})
				.then(() => (this.loading = false));
		},
	},
	components: {
		MaterialTextField,
	},
	mixins: [ModalMixin],
	name: "ResetPasswordModal",
};
</script>
