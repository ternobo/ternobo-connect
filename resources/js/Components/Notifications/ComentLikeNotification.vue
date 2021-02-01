<template>
	<div class="post-notification">
		<wire-link class="userinfo text-dark" :href="'/' + notification.sender.slug">
			<lazy-image img-class="profile-sm" class="profile-sm mb-0 ml-2" :src="notification.sender.profile" />
			<div class="d-flex flex-column justify-content-center">
				<span class="d-flex align-items-center">
					<b>
						{{ notification.sender.name }}
						<i v-if="notification.sender.is_verified" class="verificationcheck">check_circle</i>
					</b>
					<span class="mr-2 text-superlight font-11">{{ time(notification.created_at) }} </span></span
				>
				<div class="w-100">دیدگاه شما را پسندید</div>
			</div>
		</wire-link>
		<div class="row m-0">
			<div class="col-md-12 px-0 d-flex p-0 justify-content-end">
				<div class="post p-0 text-dark clickable">
					<div class="col-md-12 py-2">{{ notification.mycomment.text }}</div>
				</div>
			</div>
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
