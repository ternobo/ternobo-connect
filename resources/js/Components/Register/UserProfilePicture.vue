<template>
	<div class="login-form">
		<div class="login-form w-100">
			<div class="login-card card w-100">
				<div class="card-body">
					<div class="d-flex align-items-center mb-7">
						<label class="font-weight-bold mb-0 font-20 text-dark">{{ __.get("register.profile-image") }}</label>
					</div>
					<div class="d-flex align-items-center justify-content-center">
						<profile-image ref="profileelem" :uploadOnCrop="false" :canChange="true" :showIcons="false" size="profile-lg" @ready="setProfile" class="mb-0 mt-0 me-6" :src="profile"></profile-image>
						<button class="btn btn-outlined btn-lg btn-rounded" @click="$refs['profileelem'].openFileSelect()">
							<i class="material-icons-outlined text-dark me-2">cloud_upload</i>
							{{ __.get("application.upload") }}
						</button>
					</div>
					<div class="login-button-container w-100 h-auto">
						<loading-button class="btn btn-lg btn-primary w-100" :loading="loading" @click="next">{{ __.get("application.next") }}</loading-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProfileImage from "../Profile/ProfileImage.vue";
export default {
	components: { ProfileImage },

	props: ["profile", "loading"],
	data() {
		return {
			data: {},
		};
	},
	methods: {
		setProfile(data) {
			this.data = {
				profile: data.file,
				sizes: data.sizes,
			};
		},
		next() {
			this.$emit("next", this.data);
		},
	},
};
</script>

<style>
</style>