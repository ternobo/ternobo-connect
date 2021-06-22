<template>
	<div class="w-100">
		<SlugCard ref="contacts" :edit="edit" :page="page" v-model="slug"></SlugCard>
		<div class="contact-card" v-if="showSocials || showWebsites">
			<SocialsCard v-if="showSocials" :edit="edit" :page="page" ref="socials" />
			<WebsiteCard v-if="showWebsites" :edit="edit" :page="page" ref="websites" />
		</div>
	</div>
</template>

<script>
import SlugCard from "./SlugCard";
import WebsiteCard from "./WebsitesCard";
import SocialsCard from "./SocialsCard";
export default {
	computed: {
		showWebsites() {
			if (this.checkUser(this.page.user_id) || (this.page.contact_data != null && this.page.contact_data.websites != null && this.page.contact_data.websites.length > 0)) {
				return true;
			}
			return false;
		},
		showSocials() {
			if (this.checkUser(this.page.user_id) || (this.page.contact_data != null && this.page.contact_data.socials != null && this.page.contact_data.socials.length > 0)) {
				return true;
			}
			return false;
		},
	},
	methods: {
		getData() {
			if (this.$refs.contacts.validate()) {
				let data = {
					websites: this.$refs.websites.getData(),
					socials: this.$refs.socials.getData(),
					slug: this.slug,
				};
				return data;
			}
			return false;
		},
	},
	created() {
		this.slug = this.page.slug;
	},
	data() {
		return {
			slug: "",
			options: [],
		};
	},

	props: {
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
		edit: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		SlugCard,
		WebsiteCard,
		SocialsCard,
	},
};
</script>

<style>
</style>
