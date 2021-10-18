<template>
	<b-modal v-model="showModal" hide-footer @show="shown" body-class="report-modal" size="md" :title="__.get('content/report.report-modal-title')" :centered="true">
		<div class="modal-loading-container" v-if="loadingData">
			<loading-spinner />
		</div>
		<div v-else>
			<div v-if="!moreInfo">
				<div class="reportreseaons" v-if="reportFor == null">
					<div class="report-item" v-for="reportReason in reportReasons" :key="`report_reason_${reportReason.id}`" @click="setReason(reportReason)">
						<span class="text">{{ __.get(`content/report.${reportReason.key}.text`) }}</span>
						<i class="material-icons">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
					</div>
				</div>
				<div v-else>
					<div class="reportfor">
						<div class="report-reason" v-for="subreason in reportFor.subreasons" :key="`subreason__id_${subreason.id}`">
							<label for="copyrightreport">
								<span>{{ __.get(`content/report.${reportFor.key}.subreasons.${subreason.key}.title`) }}</span>
								<small v-if="subreason.description != null" class="text-muted">{{ __.get(`content/report.${reportFor.key}.subreasons.${subreason.key}.description`) }}</small>
							</label>
							<div class="md-radio" v-if="reportFor.subreasons.length > 1" @click="reason = subreason.id">
								<input type="radio" name="reason" :value="subreason.id" v-model="reason" />
								<label></label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="moreInfo">
				<div class="moreinfo">
					<textarea-autosize class="form-control" :minHeight="150" v-model="description" :placeholder="__.get('content/report.description-report-ph')" name="moreinfo"></textarea-autosize>
				</div>
				<div class="moreinfo-footer text-left">
					<button class="btn text-muted btn-transparent" type="button" @click="(moreInfo = false), (description = null)">{{ __.get("application.cancel") }}</button>
					<button class="btn btn-primary" id="moreinfo-close" @click="moreInfo = false">{{ __.get("application.add") }}</button>
				</div>
			</div>
			<div class="d-flex pt-3 justify-content-between" v-else-if="reportFor != null">
				<div class="align-self-start">
					<button class="btn btn-edit" @click="moreInfo = true">{{ __.get("content/report.description-report") }}</button>
				</div>
				<div class="d-flex">
					<button class="btn text-muted btn-transparent" @click="reportFor = null">{{ __.get("application.back") }}</button>
					<loading-button :loading="loading" :disabled="reason == null" class="btn btn-primary" @click.native="submit">{{ __.get("application.save") }}</loading-button>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ModalMixin from "../../Mixins/Modal";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
	components: { LoadingSpinner },
	props: {
		type: {
			type: String,
			default: "post",
			required: false,
		},
		pageId: {
			required: false,
		},
	},
	mixins: [ModalMixin],
	computed: {
		...mapState(["reportReasons"]),
	},

	methods: {
		...mapActions(["loadReportReasons"]),
		shown() {
			this.loadingData = true;
			this.loadReportReasons().then(() => (this.loadingData = false));
		},
		setReason(val) {
			if (val.subreasons.length == 1) {
				this.reason = val.subreasons[0].id;
			}
			this.reportFor = val;
		},
		submit() {
			this.loading = true;
			let data = {
				report: this.reason,
				page_id: this.pageId,
			};
			axios
				.post("/reportpage", data)
				.then((response) => {
					if (response.data.result) {
						this.toast(__.get("messages.done-job-message"), "check", "text-success");
						this.$emit("update:show", false);
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => this.toast(__.get("messages.connection-error")))
				.then(() => (this.loading = false));
		},
	},
	data() {
		return {
			reportFor: null,
			loading: false,
			description: null,
			moreInfo: false,
			reason: null,

			loadingData: false,
		};
	},
};
</script>

<style></style>
