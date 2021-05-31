<template>
	<b-modal v-model="showModal" hide-footer title="ویرایش مشخصات کاربری" :centered="true">
		<div class="row pt-3">
			<div class="col-md-6">
				<MaterialTextField class="w-100" input-class="w-100" :value="firstName" v-model="firstName" :required="true" placeholder="نام"></MaterialTextField>
			</div>
			<div class="col-md-6">
				<MaterialTextField class="w-100 mt-md-0 mt-3" input-class="w-100" :value="lastName" v-model="lastName" :required="true" placeholder="نام خانوادگی"></MaterialTextField>
			</div>
			<div class="col-md-8 d-flex flex-column mt-3">
				<MaterialTextField class="w-100" input-class="w-100" :value="shortBio" v-model="shortBio" placeholder="عنوان"></MaterialTextField>
				<small class="font-12 mt-2"> این عنوان زیر نام شما نمایش داده می‌شود </small>
			</div>
			<div class="col-md-4 mt-3">
				<tselect
					class="tselect-lg"
					labelOption="label"
					valueOption="code"
					:items="[
						{ label: 'زن', code: '1' },
						{ label: 'مرد', code: '2' },
					]"
					v-model="gender"
					:dir="appDirection"
				>
					جنسیت
				</tselect>
			</div>
			<div class="col-md-4 mt-3">
				<MaterialTextField class="w-100" input-class="w-100" :value="location" v-model="location" placeholder="موقعیت"></MaterialTextField>
			</div>
			<div class="col-md-12 d-flex justify-content-end align-items-center mt-3">
				<loading-button class="btn btn-dark px-4" :loading="loading" @click.native="save">ثبت</loading-button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import MaterialTextField from "../inputs/MaterialTextField";
import MaterialTextArea from "../inputs/MaterialTextArea";

export default {
	props: {
		user: {
			type: Object,
			default: undefined,
			required: true,
		},
		pageLocation: {
			default: null,
			required: true,
		},
	},
	created() {
		this.firstName = this.user.first_name;
		this.lastName = this.user.last_name;
		this.shortBio = this.user.short_bio;
		this.location = this.pageLocation;
		this.gender = JSON.parse(this.user.gender);

		if (typeof "gender" != "object") {
			switch (this.gender) {
				case 1:
					this.gender = {
						label: "زن",
						code: "1",
					};
					break;
				case 2:
					this.gender = {
						label: "مرد",
						code: "2",
					};
					break;
			}
		}
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			shortBio: "",
			gender: "",
			location: "",
			loading: false,
		};
	},
	methods: {
		save() {
			this.loading = true;
			axios
				.post("/usersave/profile", {
					firstname: this.firstName,
					lastname: this.lastName,
					short_bio: this.shortBio,
					location: this.location,
					gender: this.gender,
				})
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:show", false);
						this.$store.dispatch("loadUser");
						this.$store.state.ternoboWireApp.reload();
						this.$emit("saved");
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => {})
				.then(() => (this.loading = false));
		},
	},

	mixins: [ModalMixin],
	components: {
		MaterialTextField,
		MaterialTextArea,
	},
	name: "UserInfoModal",
};
</script>
