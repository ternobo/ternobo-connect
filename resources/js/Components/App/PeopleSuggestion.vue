<template>
	<div class="people-sugestion" :class="{ nofollow: !$store.state.shared.fullAccess }">
		<profile-peeking :page="page" />
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
import ProfilePeeking from "./ProfilePeeking/ProfilePeeking.vue";
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
		ProfilePeeking,
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
