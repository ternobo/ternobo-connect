<template>
	<div class="notification-peek">
		<div class="notification-peek__loading" v-if="loading">
			<loading-spinner />
		</div>
		<div class="notification-peek__loading" v-else-if="notifications.length == 0">
			<span class="text-gray-medium-dark font-12">{{ __.get("notifications.no-notification") }}</span>
		</div>
		<div class="notification-peek__list">
			<notification v-for="notification in notifications" :notification="notification" :key="`notification_peek_${notification.id}`"></notification>
		</div>
	</div>
</template>

<script>
import LoadingSpinner from "../../LoadingSpinner.vue";
import Notification from "./Elements/Notification.vue";
export default {
	components: { LoadingSpinner, Notification },
	data() {
		return {
			loading: false,
			notifications: [],
		};
	},
	mounted() {
		this.loading = true;
		axios
			.get("/notifications/get")
			.then((response) => {
				this.notifications = response.data.data.notifications;
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => (this.loading = false));
	},
};
</script>

<style>
</style>
