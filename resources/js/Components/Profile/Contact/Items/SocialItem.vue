<template>
	<div @click="cardClickAction" class="contact-item clickable" :class="{ 'border-only': options.google == undefined }">
		<div>
			<i class="material-icons clickable text-grey" v-if="options.google != undefined && edit">close</i>
			<i class="material-icons clickable text-action" v-else-if="edit">add</i>
			<i class="material-icons clickable text-grey" v-else>launch</i>
		</div>
		<div class="socail-info">
			<span>Gmail</span>
			<img src="/images/gmail-logo.png" width="24px" />
		</div>
	</div>
</template>

<script>
export default {
	methods: {},
	props: ["social"],
};
</script>

<style>
</style>
