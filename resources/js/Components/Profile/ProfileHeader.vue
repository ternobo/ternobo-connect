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
					<strong class="name d-flex align-items-center">
						{{ page.name }}
						<span v-if="page.is_nickname" class="ms-1 font-weight-normal font-16 text-gray-medium-dark">({{ page.user.first_name + " " + page.user.last_name }})</span>
						<user-badges class="ms-2" :badgeStatus="page.badge_status" />
					</strong>
				</span>
				<small class="short_bio">{{ page.short_bio }}</small>
				<small v-if="page.location != null && page.location.length > 0" class="location">
					{{ page.location }}
				</small>

				<div class="invite_badge mt-5" v-if="$root.isDesktop">
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
			<div class="d-flex flex-column align-items-end justify-content-between">
				<div class="d-flex align-items-center" style="margin-left: -8px">
					<connetion-buttons ref="connectionbtn" v-if="!canEdit && !page.blocked" btnClass="w-100" :class="{ 'w-100': !$root.isDesktop }" :pageId="page.id" />
					<unblock-button @unblocked="$store.state.ternoboWireApp.reload()" :page="page.id" v-else-if="!canEdit"></unblock-button>
					<button class="ms-5 me-4 btn btn-text btn-icon btn-md" @click="showConnections = true">
						<i class="material-icons-outlined">group</i>
					</button>
					<button class="btn btn-subtle btn-md rounded-4 btn-icon" :class="{ disabled: profileEdit }" v-if="canEdit" @click="doEdit"><i class="material-icons-outlined font-16">edit</i></button>
					<div v-else-if="Boolean($store.state.user)">
						<i class="material-icons-outlined report-icon" v-if="page.blocked" @click="showReport = true">report</i>
						<dropdown-menu size="lg" variant="link" v-else toggle-class="text-decoration-none" no-caret>
							<template v-slot:button>
								<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
							</template>
							<dropdown-item @click="blockUser">
								<i class="material-icons text-dark">block</i>
								<strong>{{ __.get("user-profile.block") }}</strong>
							</dropdown-item>
							<dropdown-item @click="showReport = true">
								<i class="material-icons text-dark">report</i>
								<strong>{{ __.get("user-profile.report") }}</strong>
							</dropdown-item>
						</dropdown-menu>
					</div>
				</div>
				<div class="d-flex align-items-center clickable" @click="showFriends = true" v-if="mutuals != null && mutuals.list.length > 0">
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
				</div>
			</div>
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
import UnblockButton from "../buttons/UnblockButton.vue";

export default {
	methods: {
		blockUser() {
			this.$refs.connectionbtn.setLoading();
			axios
				.post(`/block/${this.page.id}`)
				.then(() => {
					this.$store.state.ternoboWireApp.reload();
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.connection-error"));
				})
				.then(() => {
					this.$refs.connectionbtn.offLoading();
				});
		},
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

			blocked: false,

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
		UnblockButton,
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
