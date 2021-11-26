<template>
	<b-modal v-model="showModal" hide-footer @show="onShown" :title="__.choice('application.like', 2)" size="md" :centered="true">
		<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
		<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
			<div class="d-flex flex-column justify-center align-items-center w-100 err">
				<i @click="onShown" class="hover-dark text-muted material-icons-outlined">refresh</i>
				<br />
				<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
			</div>
		</div>
		<div class="likes-list" v-else v-infinite-scroll="loadMore" :infinite-scroll-distance="10">
			<transition-group name="flip-list">
				<div v-for="like in likes" :key="'like_' + like.id" class="like-item">
					<wire-link :href="like.page.visible ? '/' + like.page.slug : null" :linkDisabled="!like.page.visible" class="userinfo">
						<lazy-image class="mb-0" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :loadingColor="skeletonOptions.profileColor" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :src="like.page.profile"></lazy-image>
						<div class="page-name d-flex flex-column">
							<strong class="d-flex align-items-center">
								<user-badges class="me-1" :onlyOne="true" :badgeStatus="like.page.badge_status" />
								{{ like.page.name }}
							</strong>
							<span class="shortbio"> {{ like.page.short_bio }} </span>
						</div>
					</wire-link>
					<follow-button v-if="like.page.slug != user.username" :page="like.page.id"></follow-button>
				</div>
			</transition-group>
			<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
		</div>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
import ModalMixin from "../../Mixins/Modal";
import FollowButton from "../buttons/FollowButton.vue";
import LazyImage from "../LazyImage.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import PagesListLoading from "../Skeletons/PagesListLoading.vue";
export default {
	watch: {
		likesPaginate(newValue) {
			this.likes = newValue.data;
			this.next_page_url = newValue.next_page_url;
		},
	},
	computed: {
		...mapState(["user"]),
	},
	props: {
		item: {
			default: 0,
			required: true,
		},
		type: {
			default: "post",
			required: false,
		},
	},
	data() {
		return {
			error: false,
			loading: true,
			likesPaginate: null,
			likes: [],
			next_page_url: null,
			loadingMore: false,

			typeBasedData: {},
		};
	},
	methods: {
		loadMore($state) {
			const options = {
				method: "POST",
				url: this.next_page_url,
				data: this.typeBasedData,
			};
			axios(options)
				.then((response) => {
					const data = response.data.likes;
					if (data) {
						this.likes = this.likes.concat(data.data);
						this.next_page_url = data.next_page_url;
						$state.loaded();
					}
				})
				.catch((error) => {
					this.next_page_url = options.url;
					$state.error();
				})
				.then(() => {
					if (this.next_page_url == null) {
						$state.complete();
					}
				});
		},
		onShown() {
			this.likes = true;
			this.loading = true;
			this.error = false;

			Echo.private(`likes.post.${this.item}`).listen("LikeEvent", (data) => {
				this.likes.unshift(data.like);
			});

			if (this.type == "comment") {
				this.typeBasedData = {
					comment_id: this.item,
				};
			} else if (this.type == "feedbackreply") {
				this.typeBasedData = {
					feedbackreply_id: this.item,
				};
			} else {
				this.typeBasedData = {
					post_id: this.item,
				};
			}

			axios
				.post("/likes/get", this.typeBasedData)
				.then((response) => {
					this.likesPaginate = response.data.likes;
				})
				.catch((error) => {
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
	},
	components: { LazyImage, FollowButton, LoadingSpinner, PagesListLoading },

	mixins: [ModalMixin],
	name: "LikesModal",
};
</script>

<style></style>
