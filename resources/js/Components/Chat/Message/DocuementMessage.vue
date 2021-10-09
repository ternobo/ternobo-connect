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
				<small class="send-date text-muted me-4">{{ sendDate }}</small>
				<small class="file-size text-muted me-4">{{ fileSize }}</small>
				<a download :href="fileUrl"><i class="material-icons font-16 text-muted">file_download</i></a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		file() {
			return typeof this.message.media[0] == "object" ? URL.createObjectURL(this.message.media[0]) : this.message.media[0];
		},
		fileUrl() {
			return typeof this.message.media[0] == "object" ? this.file : "/" + this.message.media[0];
		},
		fileSize() {
			return typeof this.message.media[0] == "object" ? Math.round(this.message.media[0].size / 1024) + "KB" : Math.round(this.message.meta.filesize / 1024) + "KB";
		},
		fileType() {
			let file = this.fileName;
			if (typeof this.message.media[0] == "object") {
				file = this.message.media[0].name;
			}
			return file.substr(file.lastIndexOf(".") + 1).toUpperCase();
		},
		fileName() {
			return this.message.meta.filename;
		},
		sendDate() {
			return moment.from(this.message.created_at).format("jYYYY/jMM/jDD");
		},
	},
	props: ["message"],
};
</script>

<style>
</style>
