<template>
	<base-layout class="explore-page">
		<div class="explore-page-header">
			<h1 class="mb-6">{{ __.get("community.header-title") }}</h1>
			<div @wheel="scrollHeader" ref="header" class="explore-page-header__categories">
				<div v-for="category in categories" @click="select(category)" :class="{ active: category == activeCategory }" :key="`community_category_card_${category.id}`">
					<span>{{ category.name }}</span>
					<img width="32" :src="assetURL(category.icon)" />
				</div>
			</div>
		</div>
		<community-list :category="activeCategory" />
	</base-layout>
</template>

<script>
import CommunityCardSkeleteton from "../Components/CommunityExplore/CommunityCardSkeleteton.vue";
import CommunityList from "../Components/CommunityExplore/CommunityList.vue";
import AppLayout from "../Layouts/AppLayout.vue";
import BaseLayout from "../Layouts/BaseLayout.vue";
export default {
	components: { BaseLayout, CommunityCardSkeleteton, CommunityList },
	layout: AppLayout,
	name: "CommunityExplore",
	props: ["categories"],
	data() {
		return {
			activeCategory: null,
		};
	},
	methods: {
		select(category) {
			if (category.id == this.activeCategory?.id) {
				this.activeCategory = null;
			} else {
				this.activeCategory = category;
			}
		},
		scrollHeader(e) {
			e.preventDefault();
			this.$refs["header"].scrollBy({
				left: e.deltaY < 0 ? -100 : 100,
			});
		},
	},
};
</script>