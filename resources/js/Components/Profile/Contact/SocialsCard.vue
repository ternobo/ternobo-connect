<template>
	<div>
		<div class="d-flex mb-2 aling-items-center justify-content-between">
			<h5 class="contact--title"><i class="material-icons">alternate_email</i> راه‌های ارتباطی</h5>
		</div>

		<div v-if="loading" class="contact-list">
			<Skeleton width="238px" height="66px" v-for="i in 1" :key="`skeleton_${i}`" />
		</div>
		<div class="no-contact-container" v-else-if="options.google == undefined && !edit">
			<span class="font-16 text-grey">موردی ثبت نشده</span>
		</div>
		<div class="contact-list p-0" v-else>
			<div @click="openGmail" class="contact-item" :class="{ clickable: !edit }">
				<div>
					<i class="material-icons clickable hover-danger text-grey" v-if="options.google != undefined && edit" @click="disconnect">close</i>
					<i class="material-icons clickable hover-danger text-action" v-else-if="edit" @click="addSocial('google')">add</i>
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
		openGmail() {
			if (!this.edit) window.open(`mailto:${this.options.google.email}`);
		},
		disconnect() {
			this.options = {};
		},
		addSocial(name) {
			let accountWindow = window.open(`/connect/${name}/login`, "Login", "height=700,width=700");
			accountWindow.onbeforeunload = () => {
				this.loading = true;
				axios.post("/contact/social-option").then((response) => {
					this.options = response.data.options;
					this.loading = false;
				});
			};
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
