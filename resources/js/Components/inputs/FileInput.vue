<template>
	<div>
		<input type="file" class="d-none" :accept="accept" ref="fileInput" v-on:change="change" />
		<div @click="open">
			<slot>
				<button class="btn btn-primary">آپلود فایل</button>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		accept: {
			default: "image/jpeg, image/png, video/mp4, video/avi",
		},
	},
	name: "FileInput",
	methods: {
		open() {
			this.$refs.fileInput.click();
		},
		change(e) {
			this.$emit("change", e);
		},
	},
};
</script>

<style>
</style>
