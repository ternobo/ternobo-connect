<template>
	<div>
		<report-modal :show.sync="showReport" :post-id="post.id"></report-modal>
		<div v-if="$root.isDesktop">
			<confirm-modal title="دنبال نکردن" @confirm="unfollow" :show.sync="showConfirm"> آیا دنبال نکردن {{ post.page.name }} تایید می‌کنید. </confirm-modal>
			<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
				<template v-slot:button-content>
					<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
				</template>
				<b-dropdown-item v-clipboard="$APP_URL + '/posts/' + post.id">
					<i class="material-icons text-dark">link</i>
					<strong>رونوشت پیوند این محتوا</strong>
				</b-dropdown-item>
				<b-dropdown-item @click="$emit('edit')" v-if="checkUser(post.page.user_id) && post.type != 'article'">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined ml-2 text-dark">edit</i>
						<strong> ویرایش </strong>
					</div>
				</b-dropdown-item>
				<b-dropdown-item @click.native="$emit('embed')">
					<div class="d-flex align-items-center">
						<i class="material-icons ml-2 text-dark">code</i>
						<div>
							<div>
								<strong> دریافت کد امبد </strong>
							</div>
							<small class="text-muted"> کد امبد را کپی کرده و در وب‌سایت خودتان قرار دهید. </small>
						</div>
					</div>
				</b-dropdown-item>
				<b-dropdown-item v-if="!checkUser(post.page.user_id)" @click="showReport = true">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined ml-2 text-dark">report</i>
						<div>
							<div>
								<strong> گزارش تخلف </strong>
							</div>
							<small class="text-muted"> این دیدگاه در تضاد با قوانین ترنوبو است </small>
						</div>
					</div>
				</b-dropdown-item>

				<b-dropdown-item @click="showConfirm = true" v-if="!checkUser(post.page.user_id) && following">
					<div class="d-flex align-items-center">
						<i class="material-icons ml-2 text-dark">not_interested</i>
						<div>
							<div>
								<strong> دنبال نکردن {{ post.page.name }} </strong>
							</div>
							<small class="text-muted"> دیگر محتوای {{ post.page.name }} را تماشا نکنید. </small>
						</div>
					</div>
				</b-dropdown-item>
				<b-dropdown-item class="hover-danger" @click="$emit('deleted')" v-if="checkUser(post.page.user_id)">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined ml-2 text-dark">delete_sweep</i>
						<div>
							<strong>حذف کردن</strong>
						</div>
					</div>
				</b-dropdown-item>
			</b-dropdown>
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
