<template>
	<div class="title-input">
		<input type="text" class="bg-transparent border-0 form-control shadow-0" v-model="text" />
	</div>
</template>

<script>
export default {
	props: ["content"],
	created() {
		this.text = this.content;
	},
	data() {
		return {
			text: "",
		};
	},
	watch: {
		text(newValue) {
			this.$emit("update:content", newValue);
		},
	},
};
</script>

<style>
</style>
