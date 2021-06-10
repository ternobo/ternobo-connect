<template>
	<div>
		<confirm-modal title="دنبال نکردن" @confirm="unfollow" :show.sync="showConfirm"> آیا دنبال نکردن {{ post.page.name }} تایید می‌کنید. </confirm-modal>
		<i class="material-icons openmenu clickable text-muted hover-dark" @click="showMenu = true">more_vert</i>
		<b-modal v-model="showMenu" hide-footer hide-header modal-class="slide-up" body-class="p-0" size="md" :centered="true">
			<ul class="post-menu">
				<li v-clipboard="$APP_URL + '/posts/' + post.id" @click="showMenu = false">
					<i class="material-icons text-dark">link</i>
					<strong>{{ __.get("content/posts.copy-post-link") }}</strong>
				</li>
				<li @click="runAction('edit')" v-if="checkUser(post.page.user_id) && post.type != 'article'">
					<i class="material-icons-outlined text-dark">edit</i>
					<strong>ویرایش</strong>
				</li>
				<li class="d-flex align-items-center" @click="runAction('embed')">
					<i class="material-icons item-icon text-dark">code</i>
					<div>
						<div>
							<strong> {{ __.get("content/posts.embed-text") }} </strong>
						</div>
						<small class="text-muted"> {{ __.get("content/posts.embed-des") }} </small>
					</div>
				</li>
				<li class="d-flex align-items-center" v-if="!checkUser(post.page.user_id)" @click="runAction('report')">
					<i class="material-icons-outlined item-icon text-dark">report</i>
					<div>
						<div>
							<strong> {{ __.get("content/report.report-post") }} </strong>
						</div>
						<small class="text-muted"> {{ __.get("content/report.report-des-post") }} </small>
					</div>
				</li>
				<li class="d-flex align-items-center" @click="showConfirm = true" v-if="!checkUser(post.page.user_id) && following">
					<i class="material-icons item-icon text-dark">not_interested</i>
					<div>
						<div>
							<strong> {{ __.get("content/report.report-post") }} </strong>
						</div>
						<small class="text-muted"> {{ __.get("content/report.report-des-post") }} </small>
					</div>
				</li>
				<li class="d-flex align-items-center" @click="runAction('deleted')" v-if="checkUser(post.page.user_id)">
					<div class="d-flex align-items-center">
						<i class="material-icons-outlined item-icon text-dark">delete_sweep</i>
						<div>
							<strong>{{ __.get("application.delete") }}</strong>
						</div>
					</div>
				</li>
			</ul>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import ConfirmModal from "../Modals/ConfirmModal.vue";
export default {
	methods: {
		runAction(action) {
			this.showMenu = false;
			this.$emit(action);
		},
		unfollow() {
			this.showMenu = false;
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
			showMenu: false,
			showConfirm: false,
		};
	},
	components: { ConfirmModal },
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
	mixins: [ModalMixin],
	name: "MobileMenu",
};
</script>

<style></style>
