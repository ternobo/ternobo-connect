<template>
	<div class="socials-container">
		<h5 class="contact--title"><i class="material-icons">alternate_email</i>راه‌های ارتباطی</h5>
		<div v-if="loading" class="contact-list">
			<Skeleton width="238px" height="66px" v-for="i in 1" :key="`skeleton_${i}`" />
		</div>
		<div class="no-contact-container" v-else-if="activeSocials.length < 1 && !edit">
			<span class="font-16 text-grey">موردی ثبت نشده</span>
		</div>
		<div class="contact-list p-0" v-else>
			<social-item v-for="(social, index) in activeSocials" @disconnect="disconnect(index)" :key="`social_item_${social.id}`" :social="social" :edit="edit"></social-item>
		</div>
	</div>
</template>

<script>
import SocialItem from "./Items/SocialItem";

export default {
	components: { SocialItem },
	computed: {
		activeSocials() {
			return this.options.filter((social) => social.account != null || this.edit);
		},
	},
	methods: {
		loadOptions() {
			this.loading = true;
			axios.post(`/contact/social-option/${this.page.id}`).then((response) => {
				this.options = response.data.options;
				this.loading = false;
			});
		},
		disconnect(index) {
			this.options[index].account = null;
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
			return this.options;
		},
	},
	data() {
		return {
			loading: true,
			options: {},
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
		if (this.$store.state.user) {
			Echo.private("user." + this.$store.state.user.id).listen("ReloadSocialOptions", () => {
				this.loadOptions();
			});
		}
		this.loadOptions();
	},
};
</script>
