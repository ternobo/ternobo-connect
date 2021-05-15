<template>
	<div class="slug-card">
		<div class="slug-info">
			<img src="/images/logo_24px.svg" width="24" />
			<span>پروفایل</span>
			<strong>{{ page.user.first_name }}</strong>
		</div>
		<div class="slug-data">
			<div class="slug-data-edit" v-if="edit">
				<span>{{ websiteUrl }}</span>
				<material-text-field class="material--sm" v-model="slug" />
			</div>
			<div key="slug-data-view-element" v-clipboard="slugUrl" class="slug-data-view clickable" v-else>
				<i class="material-icons-outlined">file_copy</i>
				<strong>@{{ slug }}</strong>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.slug = this.page.slug;
	},
	data() {
		return {
			slug: "",
		};
	},
	watch: {
		slug() {
			this.$emit("input", this.slug);
		},
	},
	computed: {
		websiteUrl() {
			return `${window.origin}/`;
		},
		slugUrl() {
			return `${window.origin}/${this.slug}`;
		},
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
	methods: {
		validate() {
			return this.slug.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
		},
	},
};
</script>

<style>
</style>
