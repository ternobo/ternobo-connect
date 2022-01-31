<template>
	<div class="post-tags">
		<wire-link class="tag-item" :href="`/tags/${tag.tag}`" v-for="tag in tags" :key="`tags_id_${tag.id}`">
			<img :src="`${assetURL(tag.community.icon)}`" v-if="tag.community != null" />
			<span :class="{ communityTag: tag.is_community_tag }">{{ tag.tag }}</span>
		</wire-link>
	</div>
</template>

<script>
export default {
	props: ["tags"],
};
</script>