<template>
	<b-modal v-model="showModal" hide-footer title="غیرفعال کردن حساب" body-class="modal-signup" size="lang" :centered="true">
		<div class="d-flex flex-column align-items-center">
			<div class="d-flex w-100 flex-column" style="align-items: center">
				<material-text-field class="material--sm w-50 mx-1 text-right my-4" input-class="w-100" :required="true" v-model="password" type="password" name="current_password" placeholder="رمزعبور" />
			</div>
			<div class="mt-3">
				<p>به این مورد توجه داشته باشید که در صورتی که حساب کاربری خود را غیرفعال کنید، محتوا و صفحه شما برای دیگر کاربران از دسترس خارج می‌شود.</p>
				<p>در صورتی بیش از <strong class="text-danger">۲ سال</strong> حساب کاربری شما غیرفعال باشد تمامی اطلاعات«پست‌ها، مقالات، اطلاعات پروفایل و صفحه شخصی و صفحات شرکتی» شما به طور <strong class="text-danger">غیرقابل بازگشتی</strong> حذف خواهد شد.</p>
				<strong class="text-warning"> حساب شما تا زمانی که مجدد وارد نشده‌ای غیرفعال خواهد بود. </strong>
			</div>
			<loading-button :loading="loading" :disabled="!(this.password != null && this.password.length > 0)" @click.native="deactive" class="btn btn-dark mx-auto mt-4 w-50">غیرفعال کردن حساب</loading-button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
export default {
	data() {
		return {
			loading: false,
			password: null,
		};
	},
	methods: {
		deactive() {
			if (this.password != null) {
				this.loading = true;
				axios
					.post("/auth/deactive", {
						password: this.password,
					})
					.then((response) => {
						if (response.data.result) {
							window.location = "/";
						} else {
							this.handleError(response.data.errors);
						}
						this.loading = false;
					})
					.catch((err) => (this.loading = true));
			}
		},
	},
	mixins: [ModalMixin],

	name: "DeactiveModal",
};
</script>

<style>
</style>
