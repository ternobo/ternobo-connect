<template>
	<b-modal v-model="showModal" title="تایید هویت" size="md" :centered="true">
		<h5>حساب خود را در ترنوبو تایید کنید تا بیشتر دیده شوید.</h5>
		<p class="text-right">برای دریافت نشان کاربر تایید شده <i class="material-icons text-action">verified</i> می بایست هویت خود را با ارسال عکس سلفی خودتان به همراه کارت ملی تایید کنید</p>
		<input type="digit" class="form-control mb-2" v-model="code" name="nationalcode" placeholder="کدملی" value="" minlength="10" maxlength="12" />
		<div class="bg-default p-3 verifybox" v-if="file == null">
			<file-input @change="fileSelect" accept="image/jpeg, image/png, image/jpg"></file-input>
			<span style="padding-right: 1rem; text-align: justify">
				تصویر را ضمیمه کنید
				<br />
				فقط فایل های png، jpg و حداکثر حجم ۱ مگابایت
			</span>
		</div>
		<div class="position-relative imageview" v-if="file != null">
			<i class="material-icons closebtn font-16 d-flex align-items-center justify-content-center" style="position: absolute; right: 12px; top: 12px" @click="file = null">close</i>
			<img :src="image" id="nationalimage" style="width: 100%; max-height: 300px; object-fit: cover" />
		</div>
		<template #modal-footer>
			<loading-button :loading="loading" @click.native="upload" :disabled="file == null || code == null || code.length < 1" class="btn btn-dark">ثبت</loading-button>
		</template>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import FileInput from "../inputs/FileInput.vue";
export default {
	methods: {
		upload() {
			this.loading = true;
			let formData = new FormData();
			formData.append("file", this.file);
			formData.append("nationalcode", this.code);
			axios
				.post("/verificationRequest", formData)
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:show", false);
						this.$emit("verified", true);
						this.loading = false;
					} else {
						this.toast(__.get("messages.national-code-is-invalid"));
					}
				})
				.catch((err) => {
					this.loading = false;
				})
				.then(() => {
					this.loading = false;
				});
		},
		fileSelect(e) {
			var input = event.target;
			if (input.files && input.files[0]) {
				let file = event.target.files[0];
				var filetype = file.type;
				let blobURL = URL.createObjectURL(file);
				if (filetype.startsWith("image")) {
					this.file = file;
					this.image = blobURL;
				} else {
					this.toast(__.get("messages.select-image"));
				}
			}
		},
	},
	data() {
		return {
			file: null,
			image: null,
			loading: false,
			code: null,
		};
	},
	components: { FileInput },
	mixins: [ModalMixin],
	name: "VerifyModal",
};
</script>

<style>
</style>
