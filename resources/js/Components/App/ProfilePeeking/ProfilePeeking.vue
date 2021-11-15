<template>
	<wire-link class="profile-peeking" :href="'/' + page.slug" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<slot>
			<div class="profile-info-link">
				<lazy-image :loadingColor="skeletonOptions.profileColor" class="profile-xsm" img-class="profile-xsm" :src="page.profile" />
				<div class="page-info">
					<strong class="person-name">{{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
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
				</div>
				<div class="px-3 pb-3 d-flex flex-column">
					<strong class="text-gray-medium-dark font-demibold font-10">@{{ page.slug }}</strong>
					<strong class="person-name font-12 font-demibold">{{ page.name }}</strong>
					<small class="person-short-bio font-12">{{ page.short_bio }}</small>
				</div>
			</div>
		</transition>
	</wire-link>
</template>

<script>
export default {
	props: { page: { required: true }, position: { default: "start" } },
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