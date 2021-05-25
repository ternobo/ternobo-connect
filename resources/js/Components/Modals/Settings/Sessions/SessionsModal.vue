<template>
	<b-modal v-model="showModal" hide-footer @show="onShow" title="دستگاه‌های متصل" size="md" :centered="true">
		<div v-if="loading">
			<skeleton :count="3" :styles="{ marginBottom: '12px' }" height="24px"></skeleton>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-md-12 pb-3" v-for="(session, index) in sessions" :key="'session_item_' + session.id">
					<session-item :can-remove="canRemove" :session="session" @deleted="onDelete(index)"></session-item>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../../Mixins/Modal";
import SessionItem from "./SessionItem.vue";

export default {
	data() {
		return {
			loading: true,
			canRemove: false,
			sessions: null,
		};
	},
	methods: {
		onDelete(index) {
			this.sessions.splice(index, 1);
		},
		onShow() {
			axios
				.post("/sessions")
				.then((response) => {
					this.sessions = response.data.sessions;
					this.canRemove = response.data.canRemove;
					this.loading = false;
				})
				.catch((err) => {
					this.loading = false;
				});
		},
	},
	mixins: [ModalMixin],
	components: {
		SessionItem,
	},
	name: "SessionsModal",
};
</script>

<style></style>
