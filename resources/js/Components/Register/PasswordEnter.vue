<template>
	<div class="login-form">
		<div class="login-form w-100">
			<div class="login-card card w-100">
				<div class="card-body">
					<div class="d-flex align-items-center mb-7">
						<label class="font-weight-bold mb-0 font-20 text-dark">{{ __.get("application.password") }}</label>
					</div>
					<div>
						<div class="mb-4">
							<label class="inputlabel font-12 font-demibold">{{ __.get("application.username") }}</label>
							<input type="text" v-model="username" class="form-control fill-light lg-input" />
						</div>
						<div class="mb-4">
							<label class="inputlabel font-12 font-demibold">{{ __.get("application.password") }}</label>
							<input type="password" v-model="password" class="form-control fill-light lg-input" />
							<password-meter class="mt-4" :good.sync="goodPassword" :password="password" />
						</div>
						<div class="mb-4">
							<label class="inputlabel font-12 font-demibold">{{ __.get("settings.confirm-password") }}</label>
							<div class="d-flex flex-column align-items-end">
								<password-input v-model="password_repeat" class="w-100" inputClass="form-control fill-light lg-input"></password-input>
							</div>
						</div>
					</div>
					<div class="mt-10">
						<p class="font-18">{{ __.get("application.security-tips") }}</p>
						<ul style="list-style: none" class="font-14 p-0">
							<li>{{ __.get("register.password-tip-1") }}</li>
							<li>{{ __.get("register.password-tip-2") }}</li>
						</ul>
					</div>
					<div class="login-button-container w-100 h-auto">
						<loading-button :loading="loading" class="btn btn-lg btn-primary w-100" @click.native="savePassword">{{ __.get("application.next") }}</loading-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PasswordMeter from "../PasswordMeter.vue";
import PasswordInput from "../inputs/PasswordInput.vue";

export default {
	data() {
		return {
			showpassword: false,
			password: "",
			password_repeat: "",
			loading: false,

			username: "",

			goodPassword: false,
		};
	},
	components: { PasswordMeter, PasswordInput },
	methods: {
		savePassword() {
			if (this.goodPassword) {
				if (this.password === this.password_repeat) {
					this.loading = true;

					axios
						.post("/validation/username", { value: this.username })
						.then((response) => {
							if (response.data.status) {
								this.$emit("next", {
									username: this.username,
									password: this.password,
									password_confirmation: this.password_repeat,
								});
							} else {
								this.handleError(response.data.message);
							}
						})
						.catch((err) => console.log(err))
						.then(() => (this.loading = false));
				} else {
					this.toast(__.get("register.password-not-confirm-match"));
				}
			} else {
				this.toast(__.get("messages.weak-password"));
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	max-width: 480px;
}
</style>