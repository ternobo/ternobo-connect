<template>
	<div class="profile-header-card">
		<user-info-modal :user="page.user" :page-location="page.location" v-if="canEdit" :show.sync="edit"></user-info-modal>
		<ProfileCover :canChange="canEdit && !profileEdit" :src="page.cover"></ProfileCover>
		<report-page-modal :show.sync="showReport" :page-id="page.id"></report-page-modal>
		<mutual-friends-modal :show.sync="showFriends" :page-id="page.id"></mutual-friends-modal>
		<connetions-modal :show.sync="showConnections" :page="page"></connetions-modal>
		<div class="page-name">
			<div class="profile-info">
				<ProfileImage ref="profileImage" :canChange="canEdit && !profileEdit" :class="{ disabled: profileEdit }" class="profile-xxlg" imgClass="profile-xxlg" :src="page.profile"></ProfileImage>
				<span class="name d-flex align-items-center">
					<strong class="name">
						{{ page.name }}
						<i v-if="page.user.is_verified === 1" class="verificationcheck ms-1 font-20">check_circle</i>
					</strong>
				</span>
				<small class="short_bio">{{ page.short_bio }}</small>
				<small v-if="page.location != null && page.location.length > 0" class="location">
					<i class="material-icons-outlined">location_on</i>
					{{ page.location }}
				</small>
			</div>
			<div class="d-flex flex-column align-items-end justify-content-between">
				<div class="d-flex align-items-center" style="margin-left: -8px">
					<div class="connection-actions clickable" @click="showConnections = true">
						<i class="material-icons-outlined">group</i> <span>{{ __.get("user-profile.connections") }}</span>
					</div>
					<i class="btn profile-header-btn-edit material-icons-outlined" :class="{ disabled: profileEdit }" v-if="canEdit" @click="doEdit">edit</i>
					<i class="material-icons-outlined report-icon" v-else-if="Boolean($store.user)" @click="showReport = true">report</i>
				</div>
				<div class="invite_badge" v-if="$root.isDesktop">
					<wire-link :href="`/${invited_by.username}`" class="invite_profile clickable" v-if="invited_by != null">
						<lazy-image :src="invited_by.profile" class="profile-sm mb-0" imgClass="profile-sm" />
					</wire-link>
					<div class="invite_info">
						<span class="invite_date" :class="{ bold: invited_by == null }">{{ __.get("user-profile.joined") }} {{ joinTime }}</span>
						<span class="invited_by" v-if="invited_by != null">
							{{ __.get("user-profile.nominated-by") }} <wire-link class="clickable" :href="`/${invited_by.username}`">{{ invited_by.name }}</wire-link>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="profile-header-actions" v-if="!canEdit || !$root.isDesktop">
			<div>
				<a class="d-flex align-items-center clickable" @click="showFriends = true" v-if="mutuals != null && mutuals.list.length > 0">
					<div class="d-flex ms-2">
						<div class="profile-photos">
							<img :src="mutuals.list[0].profile" />
							<img v-if="mutuals.list.length > 1" :src="mutuals.list[1].profile" />
						</div>
					</div>

					<div class="mutual-friends-container">
						<strong class="text-dark font-demibold">{{ mutuals.count }} {{ __.choice("user-profile.mutual-friends", mutuals.count) }}</strong>
						<span class="text-grey ms-2 font-12">{{ mutuals.text }}</span>
					</div>
				</a>
			</div>
			<div class="invite_badge" v-if="!$root.isDesktop">
				<div class="invite_profile" v-if="invited_by != null">
					<lazy-image :loadingColor="skeletonOptions.profileColor" :src="invited_by.profile" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" class="mb-0" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" />
				</div>
				<div class="invite_info">
					<span class="invite_date" :class="{ bold: invited_by == null }">{{ __.get("user-profile.joined") }} {{ joinTime }}</span>
					<span :href="`/${invited_by.username}`" class="invited_by" v-if="invited_by != null">
						{{ __.get("user-profile.nominated-by") }} <wire-link class="clickable" :href="`/${invited_by.username}`" as="strong">{{ invited_by.name }}</wire-link>
					</span>
				</div>
			</div>
			<connetion-buttons v-if="!canEdit" btnClass="w-100" :class="{ 'w-100': !$root.isDesktop }" :pageId="page.id" />
		</div>
	</div>
</template>

<script>
import ProfileCover from "./ProfileCover";
import ProfileImage from "./ProfileImage";
import MaterialTextField from "../inputs/MaterialTextField";
import ReportPageModal from "../Modals/ReportPageModal.vue";
import MutualFriendsModal from "../Modals/MutualFriendsModal.vue";
import UserInfoModal from "../Modals/UserInfoModal.vue";
import ConnetionButtons from "../buttons/ConnetionButtons.vue";
import ConnetionsModal from "../Modals/ConnetionsModal.vue";
import { mapState } from "vuex";

export default {
	methods: {
		doEdit() {
			if (!this.profileEdit) {
				this.edit = true;
			}
		},
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
	computed: {
		...mapState(["profileEdit"]),
		joinTime() {
			return this.formatTime(this.page.created_at, "D MMMM YYYY");
		},
		invited_by() {
			return this.page.user.invited_by;
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
			showConnections: false,
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
		ConnetionButtons,
		ConnetionsModal,
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
