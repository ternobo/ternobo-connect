<template>
	<div class="action bg-white px-0 mb-3" v-if="action.post !== null">
		<div class="actionText" v-if="action.action !== 'post'">{{ actionText }}.</div>
		<post-card :post="action.post" />
	</div>
</template>

<script>
import PostCard from "./PostCard.vue";
export default {
	components: { PostCard },
	computed: {
		actionText() {
			if (this.action.action == "like") {
				return this.page.name + " این محتوا را پسندید";
			} else if (this.action.action == "comment") {
				return this.page.name + " برای این محتوا دیدگاه ارسال کرد";
			} else if (this.action.action == "share") {
				return this.page.name + " این محتوا را بازنشر کرد";
			}
		},
	},
	name: "ActionCard",
	props: {
		action: {
			type: Object,
			default: undefined,
			required: true,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
