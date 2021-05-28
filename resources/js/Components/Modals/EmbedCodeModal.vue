<template>
	<b-modal v-model="showModal" hide-footer title="دریافت کد امبد" size="lg">
		<div class="embed-container">
			<textarea class="form-control" ref="textarea" readonly style="resize: none; direction: ltr" :value="optimizedCode"></textarea>
			<div class="d-flex justify-content-between align-items-center mb-5">
				<span class="font-demibold text-grey"> کد امبد را رونوشت و در وب‌سایت خود قرار دهید </span>

				<button class="btn category-badge px-2 py-1" @click="copy"><i class="material-icons-outlined font-20">file_copy</i> رونوشت</button>
			</div>
			<div class="d-flex flex-column">
				<span class="font-demibold text-dark mb-4"><i class="material-icons-outlined">visibility</i> پیش‌نمایش </span>

				<div class="border-2" v-html="code"></div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	methods: {
		copy() {
			this.$refs.textarea.select();
			document.execCommand("copy");
			this.toast("کپی شد");
		},
	},
	watch: {
		showModal(newValue) {
			if (newValue) {
				axios
					.post(this.$APP_URL + "/posts/" + this.post.id + "/embed")
					.then((response) => {
						if (response.data.result) {
							this.code = response.data.code;
						}
					})
					.catch((error) => {
						this.toast("خطا در برقراری ارتباط");
					});
			}
		},
	},
	computed: {
		optimizedCode() {
			if (this.code !== undefined) {
				return this.code.replaceAll("\n", "");
			}
			return undefined;
		},
	},
	props: {
		post: {
			type: Object,
			default: {},
			required: true,
		},
	},
	data() {
		return {
			code: undefined,
		};
	},
	mixins: [ModalMixin],
	name: "EmbedCodeModal",
};
</script>

<style>
</style>
