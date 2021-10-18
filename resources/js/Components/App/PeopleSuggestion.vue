<template>
	<div class="people-sugestion">
		<wire-link class="suggestion-info-link" :href="'/' + page.slug">
			<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-xsm" img-class="profile-xsm" :src="page.profile" />
			<div class="suggestion-info">
				<strong class="person-name">{{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="person-short-bio">{{ page.short_bio }}</small>
			</div>
		</wire-link>
		<FollowButton class="btn-icon btn-md" :page="page.id">
			<template v-slot:default="{ followed }">
				<i class="material-icons font-16" v-if="followed">remove</i>
				<i class="material-icons font-16" v-else>add</i>
			</template>
		</FollowButton>
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

<style lang="scss">
.followsuggest-btn {
	min-height: 24px !important;
	min-width: 24px !important;
	width: 24px !important;
	height: 24px;
	padding: 0 !important;
	margin: 0;
	display: flex !important;
	align-items: center;
	justify-content: center;
	> span {
		font-size: 16px;
		font-weight: 600;
		font-family: "Open Sans";
		display: flex;
		align-items: center;
	}
}
</style>
