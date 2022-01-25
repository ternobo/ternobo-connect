<template>
	<base-layout class="explore-page">
		<div class="explore-page-header">
			<i class="material-icons-outlined mb-3">explore</i>
			<h1>{{ __.get("community.header-title") }}</h1>
			<p class="font-14 text-gray-medium-dark">{{ __.get("community.header-description") }}</p>
		</div>
		<community-category v-for="category in categories" :key="`community_category_${category.id}`" :category="category" />
	</base-layout>
</template>

<script>
import CommunityCardSkeleteton from "../Components/CommunityExplore/CommunityCardSkeleteton.vue";
import CommunityCategory from "../Components/CommunityExplore/CommunityCategory.vue";
import AppLayout from "../Layouts/AppLayout.vue";
import BaseLayout from "../Layouts/BaseLayout.vue";
export default {
	components: { BaseLayout, CommunityCardSkeleteton, CommunityCategory },
	layout: AppLayout,
	name: "CommunityExplore",
	props: ["categories"],
};
</script>