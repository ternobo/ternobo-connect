<template>
	<div class="card">
		<UserInfoModal :user="page.user" :page-location="page.location" v-if="canEdit" :show.sync="edit"></UserInfoModal>
		<ProfileCover :canChange="canEdit" :src="page.cover"></ProfileCover>
		<report-page-modal :show.sync="showReport" :page-id="page.id"></report-page-modal>
		<mutual-friends-modal :show.sync="showFriends" :page-id="page.id"></mutual-friends-modal>
		<div class="pageinfo-card">
			<i v-if="canEdit && !$root.isDesktop" class="material-icons-outlined btn d-flex align-items-center justify-content-center btn-edit" @click="edit = true">edit</i>
			<ProfileImage ref="profileImage" :canChange="canEdit" :src="page.profile"></ProfileImage>
			<div class="d-flex align-items-center" v-if="$root.isDesktop">
				<ConnetionButtons class="follow-buttons" v-if="!canEdit" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
				<div v-if="$store.state.user != null">
					<b-dropdown v-if="!canEdit" size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
						<template v-slot:button-content class="p-0">
							<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
						</template>
						<b-dropdown-item>
							<div class="d-flex align-items-center" @click="showReport = true">
								<i class="material-icons ml-2 text-dark">link</i>
								<div>
									<div>
										<strong> گزارش تخلف </strong>
									</div>
									<small class="text-muted"> این صفحه در تضاد با قوانین ترنوبو است </small>
								</div>
							</div>
						</b-dropdown-item>
					</b-dropdown>
				</div>
			</div>
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
			<div class="d-flex align-items-center" v-if="!$root.isDesktop">
				<ConnetionButtons class="follow-buttons" v-if="!canEdit" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
				<div v-if="$store.state.user != null">
					<b-dropdown v-if="!canEdit" size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
						<template v-slot:button-content class="p-0">
							<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
						</template>
						<b-dropdown-item>
							<div class="d-flex align-items-center" @click="showReport = true">
								<i class="material-icons ml-2 text-dark">link</i>
								<div>
									<div>
										<strong> گزارش تخلف </strong>
									</div>
									<small class="text-muted"> این صفحه در تضاد با قوانین ترنوبو است </small>
								</div>
							</div>
						</b-dropdown-item>
					</b-dropdown>
				</div>
			</div>
		</div>
		<a class="p-3 d-flex align-items-center pr-4 clickable" @click="showFriends = true" v-if="mutuals != null && mutuals.list.length > 0">
			<div class="d-flex mr-2">
				<div class="profile-photos">
					<img :src="mutuals.list[0].profile" />
					<img v-if="mutuals.list.length > 1" :src="mutuals.list[1].profile" />
				</div>
			</div>
			<div class="d-flex flex-column px-3">
				<strong class="text-dark" :class="{ 'font-12': !$root.isDesktop }">{{ mutuals.count }} دوست مشترک</strong>
				<span class="text-superlight font-10">{{ mutuals.text }}</span>
			</div>
		</a>
	</div>
</template>

<script>
import ProfileCover from "./ProfileCover";
import ProfileImage from "./ProfileImage";
import UserInfoModal from "../Modals/UserInfoModal";

import MaterialTextField from "../inputs/MaterialTextField";
import ReportPageModal from "../Modals/ReportPageModal.vue";
import MutualFriendsModal from "../Modals/MutualFriendsModal.vue";

export default {
	methods: {
		setProfileImage() {
			this.$refs.profileImage.openFileSelect();
		},
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
						this.$store.dispatch("loadUser");
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
		if (this.$store.state.user != null && !this.checkUser(this.page.user_id)) {
			axios
				.post("/mutual-friends", {
					page_id: this.page.id,
				})
				.then((response) => {
					this.mutuals = response.data.mutuals;
				});
		}
	},
	data() {
		return {
			loading: false,
			edit: false,
			firstName: null,
			lastName: null,
			shortBio: null,
			gender: null,

			showReport: false,
			mutuals: null,
			showFriends: false,
		};
	},
	components: {
		ProfileImage,
		ProfileCover,
		UserInfoModal,
		MaterialTextField,
		ReportPageModal,
		MutualFriendsModal,
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
