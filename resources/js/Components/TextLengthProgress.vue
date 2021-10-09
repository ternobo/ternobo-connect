<template>
	<div class="text-length-progress">
		<b-progress :value="progress" class="w-100" animated></b-progress>
		<span class="ms-2 charachter-left text-gray-medium-dark">{{ leftCharacters }}</span>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: "",
		},
		maxlength: {
			default: 150,
		},
	},
	computed: {
		leftCharacters() {
			return this.maxlength - this.text.length;
		},
		progress() {
			const length = this.text.length;
			return (length / this.maxlength) * 100;
		},
	},
};
</script>

<style lang="scss">
.text-length-progress {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 145px;

	.charachter-left {
		font-size: 1rem;
		line-height: 1.5rem;
	}
}
</style>