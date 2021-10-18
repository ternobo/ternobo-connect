<template>
	<div class="card">
		<div class="card-body">
			<div>
				<div class="steps-progress justify-content-between">
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
						<span class="progress-text text-superlight">{{ undoneStep.name }}</span>
					</div>
					<i class="material-icons text-action" style="font-size: 28px; margin-top: -24px; margin-left: -28px !important">verified</i>
				</div>
				<div class="last-step-action">
					<div class="d-flex align-items-center">
						<i class="material-icons me-2" style="font-size: 50px">{{ steps.undone_steps[0].icon }}</i>
						<div class="d-flex flex-column">
							<strong class="font-16">
								{{ steps.undone_steps[0].name }}
							</strong>
							<span class="text-muted font-14" style="max-width: 200px">{{ steps.undone_steps[0].text }}</span>
						</div>
					</div>
					<button class="btn btn-primary" @click="$emit('action', steps.undone_steps[0].action)">{{ steps.undone_steps[0].button }}</button>
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
