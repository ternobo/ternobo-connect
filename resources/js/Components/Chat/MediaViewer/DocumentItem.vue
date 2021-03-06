<template>
	<div class="file-message">
		<div class="file-type">
			{{ fileType }}
		</div>
		<div class="file-detail">
			<div class="file-name">
				<strong>{{ fileName }}</strong>
			</div>
			<div class="d-flex align-items-center">
				<small class="file-size text-muted ml-3">{{ fileSize }}</small>
				<a download :href="fileUrl"><i class="material-icons font-16 text-muted">file_download</i></a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		fileUrl() {
			return "/" + this.document.filename;
		},
		fileSize() {
			return Math.round(this.document.meta.filesize / 1024) + "KB";
		},
		fileType() {
			let file = this.document.name;
			return file.substr(file.lastIndexOf(".") + 1).toUpperCase();
		},
		fileName() {
			return this.document.name;
		},
		sendDate() {
			return moment.from(this.document.created_at).format("jYYYY/jMM/jDD");
		},
	},
	props: ["document"],
};
</script>

<style>
</style>
