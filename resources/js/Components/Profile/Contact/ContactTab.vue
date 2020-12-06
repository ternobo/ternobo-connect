<template>
	<div class="w-100">
		<div class="row" v-if="$root.isDesktop">
			<div class="col-md-4" v-if="showWebsites || showSocials">
				<WebsiteCard v-if="showWebsites" ref="websites" :page="page" :edit="edit"></WebsiteCard>
				<SocialsCard v-if="showSocials" ref="socials" class="mt-3" :page="page" :edit="edit"></SocialsCard>
			</div>
			<div class="pr-4" :class="{ 'col-md-12': !showWebsites && !showSocials, 'col-md-8': showWebsites || showSocials }">
				<SlugCard :edit="edit" :page="page" v-model="slug"></SlugCard>
				<ContactCard v-if="showContacts" ref="contacts" class="mt-3" :page="page" :edit="edit"></ContactCard>
			</div>
		</div>
		<div v-else>
			<SlugCard :edit="edit" :page="page" v-model="slug"></SlugCard>
			<ContactCard v-if="showContacts" ref="contacts" class="mt-3" :page="page" :edit="edit"></ContactCard>
			<WebsiteCard v-if="showWebsites" ref="websites" class="mt-3" :page="page" :edit="edit"></WebsiteCard>
			<SocialsCard v-if="showSocials" ref="socials" class="mt-3" :page="page" :edit="edit"></SocialsCard>
		</div>
	</div>
</template>

<script>
import SlugCard from "./SlugCard";
import ContactCard from "./ContactCard";
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
		showContacts() {
			if (this.checkUser(this.page.user_id) || (this.page.contact_data != null && this.page.contact_data.contacts != null && this.page.contact_data.contacts.length > 0)) {
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
			if (this.$refs.contacts.validate() && this.$refs.socials.validate() && this.$refs.websites.validate()) {
				let data = {
					websites: this.$refs.websites.getData(),
					socials: this.$refs.socials.getData(),
					contacts: this.$refs.contacts.getData(),
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
		ContactCard,
		SocialsCard,
	},
};
</script>

<style>
</style>
