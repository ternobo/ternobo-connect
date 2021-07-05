<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<wire-link :href="notifications[0].sender.slug" class="profile-xsm clickable">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xsm" img-class="profile-xsm" />
				</wire-link>
				<div class="notification-text">
					<wire-link class="title clickable" :href="notifications[0].sender.slug">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</wire-link>
					<div class="action">{{ __.get("notifications.liked-your-comment") }}</div>
				</div>
			</div>
			<i class="material-icons text-danger">favorite</i>
		</div>
		<div class="notification-content">
			<div class="col-md-12 py-2">{{ notifications[0].notifiable.text }}</div>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
	mixins: [NotificationMixin],
	components: {},
};
</script>

<style></style>
