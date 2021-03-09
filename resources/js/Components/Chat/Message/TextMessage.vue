<template>
	<div class="d-flex flex-column">
		<pre class="mb-1" :class="{ 'message-show-more': message.text.length > 1030 && !showMore }">{{ message.text }}</pre>
		<span class="text-action clickable" v-if="message.text.length > 1030" @click="showMore = !showMore">{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMore: false,
		};
	},
	props: ["message"],
};
</script>
