<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
			<div class="notifications" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
				<div class="notifications-group" v-for="group in groupsKey" :key="'notifcation_group_' + group">
					<h3>{{ group }}</h3>
					<div class="notification-item" :key="'notification_' + getId(notification)" v-for="notification in groupedNotifications[group]">
						<notification :notificationGroup="notification"></notification>
					</div>
				</div>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
					<loading-spinner class="image__spinner" />
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
import NoContent from "../Components/NoContent";
import Notification from "../Components/Notifications/Notification";
import { v4 as uuidv4 } from "uuid";
import moment from "jalali-moment";
export default {
	watch: {
		notifications() {
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
			next_page_url: undefined,
			loadingPage: false,

			todayEnd: false,
		};
	},
	computed: {
		groupsKey() {
			return Object.keys(this.groupedNotifications);
		},
		groupedNotifications() {
			return _.groupBy(this.notificationsArray, function (item) {
				if (moment(item.updated_at).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
					return "امروز";
				} else if (window.moment.isSameWeek(item.updated_at, moment())) {
					return "این هفته";
				} else {
					return "این ماه";
				}
			});
		},
	},
	methods: {
		getId(notif) {
			return uuidv4();
		},
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.next_page_url, false)
					.then((response) => {
						const data = response.notifications;
						if (data) {
							this.notificationsArray = this.notificationsArray.concat(data.data);
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
	},
	components: {
		NoContent,
		Notification,
		Notification,
	},
	layout: AppLayout,
};
</script>

<style></style>
