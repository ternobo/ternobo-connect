<template>
	<div>
		<add-website-modal @add="addWebsite" :show.sync="showAddWebsite" :websites="websites" :websiteOptions="options"></add-website-modal>
		<h5 class="contact--title"><i class="material-icons">public</i>{{ __.choice("user-profile.website", 1) }}</h5>
		<div v-if="loading" class="contact-list">
			<skeleton width="238px" height="66px" v-for="i in 3" :key="`skeleton_${i}`" />
		</div>

		<div class="contact-list p-0">
			<WebsiteItem @deleted="onDelete(index)" :edit="edit" v-for="(website, index) in websites" :website.sync="websites[index]" :key="website.id"></WebsiteItem>
			<button v-if="edit && websites.length <= 9" @click="showAddWebsite = true" class="rounded-add-btn btn-light-action"><i class="material-icons">add</i></button>
			<div class="no-contact-container" v-if="websites.length < 1 && !loading">
				<span class="font-16 text-grey">موردی ثبت نشده</span>
			</div>
		</div>
	</div>
</template>

<script>
import AddWebsiteModal from "./AddWebsiteModal.vue";
import WebsiteItem from "./Items/WebsiteItem.jsx";
import { v4 as uuidv4 } from "uuid";
export default {
	methods: {
		onDelete(index) {
			this.websites.splice(index, 1);
		},
		addWebsite(website) {
			this.websites.push({
				id: "social_" + uuidv4(),
				...website,
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
			return this.websites;
		},
	},
	data() {
		return {
			loading: true,
			options: [],
			websites: [],
			showAddWebsite: false,
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
			if (this.page.contact_data != null && this.page.contact_data.websites) {
				this.websites = this.page.contact_data.websites;
			}
			this.loading = false;
		});
	},
	components: {
		WebsiteItem,
		AddWebsiteModal,
	},
};
</script>
