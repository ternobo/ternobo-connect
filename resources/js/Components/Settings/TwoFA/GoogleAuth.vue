<template>
	<div class="d-flex flex-column">
		<div v-if="!verification">
			<div class="d-flex flex-column align-items-center">
				<div class="mb-4">
					<img :src="qr" style="max-width: 130px" v-if="qr != null" />
					<skeleton :height="'130px'" :width="'130px'" v-else></skeleton>
				</div>

				<p>
					{{ __.get("settings.ts-des-3") }}
				</p>
				<p>
					{{ __.get("settings.ts-des-4") }}
				</p>
				<p>
					{{ __.get("settings.ts-des-5") }}
				</p>
			</div>

			<div class="d-flex justify-content-end align-items-end">
				<button class="btn btn-primary mt-4" @click="verification = true">{{ __.get("application.next") }}</button>
			</div>
		</div>
		<verification v-else @action="verify" :loading="loading" type="app"></verification>
	</div>
</template>

<script>
import Verification from "./Verification.vue";
export default {
	watch: {
		verification(newVal) {
			this.$emit("update:verification", newVal);
		},
	},
	components: { Verification },
	created() {
		axios
			.post("/two-factor-auth/setup", {
				type: "app",
			})
			.then((response) => {
				this.qr = response.data.qr_code;
			});
	},
	methods: {
		verify(code) {
			if (code != null && code.length > 0) {
				this.loading = true;
				axios
					.post("/two-factor-auth/enable", {
						type: "app",
						code: code,
					})
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$emit("enabled", JSON.parse(data.recovery));
						} else {
							this.toast(__.get("messages.invalid-code"));
						}
						this.loading = false;
					})
					.catch((err) => (this.loading = false));
			}
		},
	},

	data() {
		return {
			loading: false,
			verification: false,
			code: "",
			qr: null,
		};
	},
};
</script>

<style></style>
