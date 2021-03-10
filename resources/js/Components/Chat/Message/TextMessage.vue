<template>
	<div class="d-flex flex-column">
		<pre class="mb-1" :class="{ 'message-show-more': message.text.length > 1030 && !showMore }" v-html="content"></pre>
		<span class="text-action clickable" v-if="message.text.length > 1030" @click="showMore = !showMore">{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}</span>
	</div>
</template>

<script>
export default {
	computed: {
		content() {
			if (this.message.shouldSend) {
				return this.escapeHtml(this.message.text);
			}
			return this.message.text;
		},
	},
	methods: {
		escapeHtml(unsafe) {
			return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
		},
	},
	data() {
		return {
			showMore: false,
		};
	},
	props: ["message"],
};
</script>
