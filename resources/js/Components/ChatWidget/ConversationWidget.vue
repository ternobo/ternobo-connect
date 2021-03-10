 <template>
	<div class="chat-widget" :class="{ open: showList }">
		<div class="widget-header" @click="showList = !showList">
			<div class="widget-info">
				<lazy-image class="profile-xsm" img-class="profile-xsm" :src="chat.user.profile"></lazy-image>
				<strong>{{ chat.user.name }}</strong>
			</div>
			<div class="d-flex align-items-center">
				<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
					<template v-slot:button-content>
						<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
					</template>
					<wire-link role="presentation" as="li" :href="'/' + chat.user.username"><strong class="dropdown-item clickable" role="menuitem">مشاهده پروفایل</strong></wire-link>
					<b-dropdown-item @click="toggleNotification">{{ conversation.muted ? "فعال کردن اطلاعیه" : "غیرفعال کردن اطلاعیه" }}</b-dropdown-item>
					<li role="presentation" @click="showShareUser()"><strong class="dropdown-item clickable" role="menuitem">اشتراک گذاری این کاربر</strong></li>
					<!-- <li role="presentation"><strong class="dropdown-item clickable" role="menuitem">خروجی گرفتن از گفتگو</strong></li> -->
				</b-dropdown>
				<i class="material-icons-outlined text-muted" @click="$emit('close')">close</i>
			</div>
		</div>
		<div class="widget-body">
			<conversation class="widget" ref="conversation" :isVerified="chat.user.is_verified" :hideHeader="true" :chatId="chat.id" :profile="chat.user.username" :title="chat.user.name" :subtitle="chat.user.short_bio" />
		</div>
	</div>
</template>

 <script>
import Conversation from "../Chat/Conversation.vue";
export default {
	methods: {
		toggleNotification() {
			this.conversation.muted = !this.conversation.muted;
			this.$refs.conversation.toggleNotification();
		},
		showShareUser() {
			this.$refs.conversation.showShareUser = true;
		},
	},
	components: { Conversation },
	data() {
		return {
			showList: true,
			conversation: {},
		};
	},
	mounted() {
		this.conversation = this.chat;
	},
	props: ["chat"],
};
</script>

 <style>
</style>
