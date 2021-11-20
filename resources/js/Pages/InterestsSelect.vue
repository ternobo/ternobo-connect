<template>
	<div class="login-page">
		<div class="position-sticky" style="top: 0; z-index: 1000; background: #f5f5f5">
			<div class="login-header">
				<div class="logo-container">
					<div href="/" class="logodesktop" v-if="$root.isDesktop">
						<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
					</div>
					<div href="/" class="logo-sm" v-if="!$root.isDesktop">
						<img src="/images/logo.svg" class="ms-2" />
					</div>
					<span class="beta-badge">Beta</span>
				</div>
				<div class="login-header-menu">
					<loading-button :loading="loading" class="btn btn-text" @click.native="skip">{{ __.get("application.skip") }}</loading-button>
					<loading-button :loading="loading" class="btn btn-primary" @click.native="next">{{ __.get("application.done") }}</loading-button>
				</div>
			</div>
		</div>
		<div class="login-content flex-column">
			<div class="text-center mt-4 mb-8">
				<h2 class="font-18 mb-4">{{ __.get("interest-page.title") }}</h2>
				<p class="text-center" v-html="__.get('interest-page.subtitle')"></p>
			</div>
			<div class="community-group mb-7" v-for="community in communities" :key="`community_group_${community.id}`">
				<h2 class="text-center d-flex align-items-center w-100 justify-content-center mb-4"><img :src="`/${community.icon}`" width="24" class="me-3" /> {{ community.name }}</h2>
				<div class="d-flex justify-content-center align-items-center flex-wrap">
					<div class="community-tag clickable" v-for="community_tag in community.tags" :class="{ active: selectedInterests.includes(community_tag.name) }" @click="toggleSelect(community_tag.name)" :key="`community_tag_${community_tag.id}`">
						<img :src="`/${community_tag.icon}`" width="24" class="me-3" />
						{{ community_tag.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageInfoCard from "../Components/Cards/PageInfoCard.vue";
import LoadingSpinner from "../Components/LoadingSpinner.vue";
import PageinfocardsSkeleton from "../Components/Skeletons/PageinfocardsSkeleton.vue";

export default {
	components: { PageInfoCard, LoadingSpinner, PageinfocardsSkeleton },
	props: {
		communities: { default: [] },
	},
	methods: {
		toggleSelect(tag) {
			if (this.selectedInterests.includes(tag)) {
				let index = this.selectedInterests.indexOf(tag);
				this.selectedInterests.splice(index, 1);
			} else {
				this.selectedInterests.push(tag);
			}
		},
		next() {
			this.loading = true;
			axios
				.post("/interests/set", { interests: this.selectedInterests })
				.then((response) => {
					console.log(response.data);
					window.location = "/feed";
				})
				.catch((err) => console.log(err))
				.then(() => (this.loading = false));
		},
		skip() {
			this.loading = true;
			axios
				.post("/interests/skip")
				.then((response) => {
					console.log(response.data);
					window.location = "/feed";
				})
				.catch((err) => console.log(err))
				.then(() => (this.loading = false));
		},
	},
	data() {
		return {
			loading: false,
			pages: [],
			followings: 0,
			next_page_url: null,
			loading_data: false,
			loading_next_page: false,

			selectedInterests: [],
		};
	},
	created() {
		this.loading_data = true;
		axios
			.post("/follow-people/get")
			.then((response) => {
				this.pages = response.data.pages.data;
				this.followings = response.data.followings;
				this.next_page_url = response.data.pages.next_page_url;
			})
			.catch((err) => {
				this.toast(__.get("messages.connection-error"));
				console.log(err);
			})
			.then(() => {
				this.loading_data = false;
			});
	},
	name: "InterestsSelect",
};
</script>

<style lang="scss" scoped>
.followed-peoplenum {
	letter-spacing: 5px;
}
.login-header-menu {
	align-items: center;
	margin: 0 !important;
	button {
		height: 40px;
	}
}
.login-header-menu > * {
	padding: 4px 32px !important;
}
</style>