<template>
	<div class="card">
		<div class="py-3 card-body">
			<div class="d-flex mb-2 aling-items-center justify-content-between">
				<h5 class="contact--title">وب‌سایت‌ها</h5>
				<button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit && usableOptions.length > 0 && websites.length < options.length" @click="addWebsite">
					<i class="material-icons">add</i>
				</button>
			</div>

			<ul class="websites-list p-0" v-if="loading">
				<li>
					<Skeleton :count="4" :heigth="25" />
				</li>
			</ul>
			<ul class="websites-list p-0" v-else>
				<WebsiteItem @deleted="onDelete(index)" @input="updateData" :options="usableOptions" :edit="edit" v-for="(website, index) in websites" :website="website" :key="'contact_item_num_' + website.id"></WebsiteItem>
			</ul>
		</div>
	</div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import WebsiteItem from "./Items/WebsiteItem";
export default {
	methods: {
		onDelete(index) {
			console.log(index);
			this.websites.splice(index, 1);
		},
		addWebsite() {
			if (this.usableOptions.length > 0) {
				this.websites.push({
					name: "",
					id: "social_" + Math.round(new Date().getTime()),
					isNew: true,
				});
			}
		},
		updateData() {
			this.websites = this.getData();
			this.usableOptions = [];
			this.options.forEach((option) => {
				let canAdd = true;
				this.websites.forEach((contact) => {
					if (contact.option != null) {
						if (contact.option.id == option.id) {
							canAdd = false;
						}
					}
				});
				if (canAdd) {
					this.usableOptions.push(option);
				}
			});
		},
		validate() {
			return this.$children.every((item) => {
				if (item.validate()) {
					return true;
				} else {
					return false;
				}
			});
		},
		getData() {
			let data = [];
			this.$children.forEach((item) => {
				data.push(item.value);
			});
			return data;
		},
	},
	data() {
		return {
			loading: true,
			options: [],
			usableOptions: [],
			websites: [],
		};
	},
	props: {
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	mounted() {
		this.loading = true;
		axios.post("/contact/website-option").then((response) => {
			this.options = response.data.options;
			if (this.page.contact_data != null) {
				this.websites = this.page.contact_data.websites;
			}
			this.$nextTick(() => {
				this.options.forEach((option) => {
					let canAdd = true;
					this.websites.forEach((social) => {
						if (social.option.id == option.id) {
							canAdd = false;
						}
					});
					if (canAdd) {
						this.usableOptions.push(option);
					}
				});
			});

			this.loading = false;
		});
	},
	components: {
		Skeleton,
		WebsiteItem,
	},
};
</script>
