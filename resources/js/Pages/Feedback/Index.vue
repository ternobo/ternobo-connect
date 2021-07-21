<template>
	<base-layout :class="{ 'justify-content-center': pages.length < 1 }">
		<div class="content-container-right">
			<div class="new-feedback-card">
				<div class="card-body">
					<div class="how-to-improve-header" style="min-height: 39px">
						<strong>{{ __.get("feedbacks.feedback-q") }}</strong>
						<transition name="fade">
							<button @click="showNewFeedback = true" v-if="!showNewFeedback" class="btn btn-action-light feedback-button">
								<i class="material-icons-outlined">emoji_objects</i>
								{{ __.get("feedbacks.submit-feedback") }}
							</button>
						</transition>
					</div>
					<transition name="slide">
						<div v-if="showNewFeedback">
							<div class="how-to-improve-title-input">
								<div class="progress-container">
									<span class="mx-2"> {{ 150 - feedbackTitle.length }} </span>
									<b-progress :value="(feedbackTitle.length / 150) * 100" :max="100"></b-progress>
								</div>
								<input type="text" class="form-control text-input" :placeholder="__.get('feedbacks.share-feedback')" max="150" maxlength="150" v-model="feedbackTitle" />
							</div>
							<div class="pb-2 pt-4 d-flex flex-column">
								<div class="d-flex justify-content-between mb-3">
									<strong class="font-demibold"
										>{{ __.get("feedbacks.feedback-describe") }} <span class="text-superlight">{{ __.get("feedbacks.optional") }}</span></strong
									>
									<div class="progress-container">
										<span class="mx-2"> {{ 2500 - feedbackDescription.length }} </span>
										<b-progress :value="(feedbackDescription.length / 2500) * 100" :max="100"></b-progress>
									</div>
								</div>
								<textarea-autosize v-model="feedbackDescription" maxlength="2500" :min-height="230" class="form-control"></textarea-autosize>
							</div>
							<div class="d-flex align-items-center flex-row-reverse pt-3">
								<loading-button :loading="loading" class="btn btn-action-light rounded-0" :clas="{ disabled: feedbackTitle.length < 3 }" :disabled="feedbackTitle.length < 3" @click.native="saveFeedback">{{ __.get("application.submit") }}</loading-button>
								<button class="btn btn-transparent text-grey" @click="showNewFeedback = false">{{ __.get("application.cancel") }}</button>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<div class="tabs pt-3">
				<ul class="default position-relative">
					<li @click="status = 'voting'" :class="{ 'is-active': status === 'voting' }">
						<a class="font-16">{{ __.get("feedbacks.voting") }}</a>
					</li>
					<li @click="status = 'scheduled'" :class="{ 'is-active': status === 'scheduled' }">
						<a class="font-16">{{ __.get("feedbacks.scheduled") }}</a>
					</li>
					<li @click="status = 'done'" :class="{ 'is-active': status === 'done' }">
						<a class="font-16">{{ __.get("feedbacks.done") }}</a>
					</li>

					<li class="position-absolute end-0" @click="status = 'my-feedbacks'" :class="{ 'is-active': status === 'my-feedbacks' }">
						<a class="active font-16">
							<i class="material-icons me-2">{{ status === "my-feedbacks" ? "flag" : "outlined_flag" }}</i> {{ __.get("feedbacks.my-suggestions") }}
						</a>
					</li>
				</ul>
			</div>
			<div class="row mt-2" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="12">
				<div class="w-100">
					<div class="item-filters">
						<div class="filter-item" :class="{ active: filter == 'mostnew' }" @click="filter = 'mostnew'"><i class="material-icons-outlined">new_releases</i> {{ __.get("feedbacks.newest") }}</div>
						<div class="filter-item" :class="{ active: filter == 'fav' }" @click="filter = 'fav'"><i class="material-icons-outlined">favorite_border</i> {{ __.get("feedbacks.most-popular") }}</div>
					</div>
				</div>
				<div class="w-100">
					<FeedbackCard class="mb-3" v-for="feedback in feedbacksArray" :key="feedback.id" :feedback="feedback"></FeedbackCard>

					<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
						<loading-spinner class="image__spinner" />
					</div>
					<div v-if="next_page_url === null && !loadingPage && feedbacksArray.length > 4">
						<no-content> هیچ بازخورد‌ دیگری ندارد </no-content>
					</div>
				</div>
			</div>
		</div>
		<sidebar-left v-if="pages.length > 0">
			<div class="card mb-3">
				<div class="people-suggestion-card-body card-body">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
			<app-footer></app-footer>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import FeedbackCard from "../../Components/Feedback/FeedbackCard";
