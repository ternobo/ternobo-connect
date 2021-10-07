<template>
	<div class="poll-viewer w-100">
		<h2 class="font-20 mb-6 line-height-34px">
			{{ poll.question }}
		</h2>
		<ul class="poll-options--list">
			<li v-for="(option, index) in poll.options" :key="`poll_option_id_${option.id}`">
				<span class="poll-option--index">{{ index + 1 }}.</span>
				<button class="btn btn--poll-option">
					<span class="poll-option--progress" v-if="option.votesPercent" :style="{ width: `${option.votesPercent}%` }"></span>
					<span class="poll-option-text">{{ option.text }}</span>
				</button>
			</li>
		</ul>

		<div class="poll-cations-container">
			<div class="d-flex align-items-center">
				<strong v-if="poll.expiredAt" class="me-2">{{ formatTime(poll.expiredAt, "YYYY MMMM DD HH:mm") }}</strong>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["poll"],
};
</script>