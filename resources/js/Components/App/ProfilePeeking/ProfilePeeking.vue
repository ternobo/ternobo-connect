<template>
	<wire-link class="profile-peeking" :href="'/' + page.slug" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<slot>
			<div class="profile-info-link">
				<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-xsm profile-image" img-class="profile-xsm" :src="page.profile" />
				<div class="page-info d-flex">
					<strong class="person-name d-flex align-items-center">
						<user-badges v-if="showBadges" :onlyOne="true" :badgeStatus="page.badge_status" />
						<span> {{ page.name }}</span>
					</strong>
					<small class="person-short-bio">{{ page.short_bio }}</small>
				</div>
			</div>
		</slot>

		<transition name="fade">
			<div class="profile-peeking-float" :class="`profile-peeking-position-${position}`" v-if="showFloat">
				<div class="header-section">
					<div class="profile-peeking-cover">
						<lazy-image class="profile-peeking-cover" :src="page.cover" />
					</div>
					<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-standard" img-class="profile-standard" :src="page.profile" />

					<user-badges :badgeStatus="page.badge_status" />
				</div>
				<div class="px-3 pb-3 d-flex flex-column">
					<strong class="text-gray-medium-dark font-demibold font-10">@{{ page.slug }}</strong>
					<strong class="person-name font-12 font-demibold">{{ page.name }}</strong>
					<small class="person-short-bio text-gray-medium-dark font-12">{{ page.short_bio }}</small>
					<small class="person-short-bio font-demibold text-gray-medium-dark font-10 mt-3">{{ page.location }}</small>
				</div>
			</div>
		</transition>
	</wire-link>
</template>

<script>
export default {
	props: { page: { required: true }, position: { default: "start" }, showBadges: { default: false } },
	data() {
		return {
			showFloat: false,
		};
	},

	methods: {
		onMouseEnter(e) {
			this.showFloat = true;
		},
		onMouseLeave(e) {
			this.showFloat = false;
		},
	},
};
</script>

<style>
</style>