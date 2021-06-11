<template>
	<div class="d-flex justify-content-between w-100 align-items-center">
		<div class="d-flex align-items-center">
			<i class="material-icons-outlined font-32 ml-4">
				{{ session.user_agent.isMobile ? "phone_android" : "computer" }}
			</i>
			<div class="d-flex flex-column">
				<strong class="font-14">{{ session.user_agent.platform }}</strong>
				<div class="text-muted font-12">
					<span class="me-1" :class="{ 'text-success': session.isActive }">{{ session.isActive ? "همین دستگاه" : timeAgo(session.updated_at) }}</span>
					<span>{{ session.location }}</span>
				</div>
			</div>
		</div>
		<div v-if="canRemove">
			<loading-spinner style="height: 10px; width: 10px; border-width: 2px" v-if="loading && !session.isActive"></loading-spinner>
			<i class="material-icons text-muted hover-danger" @click="doDelete" v-else-if="!session.isActive">close</i>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
		};
	},
	methods: {
		doDelete() {
			axios
				.delete("/sessions/" + this.session.id)
				.then((response) => {
					if (response.data.result) {
						this.$emit("deleted");
					} else {
						this.toast(__.get("messages.delete-error"));
					}
					this.loading = false;
				})
				.catch((error) => {
					this.toast(__.get("messages.connection-error"));
					this.loading = false;
				});
		},
	},
	props: {
		canRemove: {
			type: Boolean,
			default: true,
			required: false,
		},
		session: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
