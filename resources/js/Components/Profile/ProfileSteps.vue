<template>
	<div class="card">
		<div class="card-body">
			<div>
				<div class="steps-progress justify-content-center">
					<div class="step">
						<div class="progress-highlight active"></div>
						<span class="progress-text">ایجاد حساب</span>
					</div>
					<div class="step" v-for="doneStep in steps.done_steps" :key="uuidV4(doneStep)">
						<div class="progress-highlight active"></div>
						<span class="progress-text">{{ doneStep.name }}</span>
					</div>
					<div class="step" v-for="undoneStep in steps.undone_steps" :key="uuidV4(undoneStep)">
						<div class="progress-highlight"></div>
						<span class="progress-text text-muted">{{ undoneStep.name }}</span>
					</div>
					<i class="material-icons text-action" style="font-size: 28px; margin-top: -8px; margin-left: -14px !important">verified</i>
				</div>
				<div class="d-flex justify-content-between align-items-end mt-3">
					<div class="d-flex align-items-center">
						<i class="material-icons" style="font-size: 50px">{{ steps.undone_steps[0].icon }}</i>
						<div class="d-flex flex-column">
							<strong class="font-16">
								{{ steps.undone_steps[0].name }}
							</strong>
							<span class="font-14 text-muted" style="max-width: 200px">{{ steps.undone_steps[0].text }}</span>
						</div>
					</div>
					<button class="btn btn-dark" @click="$emit('action', steps.undone_steps[0].action)">{{ steps.undone_steps[0].button }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
	methods: {
		uuidV4(step) {
			return "step_item_" + step.icon + "_" + uuidv4();
		},
	},
	props: {
		steps: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>
