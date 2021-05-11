<template>
	<div class="socials-container">
		<h5 class="contact--title"><i class="material-icons">alternate_email</i>راه‌های ارتباطی</h5>
		<div v-if="loading" class="contact-list">
			<Skeleton width="238px" height="66px" v-for="i in 1" :key="`skeleton_${i}`" />
		</div>
		<div class="no-contact-container" v-else-if="options.google == undefined && !edit">
			<span class="font-16 text-grey">موردی ثبت نشده</span>
		</div>
		<div class="contact-list p-0" v-else>
			<div @click="cardClickAction" class="contact-item clickable" :class="{ 'border-only': options.google == undefined }">
				<div>
					<i class="material-icons clickable text-grey" v-if="options.google != undefined && edit">close</i>
					<i class="material-icons clickable text-action" v-else-if="edit">add</i>
					<i class="material-icons clickable text-grey" v-else>launch</i>
				</div>
				<div class="socail-info">
					<span>Gmail</span>
					<img src="/images/gmail-logo.png" width="24px" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
	components: { Skeleton },
	methods: {
		cardClickAction() {
			if (this.edit && this.options.google == undefined) {
				this.addSocial("google");
			} else if (this.edit) {
				const h = this.$createElement;

				this.confirmDialog(["ایا از حذف ", h("strong", {}, ["Gmail"]), " اطمینان دارید؟"]).then((value) => {
					if (value) {
						this.disconnect();
					}
				});
			} else {
				this.openGmail();
			}
		},
		openGmail() {
			if (!this.edit) {
				window.open(`mailto:${this.options.google.email}`);
			}
		},
		disconnect() {
			this.options = {};
		},
		addSocial(name) {
			let accountWindow = window.open(`/connect/${name}/login`, "Login", "height=700,width=700");
			accountWindow.addEventListener("beforeunload", () => {
				this.loading = true;
				axios.post("/contact/social-option").then((response) => {
					this.options = response.data.options;
					this.loading = false;
				});
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
		this.loading = true;
		axios.post("/contact/social-option").then((response) => {
			this.options = response.data.options;
			this.loading = false;
		});
	},
};
</script>
