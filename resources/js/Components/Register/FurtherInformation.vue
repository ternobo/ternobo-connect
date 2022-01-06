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
							<label class="inputlabel font-12 font-demibold">{{ __.get("application.nickname") }} ({{ __.get("application.optional") }})</label>
							<input type="text" v-model="nickname" class="form-control fill-light lg-input" />
						</div>
						<tselect
							class="tselect-lg"
							labelOption="label"
							valueOption="code"
							:items="[
								{ label: __.get('application.female'), code: '1' },
								{ label: __.get('application.male'), code: '2' },
								{ label: __.get('application.other'), code: '3' },
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
			nickname: "",
			loading: false,
			agree: false,
			gender: undefined,
		};
	},
	props: ["verificationToken"],
	computed: {
		disabled() {
			return !(this.agree && Boolean(this.first_name) && Boolean(this.last_name) && Boolean(this.gender));
		},
	},
	methods: {
		savePersonal() {
			this.loading = true;
			this.$emit("next", {
				first_name: this.first_name,
				last_name: this.last_name,
				nickname: this.nickname,
				gender: this.gender["code"],
			});
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