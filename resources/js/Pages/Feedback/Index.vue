<template>
	<base-layout>
		<div class="content-container-right">
			<div class="card mb-3 w-100">
				<div class="card-body">
					<div class="d-flex align-items-center justify-content-between" style="min-height: 39px">
						<h2 class="font-16 bold m-0">ما چطور می‌توانیم کیفیت خدماتمان را در ترنوبو بهبود ببخشیم؟</h2>
						<transition name="fade">
							<button @click="showNewIdea = true" v-if="!showNewIdea" class="btn bold btn-action rounded-pill">
								<i class="material-icons-outlined">emoji_objects</i>
								ثبت ایده جدید
							</button>
						</transition>
					</div>
					<transition name="slide">
						<div v-if="showNewIdea">
							<div class="d-flex align-items-center">
								<input type="text" class="form-control bg-body border-0" placeholder="ایده‌ی خودتان را با ما به اشتراک بگذارید" max="150" maxlength="150" v-model="ideaTitle" />
								<div class="d-flex w-25 align-items-center">
									<span class="mx-2"> {{ 150 - ideaTitle.length }} </span>
									<b-progress :value="(ideaTitle.length / 150) * 100" :max="100" class="w-100"></b-progress>
								</div>
							</div>
							<div class="py-2">
								<textarea-autosize v-model="ideaDescription" maxlength="2500" :min-height="230" class="form-control" placeholder="کمی بیشتری در رابطه با ایده خودتان توضیح دهید...(اختیاری)"></textarea-autosize>
							</div>
							<div class="d-flex align-items-center flex-row-reverse pt-3">
								<loading-button :loading="loading" class="btn btn-primary" @click.native="saveIdea">ارسال</loading-button>
								<button :disabled="loading" class="btn btn-transparent text-light" @click="showNewIdea = false">لغو</button>
							</div>
						</div>
					</transition>
				</div>
			</div>
			<div class="tabs">
				<ul class="default position-relative">
					<li @click="status = 'voting'" :class="{ 'is-active': status === 'voting' }">
						<a>درحال رای‌گیری</a>
					</li>
					<li @click="status = 'scheduled'" :class="{ 'is-active': status === 'scheduled' }">
						<a>برنامه ریزی شده</a>
					</li>
					<li @click="status = 'done'" :class="{ 'is-active': status === 'done' }">
						<a>انجام شده</a>
					</li>

					<li style="left: 0" class="position-absolute" @click="status = 'my-ideas'" :class="{ 'is-active': status === 'my-ideas' }">
						<a class="active"><i class="material-icons">outlined_flag</i> پیشنهادات من</a>
					</li>
				</ul>
			</div>
			<div class="ideas" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="12">
				<div class="item-filters mb-3 mt-2">
					<div class="filter-item" :class="{ active: filter == 'mostnew' }" @click="filter = 'mostnew'"><i class="material-icons-outlined">new_releases</i> جدید‌ترین‌ها</div>
					<div class="filter-item" :class="{ active: filter == 'fav' }" @click="filter = 'fav'"><i class="material-icons-outlined">favorite_border</i> محبوب‌ترین‌ها</div>
				</div>
				<FeedbackCard v-for="idea in ideasArray" :key="idea.id" :idea="idea"></FeedbackCard>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
					<loading-spinner class="image__spinner" />
				</div>
				<div v-if="next_page_url === null && !loadingPage">
					<no-content> هیچ ایده‌ای وجود ندارد </no-content>
				</div>
			</div>
		</div>
		<sidebar-left>
			<div class="card">
				<div class="card-body px-2 py-1">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
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
			if (this.status == "my-ideas") {
				this.loadMyIdeas();
			} else {
				let parms = {
					status: this.status,
				};

				if (newValue == "fav") {
					parms.fav = true;
				}

				this.ideasArray = [];
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.$APP_URL + "/ideas?" + this.encodeQueryData(parms), false)
					.then((response) => {
						const data = response.ideas;
						if (data) {
							this.ideasArray = data.data;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.log(error);
						self.$nextTick(() => {
							self.filter = oldValue;
						});
						this.ideasArray = this.ideas.data;
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

			if (newValue == "my-ideas") {
				this.loadMyIdeas();
			} else {
				this.ideasArray = [];
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.$APP_URL + "/ideas?" + this.encodeQueryData(parms), false)
					.then((response) => {
						const data = response.ideas;
						if (data) {
							this.ideasArray = data.data;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.log(error);
						self.$nextTick(() => {
							self.status = oldValue;
						});
						this.ideasArray = this.ideas.data;
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
	},
	created() {
		this.ideasArray = this.ideas.data;
		this.page = this.ideas.current_page;
		this.next_page_url = this.ideas.next_page_url;
	},
	methods: {
		loadMyIdeas() {
			let parms = {
				onlyMy: true,
			};

			if (this.filter == "fav") {
				parms.fav = true;
			}

			this.ideasArray = [];
			this.loadingPage = true;
			this.$store.state.ternoboWireApp
				.getData(this.$APP_URL + "/ideas?" + this.encodeQueryData(parms), false)
				.then((response) => {
					const data = response.ideas;
					if (data) {
						this.ideasArray = data.data;
						this.page = data.current_page;
						this.next_page_url = data.next_page_url;
					}
				})
				.catch((error) => {
					console.log(error);
					self.$nextTick(() => {
						// self.filter = oldValue;
					});
					this.ideasArray = this.ideas.data;
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
						const data = response.data.props.ideas;
						if (data) {
							this.ideasArray = this.ideasArray.concat(data.data);
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
		saveIdea() {
			const $this = this;
			this.loading = true;
			axios
				.post("/ideas", {
					title: this.ideaTitle,
					description: this.ideaDescription,
				})
				.then(function (response) {
					if (response.data.result) {
						$this.ideaDescription = null;
						$this.ideaTitle = "";
						$this.ideasArray.unshift(response.data.idea);
					} else {
						const errors = response.data.errors;
						Object.keys(errors).forEach(function (item, index) {
							$this.toast(errors[item][0]);
						});
					}
					$this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
					$this.toast("خطا در برقراری ارتباط");
					$this.loading = false;
				});
		},
	},
	data() {
		return {
			showNewIdea: undefined,
			ideaTitle: "",
			ideaDescription: "",
			loading: false,
			ideasArray: [],
			page: 1,
			next_page_url: undefined,
			loadingPage: false,
			status: "voting",

			filter: "mostnew",
		};
	},
	props: {
		ideas: {
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
