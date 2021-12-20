<template>
	<SocialLink :tag="edit || !connected ? 'div' : 'a'" target="_blank" @click.native="clickAction" :href="link" class="contact-item clickable" :class="{ 'border-only': !connected }">
		<div>
			<i class="material-icons clickable text-grey" v-if="connected && edit">close</i>
			<i class="material-icons clickable text-action" v-else-if="edit">add</i>
			<i class="material-icons clickable text-grey" v-else>launch</i>
		</div>
		<div class="socail-info">
			<span>{{ social.driver }}</span>
			<img :src="social.icon" width="24px" />
		</div>
	</SocialLink>
</template>

<script>
import SocialLink from "./SocialLink";
export default {
	methods: {
		clickAction() {
			if (this.edit) {
				if (this.connected) {
					this.$emit("disconnect");
				} else {
					this.addSocial(this.social.driver);
				}
			}
		},
		addSocial(name) {
			window.open(`/connect/${name}/login`, "Login", "height=700,width=700");
		},
	},
	components: { SocialLink },
	computed: {
		connected() {
			return this.social.account != null;
		},
		link() {
			if (this.social.account) {
				return `${this.social.link ?? ""}${this.social.account.meta.value}`;
			}
			return ``;
		},
	},

	props: ["social", "edit"],
};
</script>

<style>
</style>
