<template>
	<div class="contact-message">
		<div class="contactinfo">
			<lazy-image class="profile" img-class="profile" :src="message.meta.user.profile"></lazy-image>
			<div class="d-flex flex-column">
				<stong>{{ message.meta.user.name }}</stong>
				<span class="subtitle">{{ message.meta.user.short_bio }}</span>
			</div>
		</div>
		<wire-link :href="'/' + message.meta.user.username" as="i" class="material-icons-outlined clickable showprofile">launch</wire-link>
	</div>
</template>

<script>
export default {
	props: ["message"],
};
</script>

<style>
</style>
