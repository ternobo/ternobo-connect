<template>
	<div>
		<div class="card" v-if="$root.isDesktop">
			<div class="card-body px-4">
				<div class="d-flex justify-content-between align-items-center">
					<div class="d-flex align-items-center">
						<img class="slug-logo" src="/images/logo.svg" />
						<span>
							پروفایل <strong>{{ page.user ? page.user.first_name : page.name }}</strong>
						</span>
					</div>

					<div class="slugItem clickable" id="slugItem" v-if="!edit" v-clipboard="$APP_URL + '/' + page.slug">
						<span class="ml-2 clickable">
							{{ $APP_URL.replace("https://", "").replace("http://", "") + "/" + page.slug }}
						</span>
						<div class="icon clickable">
							<i class="font-18 material-icons-outlined">copy</i>
						</div>
					</div>

					<section class="slugItem bg-white" v-if="edit">
						<div class="ml-2 d-flex align-items-center" style="direction: ltr">
							<span class="mr-1">{{ $APP_URL.replace("https://", "").replace("http://", "") + "/" }}</span>
							<input type="text" class="p-1 font-14 text-left form-control" pattern="^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$" v-model="slug" />
						</div>
						<section class="icon">
							<i class="font-18 material-icons-outlined">copy</i>
						</section>
					</section>
				</div>
			</div>
		</div>
		<div class="d-flex align-items-center justify-content-between" v-else>
			<div class="d-flex align-items-center">
				<img src="/images/logo.svg" class="ml-1" width="16" />
				<span class="font-10" v-if="!edit">
					پروفایل <strong>{{ page.user ? page.user.first_name : page.name }}</strong>
				</span>
			</div>

			<div class="slugItem bg-white clickable" v-if="!edit" v-clipboard="$APP_URL + '/' + page.slug">
				<span class="ml-2 clickable">
					{{ $APP_URL.replace("https://", "").replace("http://", "") + "/" + page.slug }}
				</span>
				<div class="icon clickable">
					<i class="font-16 material-icons-outlined">copy</i>
				</div>
			</div>
			<section class="d-flex font-10 bg-white w-100 align-items-center mr-2 p-1" v-else>
				<input type="text" class="px-1 font-10 text-left border-0 form-control" style="height: 24px" pattern="^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$" v-model="slug" />
				<span class="text-muted pt-1">
					{{ $APP_URL.replace("https://", "").replace("http://", "") + "/" }}
				</span>
			</section>
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
