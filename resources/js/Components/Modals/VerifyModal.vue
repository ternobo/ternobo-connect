<template>
	<b-modal v-model="showModal" title="تایید هویت" size="lg" :centered="true">
		<h5>حساب خود را در ترنوبو تایید کنید تا بیشتر دیده شوید.</h5>
		<p class="text-left">برای دریافت نشان کاربر تایید شده <i class="material-icons">verified</i> می بایست هویت خود را با ارسال عکس سلفی خودتان به همراه کارت ملی تایید کنید</p>
		<input type="digit" class="form-control mb-2" v-model="code" name="nationalcode" placeholder="کدملی" value="" minlength="10" maxlength="12" />
		<div class="bg-default p-3 verifybox">
			<file-input accept="image/jpeg, image/png, image/jpg"></file-input>
			<span style="padding-right: 1rem; text-align: justify">
				تصویر را ضمیمه کنید
				<br />
				فقط فایل های png، jpg و حداکثر حجم ۱ مگابایت
			</span>
		</div>
		<div class="imageview" v-if="file != null">
			<i class="material-icons closebtn" @click="file = null">close</i>
			<img :src="image" id="nationalimage" style="width: 100%; max-height: 300px; object-fit: cover" />
		</div>
		<template #modal-footer>
			<loading-button :loading="loading" :disabled="file == null" class="btn btn-dark">ثبت</loading-button>
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
					this.loading = false;
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
					this.toast("یک تصویر انتخاب کنید");
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
