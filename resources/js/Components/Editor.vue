<template>
	<div class="editor" :id="'editor_' + id"></div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
export default {
	data() {
		return {
			id: null,
		};
	},
	created() {
		this.id = this._uid;
	},
	mounted() {
		ClassicEditor.create(document.querySelector("#editor_" + this.id)).catch((error) => {
			console.error(error);
		});
	},
};
</script>
