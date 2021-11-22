<template>
	<div class="user-badge">
		<img src="/public/badges/supporter.svg" v-b-tooltip.hover :title="__.get(`badges.supporter`)" v-if="showSupporter" />
		<img :src="badge.icon" v-b-tooltip.hover :title="badge.name" v-for="badge in badges" :key="`user_badge_item_${badge.id}`" />
	</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
	props: ["badgeStatus", "onlyOne", "showSupporter"],
	computed: {
		firstBadge() {
			return this.badgeStatusArray.length > 0 ? [this.badgeStatusArray[0]] : [];
		},
		badges() {
			return this.onlyOne ? this.firstBadge : this.badgeStatusArray;
		},
		badgeStatusArray() {
			return Object.keys(this.badgeStatus)
				.filter((item) => this.badgeStatus[item])
				.map((item) => {
					return {
						id: uuidv4(),
						name: __.get(`badges.${item}`),
						status: this.badgeStatus[item],
						icon: `/badges/${item}.svg`,
					};
				});
		},
	},
};
</script>

<style>
</style>