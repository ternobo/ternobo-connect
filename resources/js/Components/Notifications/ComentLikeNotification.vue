<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
				</div>
				<div class="notification-text">
					<div class="title">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">نظر شما را پسندید</div>
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
