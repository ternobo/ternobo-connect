<template>
	<div class="my-5 ternobo-notification">
		<div class="notification-header">
			<div class="notification-info">
				<img :src="notification.icon" width="24" class="icon" />
				<div class="d-flex flex-column">
					<strong class="title" ref="title">{{ title }}</strong>
					<span class="subtitle">{{ createdAt }}</span>
				</div>
			</div>
		</div>
		<div class="notification-content">
			{{ notification.text }}
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
	mixins: [NotificationMixin],
	mounted() {
		twemoji.parse(this.$refs.title);
	},
	computed: {
		notification() {
			return this.notifications[0];
		},
		title() {
			let $t = __.get(`notification-titles.${this.notification.title}`);
			return $t != `notification-titles.${this.notification.title}` ? $t : this.notification.title;
		},
	},
};
</script>

<style>
</style>