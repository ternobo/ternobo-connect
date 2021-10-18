<template>
	<div class="login-form">
		<div class="login-form w-100">
			<div class="login-card card w-100">
				<div class="card-body">
					<div class="d-flex align-items-center mb-7">
						<label class="font-weight-bold mb-0 font-20 text-dark">{{ __.get("application.further-information") }}</label>
					</div>
					<div>
						<div class="mb-4">
							<label class="inputlabel font-12 font-demibold">{{ __.get("validation.attributes.first-name") }}</label>
							<input type="text" v-model="first_name" class="form-control fill-light lg-input" />
						</div>
						<div class="mb-4">
							<label class="inputlabel font-12 font-demibold">{{ __.get("validation.attributes.last-name") }}</label>
							<input type="text" v-model="last_name" class="form-control fill-light lg-input" />
						</div>
						<div class="mb-7">
							<label class="inputlabel font-12 font-demibold">{{ __.get("application.username") }}</label>
							<input type="text" v-model="username" class="form-control fill-light lg-input" />
						</div>
						<tselect
							class="tselect-lg"
							labelOption="label"
							valueOption="code"
							:items="[
								{ label: __.get('application.female'), code: '1' },
								{ label: __.get('application.male'), code: '2' },
							]"
							v-model="gender"
							:dir="appDirection"
						>
							{{ __.get("application.gender") }}
						</tselect>

						<div class="mt-10">
							<checkbox v-model="agree" v-if="appDirection == 'rtl'">با <span class="clickable text-action" @click="$emit('showlaws')">دستورالعمل ترنوبو</span> موافقم</checkbox>
							<checkbox v-model="agree" v-else>I agree with <span class="clickable text-action" @click="$emit('showlaws')">Ternobo's Community Guidlines</span></checkbox>
						</div>
					</div>
					<div class="login-button-container w-100 h-auto">
						<loading-button :loading="loading" :disabled="disabled" class="btn btn-lg btn-primary w-100" @click.native="savePersonal">{{ __.get("application.next") }}</loading-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Checkbox from "../inputs/Checkbox.vue";

export default {
	components: { Checkbox },
	data() {
		return {
			first_name: "",
			last_name: "",
			username: "",
			loading: false,
			agree: false,
			gender: undefined,
		};
	},
	computed: {
		disabled() {
			return !(this.agree && Boolean(this.first_name) && Boolean(this.last_name) && Boolean(this.gender) && Boolean(this.username));
		},
	},
	methods: {
		savePersonal() {
			this.loading = true;
			var data = new FormData();
			data.append("firstname", this.first_name);
			data.append("lastname", this.last_name);
			data.append("gender", this.gender.code);
			data.append("username", this.username);

			var config = {
				method: "post",
				url: "/auth/signup",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.$emit("next", this.gender);
					} else {
						const errors = response.data.errors;
						this.handleError(errors);
					}
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.loading = false;
				})
				.then(() => (this.loading = false));
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