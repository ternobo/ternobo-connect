<template>
	<div class="infinite-scroll-container">
		<slot v-bind="{ items, loading }"></slot>
		<no-content v-if="items.length == 0 && !loading"></no-content>
		<infinite-loading v-if="next_page_url" @infinite="infiniteHandler"></infinite-loading>
	</div>
</template>

<script>
import NoContent from "./NoContent.vue";
export default {
	components: { NoContent },
	data() {
		return {
			items: [],
			next_page_url: null,
			loading: false,
		};
	},
	methods: {
		infiniteHandler($state) {
			if (this.next_page_url != null) {
				const config = {
					url: this.next_page_url,
					method: this.method,
				};
				axios(config)
					.then((response) => {
						response = response.data;
						if (response.status) {
							this.items = this.items.concat(response.data);
							this.next_page_url = response.links.next;
							$state.loaded();
							if (this.next_page_url == null) {
								$state.complete();
							}
						} else {
							$state.error();
						}
					})
					.catch((err) => {
						console.error(err);
						$state.error();
					});
			}
		},
	},
	mounted() {
		this.loading = true;
		const config = {
			url: this.endpoint,
			method: this.method,
		};
		axios(config)
			.then((response) => {
				response = response.data;
				if (response.status) {
					this.items = response.data.data;
					this.next_page_url = response.data.links.next;
					this.$emit("initalLoad", { total: response.data.meta.total });
				}
				this.loading = false;
			})
			.catch((err) => {
				console.error(err);
			})
			.then(() => {
				this.loading = false;
			});
	},
	props: {
		endpoint: {
			required: true,
		},
		method: {
			default: "post",
		},
	},
};
</script>