import NoContent from "../../Components/NoContent";

export default {
	watch: {
		filter(newValue, oldValue) {
			if (this.status == "my-feedbacks") {
				this.loadMyFeedbacks();
			} else {
				let parms = {
					status: this.status,
				};

				if (newValue == "fav") {
					parms.fav = true;
				}

				this.feedbacksArray = [];
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.$APP_URL + "/feedbacks?" + this.encodeQueryData(parms), false)
					.then((response) => {
						const data = response.feedbacks;
						if (data) {
							this.feedbacksArray = data.data;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.log(error);
						self.$nextTick(() => {
							self.filter = oldValue;
						});
						this.feedbacksArray = this.feedbacks.data;
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
		status(newValue, oldValue) {
			let parms = {
				status: newValue,
			};

			if (this.filter == "fav") {
				parms.fav = true;
			}

			if (newValue == "my-feedbacks") {
				this.loadMyFeedbacks();
			} else {
				this.feedbacksArray = [];
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.$APP_URL + "/feedbacks?" + this.encodeQueryData(parms), false)
					.then((response) => {
						const data = response.feedbacks;
						if (data) {
							this.feedbacksArray = data.data;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.log(error);
						self.$nextTick(() => {
							self.status = oldValue;
						});
						this.feedbacksArray = this.feedbacks.data;
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
	},
	created() {
		this.feedbacksArray = this.feedbacks.data;
		this.page = this.feedbacks.current_page;
		this.next_page_url = this.feedbacks.next_page_url;
	},
	methods: {
		loadMyFeedbacks() {
			let parms = {
				onlyMy: true,
			};

			if (this.filter == "fav") {
				parms.fav = true;
			}

			this.feedbacksArray = [];
			this.loadingPage = true;
			this.$store.state.ternoboWireApp
				.getData(this.$APP_URL + "/feedbacks?" + this.encodeQueryData(parms), false)
				.then((response) => {
					const data = response.feedbacks;
					if (data) {
						this.feedbacksArray = data.data;
						this.page = data.current_page;
						this.next_page_url = data.next_page_url;
					}
				})
				.catch((error) => {
					console.log(error);
					this.feedbacksArray = this.feedbacks.data;
				})
				.then(() => {
					this.loadingPage = false;
				});
		},
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				this.loadingPage = true;
				let url = this.next_page_url;
				this.$store.state.ternoboWireApp
					.getData(url, false)
					.then((response) => {
						const data = response.data.props.feedbacks;
						if (data) {
							this.feedbacksArray = this.feedbacksArray.concat(data.data);
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.log(error);
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
		saveFeedback() {
			this.loading = true;
			axios
				.post("/feedbacks", {
					title: this.feedbackTitle,
					description: this.feedbackDescription,
				})
				.then((response) => {
					if (response.data.result) {
						this.feedbackDescription = "";
						this.feedbackTitle = "";
						this.feedbacksArray.unshift(response.data.feedback);
						this.showNewFeedback = false;
					} else {
						const errors = response.data.errors;
						Object.keys(errors).forEach(function (item, index) {
							this.toast(errors[item][0]);
						});
					}
					this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
					$this.toast(__.get("messages.connection-error"));
					$this.loading = false;
				});
		},
	},
	data() {
		return {
			showNewFeedback: undefined,
			feedbackTitle: "",
			feedbackDescription: "",
			loading: false,
			feedbacksArray: [],

			page: 1,
			next_page_url: undefined,
			loadingPage: false,
			status: "voting",

			filter: "mostnew",
		};
	},
	props: {
		feedbacks: {
			type: Object,
			default: undefined,
		},
		pages: {
			type: Array,
			default: undefined,
		},
	},
	layout: AppLayout,
	components: {
		FeedbackCard,
		NoContent,
	},
};
</script>
