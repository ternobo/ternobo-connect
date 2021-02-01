<template>
	<div class="people-sugestion d-flex justify-content-between align-items-center">
		<wire-link class="d-flex h-100 align-items-center w-100" :href="'/' + page.slug">
			<lazy-image class="profile-sm my-0 ml-2" img-class="profile-sm" alt="" :src="page.profile" />
			<div class="d-flex ml-2 align-items-start flex-column justify-content-center w-100">
				<strong class="person-name">{{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="text-muted person-short-bio"></small>
			</div>
		</wire-link>
		<ConnetionButtons :vertical="true" style="margin-left: 4px; width: 80px" btn-style="padding: 7px" class="follow-buttons actions" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
	</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton";
import ConnectionButton from "../buttons/ConnectionButton";
export default {
	props: {
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	components: {
		FollowButton,
		ConnectionButton,
	},
	name: "PeopleSuggestion",
};
</script>

<style>
</style>
