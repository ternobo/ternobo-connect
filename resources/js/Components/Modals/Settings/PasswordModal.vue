<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('settings.change-password')" body-class="modal-signup" size="sm" :centered="true">
		<div class="d-flex flex-column align-items-center">
			<div class="d-flex w-100 flex-column" style="align-items: center">
				<material-text-field class="w-100 mx-1 text-right mb-4" input-class="w-100" v-model="current_password" type="password" name="current_password" :placeholder="__.get('settings.current-password')" />

				<material-text-field class="w-100 mx-1 text-right" input-class="w-100" v-model="password" type="password" name="password" :placeholder="__.get('application.password')" />
				<password-meter class="mb-4 mt-4 w-100" :good.sync="goodPassword" :password="password"></password-meter>

				<material-password-input class="w-100 mx-1 text-right" input-class="w-100" v-model="password_repeat" type="password" name="password" :placeholder="__.get('settings.confirm-password')" />
			</div>
			<div class="mt-7">
				<p class="font-18">{{ __.get("application.security-tips") }}</p>
				<ul style="list-style: none" class="font-14 p-0">
					<li>{{ __.get("register.password-tip-1") }}</li>
					<li>{{ __.get("register.password-tip-2") }}</li>
				</ul>
			</div>
			<LoadingButton :loading="loading" class="btn btn-dark mx-auto mt-4 w-100 signup-save-btn" @click.native="savePassword">{{ __.get("application.confirm") }}</LoadingButton>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import PasswordMeter from "../../PasswordMeter.vue";
import MaterialPasswordInput from "../../inputs/MaterialPasswordInput.vue";

export default {
	methods: {
		savePassword() {
			var data = new FormData();
			if (this.goodPassword) {
				if (this.password === this.password_repeat) {
					data.append("currentpassword", this.current_password);
					data.append("password", this.password);
					var config = {
						method: "post",
						url: this.$APP_URL + "/auth/change-password",
						data: data,
					};

					axios(config)
						.then((response) => {
							if (response.data.result) {
								this.loading = false;
								this.$emit("update:show", false);
								window.location = this.$APP_URL;
							} else {
								this.toast(__.get("messages.invalid-password"));
							}
						})
						.catch((error) => {
							this.loading = false;
						});
				} else {
					this.toast(__.get("messages.confirm-password-error"));
				}
			} else {
				this.toast(__.get("messages.weak-password"));
			}
		},
	},
	props: {
		value: {
			default: null,
		},
	},
	mounted() {
		this.phone = this.value;
	},

	data() {
		return {
			loading: false,
			current_password: null,
			password: null,
			password_repeat: null,
			goodPassword: false,
		};
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		PasswordMeter,
		MaterialPasswordInput,
	},
	mixins: [ModalMixin],
	name: "PasswordModal",
};
</script>

<style>
</style>
