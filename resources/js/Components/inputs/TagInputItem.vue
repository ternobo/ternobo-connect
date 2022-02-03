<template>
	<div class="tag-item">
		<img width="16" class="me-1" :src="assetURL(community.icon)" v-if="community != null" />
		<span :class="{ communityTag: community != null }">{{ tag }}</span>
		<span class="separator"></span>
		<i class="material-icons" @click="$emit('delete')">close</i>
	</div>
</template>

<script>
export default {
	mounted() {
		axios.get("/tags/detail", { params: { tag: this.tag } }).then((response) => {
			if (response.data.status) {
				this.community = response.data.data.community;
			}
		});
	},
	data() {
		return {
			community: null,
		};
	},
	props: ["tag"],
};
</script>