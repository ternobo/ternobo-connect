<template>
	<div class="card">
		<UserInfoModal :user="page.user" :page-location="page.location" v-if="canEdit" :show.sync="edit"></UserInfoModal>
		<ProfileCover :canChange="canEdit" :src="page.cover"></ProfileCover>
		<div class="pageinfo-card">
			<i v-if="canEdit && !$root.isDesktop" class="material-icons-outlined btn d-flex align-items-center justify-content-center btn-edit" @click="edit = true">edit</i>
			<ProfileImage :canChange="canEdit" :src="page.profile"></ProfileImage>
			<ConnetionButtons class="follow-buttons" v-if="!canEdit && $root.isDesktop" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
		</div>
		<div class="page-name">
			<span class="d-flex align-items-center">
				<strong class="user-fullname">
					{{ page.name }}
					<i v-if="page.user.is_verified === 1" class="verificationcheck mr-1 font-20">check_circle</i>
				</strong>
				<i v-if="canEdit && $root.isDesktop" class="mr-2 material-icons-outlined font-16 hover-dark clickable text-superlight" @click="edit = true">edit</i>
			</span>
			<small class="user--short-bio">{{ page.short_bio }}</small>
			<small v-if="page.location != null && page.location.length > 0" class="mt-1 text-superlight user-location">
				<i class="material-icons-outlined">location_on</i>
				{{ page.location }}
			</small>

			<ConnetionButtons class="follow-buttons" v-if="!canEdit && !$root.isDesktop" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
		</div>
	</div>
</template>

<script>
import ProfileCover from "./ProfileCover";
import ProfileImage from "./ProfileImage";
import UserInfoModal from "../Modals/UserInfoModal";

import MaterialTextField from "../inputs/MaterialTextField";

export default {
	methods: {
		save() {
			this.loading = true;
			axios
				.post("/usersave/profile", {
					firstname: this.firstName,
					lastname: this.lastName,
					short_bio: this.shortBio,
					gender: this.gender,
				})
				.then((response) => {
					if (response.data.result) {
						Inertia.reload();
						this.$emit("saved");
					} else {
						this.handleError(response.data.errors);
					}
					this.edit = false;
				})
				.catch((err) => {})
				.then(() => (this.loading = false));
		},
		cancel() {
			this.firstName = this.page.user.first_name;
			this.lastName = this.page.user.last_name;
			this.shortBio = this.page.user.short_bio;
			this.gender = JSON.parse(this.page.user.gender);
			this.edit = false;
		},
	},
	created() {
		this.firstName = this.page.user.first_name;
		this.lastName = this.page.user.last_name;
		this.shortBio = this.page.user.short_bio;
		this.gender = JSON.parse(this.page.user.gender);
	},
	data() {
		return {
			loading: false,
			edit: false,
			firstName: null,
			lastName: null,
			shortBio: null,
			gender: null,
		};
	},
	components: {
		ProfileImage,
		ProfileCover,
		UserInfoModal,
		MaterialTextField,
	},
	props: {
		canEdit: {
			type: Boolean,
			default: false,
			required: false,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
