<template>
	<base-layout class="explore-page">
		<div class="explore-page-header">
			<h1 class="mb-6">{{ __.get("community.header-title") }}</h1>
			<div @mousedown="mouseDownHandler" @mouseleave="mouseUpHandler" @wheel="scrollHeader" ref="header" class="explore-page-header__categories">
				<div v-for="category in categories" @click="select(category)" :class="{ active: category == activeCategory }" :key="`community_category_card_${category.id}`">
					<span>{{ category.name }}</span>
					<span width="32" :style="{ background: `url(${assetURL(category.icon)})`, backgroundSize: 'cover', width: '32px', height: '32px' }" />
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

			pos: {},
			moving: false,
		};
	},
	methods: {
		select(category) {
			if (!this.moving) {
				if (category.id == this.activeCategory?.id) {
					this.activeCategory = null;
				} else {
					this.activeCategory = category;
				}
			}
		},

		// DragToScroll
		mouseDownHandler(e) {
			this.$refs["header"].style.cursor = "grabbing";
			this.$refs["header"].style.userSelect = "none";
			this.$refs["header"].classList.add("moving");
			this.pos = {
				// The current scroll
				left: this.$refs["header"].scrollLeft,
				top: this.$refs["header"].scrollTop,
				// Get the current mouse position
				x: e.clientX,
				y: e.clientY,
			};
			this.$refs["header"].addEventListener("mousemove", this.mouseMoveHandler);
			this.$refs["header"].addEventListener("mouseup", this.mouseUpHandler);
		},
		mouseUpHandler() {
			this.$refs["header"].removeEventListener("mousemove", this.mouseMoveHandler);
			document.removeEventListener("mouseup", this.mouseUpHandler);

			this.$refs["header"].style.cursor = "default";
			this.$refs["header"].style.removeProperty("user-select");
			setTimeout(() => {
				this.moving = false;
			}, 400);
		},
		mouseMoveHandler(e) {
			// How far the mouse has been moved
			const dx = e.clientX - this.pos.x;
			const dy = e.clientY - this.pos.y;

			// Scroll the element
			this.$refs["header"].scrollTop = this.pos.top - dy;
			this.$refs["header"].scrollLeft = this.pos.left - dx;
			this.moving = true;
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