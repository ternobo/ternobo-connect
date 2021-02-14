<template>
	<div class="chat-item" :class="{ active: selected }">
		<div class="chat-info">
			<lazy-image src="/images/man-profile.png" class="profile-image"></lazy-image>
			<div class="d-flex flex-column">
				<span class="profile-name"> {{ chatTitle }} </span>
				<span class="last-message"> {{ chat.last_message.text }} </span>
			</div>
		</div>
		<span class="update-time"> {{ updated_at }} </span>
	</div>
</template>

<script>
import LazyImage from "../LazyImage.vue";
export default {
	created() {
		console.log(this.chat.updated_at);
	},
	computed: {
		updated_at() {
			return this.timeAgo(this.chat.updated_at);
		},
		chatTitle() {
			return this.chat.type == "private" ? this.chat.user.first_name + " " + this.chat.user.last_name : this.chat.title;
		},
	},
	props: ["chat", "selected"],
	components: {
		LazyImage,
	},
};
</script>
