<template>
	<div class="contact-item">
		<i class="material-icons clickable hover-danger text-grey" v-if="edit" @click="$emit('deleted')">close</i>
		<i class="material-icons clickable hover-danger text-grey" v-else @click="window.open(website.url)">close</i>
		<div class="website-info">
			<span class="font-14 text-action">{{ website.url }}</span>
			<span class="font-14">{{ website.option.name }}</span>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		openURL(url) {
			if (url.startsWith("http://") || url.startsWith("https://")) {
				window.open(url);
			} else {
				window.open(`http://${url}`);
			}
		},
	},
	props: {
		website: {
			type: Object,
			default: undefined,
		},
		edit: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style>
</style>
