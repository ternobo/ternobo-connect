<template>
	<div class="monitization-container">
		<div class="monitization-title">
			<h1 class="font-20">{{ __.get("monitization.title") }}</h1>
			<p v-html="__.get('monitization.subtitle-text')"></p>
		</div>
		<div class="card p-6">
			<div class="monitization-card-header">
				<div class="monitization-progress">
					<i class="material-icons-outlined">savings</i>
					<b-progress animated variant="secondary" :value="status.percent"></b-progress>
				</div>
				<loading-button class="btn btn-primary text-nowrap" v-if="monitizationStatus == null || monitizationStatus == 'rejected'" @click="sendMonitizationRequest" :loading="loading" :disabled="!status.status">{{ __.get("monitization.send-request") }}</loading-button>
				<span class="btn disabled bg-warning text-warning-dark text-nowrap" v-else>{{ __.get("monitization.pending") }}</span>
			</div>
			<div class="card-body">
				<div class="monitization-criteria" v-for="criteria in status.items" :key="criteria.id">
					<span class="text">{{ criteria.text }}</span>
					<div class="action">
						<i class="material-icons text-success" v-if="criteria.status">done</i>
						<span v-else-if="!criteria.indicator.startsWith('href=')" v-html="criteria.indicator"></span>
						<a class="material-icons text-success" v-else-if="criteria.indicator.startsWith('href=')" target="__blank" :href="criteria.indicator.replace('href=', '')">
							<i class="material-icons hover-dark text-gray-medium-dark">launch</i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["status"],
	data() {
		return {
			loading: false,

			monitizationStatus: null,
		};
	},
	mounted() {
		this.monitizationStatus = this.status.last_request?.status;
	},
	methods: {
		sendMonitizationRequest() {
			this.loading = true;
			axios
				.post("/monitization/request")
				.then(() => {
					this.monitizationStatus = "pending";
				})
				.catch((err) => console.log(err))
				.then(() => (this.loading = false));
		},
	},
};
</script>

<style>
</style>