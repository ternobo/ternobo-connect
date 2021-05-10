<template>
	<div class="slug-card">
		<div class="slug-info">
			<img src="/images/logo_24px.svg" width="24" />
			<span>پروفایل</span>
			<strong>{{ page.user.first_name }}</strong>
		</div>
		<div class="slug-data">
			<div class="slug-data-edit" v-if="edit">
				<span>{{ url }}/</span>
				<material-text-field class="material--sm" v-model="slug" />
			</div>
			<div class="slug-data-view" v-else>
				<i class="material-icons-outlined clickable" v-clipboard="slug">file_copy</i>
				<span>{{ url }}/</span>
				<strong>{{ slug }}</strong>
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
		url() {
			return this.$APP_URL.replace("http://", "").replace("https://");
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
