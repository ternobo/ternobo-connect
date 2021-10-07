<template>
	<div>
		<poll-skeleton v-if="loading" />
		<div class="loading-error d-flex text-center justify-content-center flex-column" v-else-if="error">
			<i class="material-icons" @click="loadPoll">refresh</i>
			<span>{{ __.get("content/posts.poll-loading-error") }}</span>
		</div>
		<div class="poll-viewer" v-else>
			<h2 class="font-20 mb-6 line-height-34px">
				{{ poll.question }}
			</h2>
			<ul class="poll-options--list">
				<li v-for="(option, index) in poll.options" :key="`poll_option_id_${option.id}`">
					<span class="poll-option--index">{{ index + 1 }}.</span>
					<button class="btn btn--poll-option" :class="{ active: option.id == selectedOption, voted: option.voted }" @click="selectOption(option.id)">
						<span class="poll-option--progress" v-if="option.votesPercent" :style="{ width: `${option.votesPercent}%` }"></span>
						<span class="poll-option-text">{{ option.text }}</span>
					</button>
				</li>
			</ul>

			<div class="poll-cations-container">
				<div class="d-flex align-items-center">
					<strong v-if="poll.expiredAt" class="me-2">{{ formatTime(poll.expiredAt, "YYYY MMMM DD HH:mm") }}</strong>
					<span class="text-gray-medium-dark"> {{ `${__.get("content/posts.votes")} : ${poll.votes}` }}</span>
				</div>
				<loading-button v-if="canVote" :loading="voteSubmitLoading" @click="submitVote" class="btn btn-text text-action" :disabled="selectedOption == null"><i class="material-icons-outlined">poll</i> {{ __.get("application.submit") }}</loading-button>
				<strong v-else><i class="material-icons-outlined">poll</i> {{ __.get("application.submited") }}</strong>
			</div>
		</div>
	</div>
</template>

<script>
import PollSkeleton from "../../../Skeletons/PollSkeleton.vue";
export default {
	components: { PollSkeleton },
	props: ["pollId"],

	mounted() {
		this.loadPoll();
	},
	computed: {
		isVoted() {
			return this.poll.options.filter((option) => option.voted).length > 0;
		},
		canVote() {
			return this.voteEnabled && !this.isVoted;
		},
	},
	methods: {
		selectOption(optionId) {
			if (!this.isVoted) {
				if (this.selectedOption == optionId) {
					this.selectedOption = null;
				} else {
					this.selectedOption = optionId;
				}
			}
		},
		loadPoll() {
			this.loading = true;
			axios
				.get(`/polls/${this.pollId}`)
				.then((response) => {
					if (response.data.result) {
						this.poll = response.data.data;
					}
					this.loadVotes(
						() => (this.loading = true),
						() => (this.loading = false)
					);
				})
				.catch(() => (this.error = true));
		},
		loadVotes(onStart, onDone) {
			onStart();
			axios
				.get(`/polls/${this.pollId}/options`)
				.then((response) => {
					if (response.data.result) {
						this.poll.options = response.data.result;
					}
				})
				.catch(() => (this.error = true))
				.then(() => onDone());
		},
		submitVote() {
			this.voteSubmitLoading = true;
			axios
				.post(`/polls/${this.pollId}/${this.selectedOption}/vote`)
				.then((response) => {
					if (response.data.status) {
						this.poll.options = response.data.result.options.map((option) => {
							if (option.id == this.selectedOption) {
								option.voted = true;
							}
							return option;
						});
						this.loadVotes(
							() => (this.voteSubmitLoading = true),
							() => (this.voteSubmitLoading = false)
						);
						this.poll.votes++;
					} else {
						this.toast(__.get("messages.connection-error"));
					}
				})
				.catch(() => {
					this.toast(__.get("messages.connection-error"));
				})
				.then(() => (this.voteSubmitLoading = false));
		},
	},
	data() {
		return {
			selectedOption: null,
			poll: null,

			loading: true,
			error: false,
			voteSubmitLoading: false,
		};
	},
};
</script>