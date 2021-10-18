<template>
	<b-modal v-model="showModal" hide-footer @show="onShow" :title="__.get('settings.active-session')" size="md" :centered="true">
		<div class="row" v-if="loading">
			<div class="col-md-4 p-4" v-for="index in 3" :key="'session_item_skeleton_' + index">
				<skeleton class="flex-row" height="68px" width="100%"></skeleton>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col-md-4 p-4" v-for="(session, index) in sessions" :key="'session_item_' + session.id">
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
