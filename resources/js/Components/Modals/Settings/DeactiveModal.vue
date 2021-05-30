<template>
	<b-modal v-model="showModal" hide-footer title="غیرفعال کردن حساب" body-class="modal-signup" size="md" :centered="true">
		<div class="d-flex flex-column align-items-center">
			<div class="px-2 py-2">
				<p>به این مورد توجه داشته باشید؛ در صورتی که حساب کاربری خود را غیرفعال کنید، محتوا و صفحه شما برای دیگر کاربران از دسترس خارج می‌شود.</p>
				<p>در صورتی بیش از <strong class="text-danger">۲ سال</strong> حساب کاربری شما غیرفعال باشد، تمامی اطلاعات <span class="text-grey">(محتوا، اطلاعات پروفایل و صفحه شخصی شما)</span> شما به طور <strong class="text-danger">غیرقابل بازگشتی</strong> حذف خواهد شد.</p>
				<span class="text-action font-demibold"> حساب شما تا زمانی که مجدد وارد نشده‌اید غیرفعال خواهد بود. </span>
			</div>
			<div class="d-flex align-items-end justify-content-between w-100 px-2 mb-2 mt-4">
				<material-text-field class="me-3" input-class="w-100" v-model="password" type="password" name="current_password" placeholder="رمزعبور" />
				<loading-button :loading="loading" style="height: 48px" :disabled="!(this.password != null && this.password.length > 0)" @click.native="deactive" class="btn btn-danger font-14">غیرفعال کردن حساب</loading-button>
			</div>
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
