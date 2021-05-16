<template>
	<div class="people-sugestion">
		<wire-link class="suggestion-info-link" :href="'/' + page.slug">
			<lazy-image class="profile-sm" img-class="profile-sm" :src="page.profile" />
			<div class="suggestion-info">
				<strong class="person-name">{{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="person-short-bio">{{ page.short_bio }}</small>
			</div>
		</wire-link>
		<ConnetionButtons :vertical="true" style="margin-left: 4px; width: 80px" btn-style="padding: 7px" class="follow-buttons actions" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
	</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton";
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
	},
	name: "PeopleSuggestion",
};
</script>

<style>
</style>
