<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
			<div class="card">
				<div class="card-body py-1" v-if="notificationsArray.length > 0">
					<Notification v-for="notification in notificationsArray" :notification="notification" :key="notification.id"></Notification>
				</div>
				<div class="card-body text-center" v-else>
					<span class="font-18 text-muted">هیچ اعلان وجود ندارد</span>
				</div>
			</div>
		</div>
		<sidebar-left v-if="$root.isDesktop">
			<app-footer class="sticky-aside"></app-footer>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import PostCard from "../Components/PostCard/PostCard";
import NoContent from "../Components/NoContent";
import Notification from "../Components/Notifications/Notification";

export default {
	watch: {
		notifications(newValue) {
			this.notificationsArray = this.notifications.data;
		},
	},
	created() {
		this.notificationsArray = this.notifications.data;
		this.page = this.notifications.current_page;
		this.next_page_url = this.notifications.next_page_url;
	},
	mounted() {
		document.addEventListener("notification:new", (e) => {
			this.notificationsArray.unshift(e.detail.notification);
		});
	},
	data() {
		return {
			notificationsArray: [],
			page: 1,
			next_page_url: undefined,
			loadingPage: false,
		};
	},
	methods: {
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.next_page_url, false)
					.then((response) => {
						const data = response.notifications;
						if (data) {
							this.notificationsArray = this.notificationsArray.concat(data.data);
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.error(error);
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
	},
	name: "Notifications",
	props: {
		notifications: {
			type: Object,
			default: undefined,
		},
		pages: {
			type: Array,
			defautl: undefined,
		},
	},
	components: {
		NoContent,
		Notification,
	},
	layout: AppLayout,
};
</script>

<style></style>
