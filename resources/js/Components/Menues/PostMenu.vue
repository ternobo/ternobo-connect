<template>
	<div>
		<report-modal @reported="$emit('reported')" :show.sync="showReport" :post-id="post.id"></report-modal>
		<div v-if="$root.isDesktop">
			<confirm-modal title="دنبال نکردن" @confirm="unfollow" :show.sync="showConfirm"> آیا دنبال نکردن {{ post.page.name }} تایید می‌کنید. </confirm-modal>
			<dropdown-menu size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
				<template v-slot:button>
					<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
				</template>
				<dropdown-item v-clipboard="$APP_URL + '/posts/' + post.id">
					<i class="material-icons text-dark">link</i>
					<strong>{{ __.get("content/posts.copy-post-link") }}</strong>
				</dropdown-item>
				<dropdown-item @click="$emit('edit')" v-if="checkUser(post.page.user_id) && post.type != 'article'">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined text-dark">edit</i>
						<strong> {{ __.get("application.edit") }} </strong>
					</div>
				</dropdown-item>
				<dropdown-item @click.native="$emit('embed')">
					<div class="d-flex align-items-center">
						<i class="material-icons text-dark">code</i>
						<div>
							<div>
								<strong> {{ __.get("content/posts.embed-text") }} </strong>
							</div>
							<small class="text-muted"> {{ __.get("content/posts.embed-des") }} </small>
						</div>
					</div>
				</dropdown-item>
				<dropdown-item v-if="!checkUser(post.page.user_id)" @click="showReport = true">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined text-dark">report</i>
						<div>
							<div>
								<strong> {{ __.get("content/report.report-post") }} </strong>
							</div>
							<small class="text-muted"> {{ __.get("content/report.report-des-post") }} </small>
						</div>
					</div>
				</dropdown-item>
				<dropdown-item class="hover-danger" @click="$emit('deleted')" v-if="checkUser(post.page.user_id)">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined text-dark">delete_sweep</i>
						<div>
							<strong>{{ __.get("application.delete") }}</strong>
						</div>
					</div>
				</dropdown-item>
			</dropdown-menu>
		</div>
		<div v-else>
			<post-mobile-menu :post="this.post" @embed="$emit('embed')" @edit="$emit('edit')" @report="showReport = true" @deleted="$emit('deleted')"></post-mobile-menu>
		</div>
	</div>
</template>

<script>
import ConfirmModal from "../Modals/ConfirmModal.vue";
import ReportModal from "../Modals/ReportModal.vue";
import PostMobileMenu from "./PostMobileMenu.vue";
export default {
	methods: {
		unfollow() {
			var config = {
				method: "post",
				url: this.$APP_URL + "/unfollow/" + this.post.page_id,
			};

			axios(config).then((response) => {
				if (response.data.result) {
					this.$emit("need-reload");
				} else {
					const errors = response.data.errors;
					this.handelError(errors);
				}
			});
		},
	},
	data() {
		return {
			showConfirm: false,
			showReport: false,
		};
	},
	components: { ConfirmModal, PostMobileMenu, ReportModal },
	computed: {
		following() {
			return this.$store.state.user != null ? this.$store.state.shared.followings.includes(this.post.page_id) : false;
		},
	},
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
