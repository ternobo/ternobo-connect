<template>
	<div class="card">
		<div class="card-body">
			<div class="d-flex mb-2 aling-items-center justify-content-between">
				<h2 class="about-me--card-title">تجربیات</h2>
				<button class="btn btn-icon btn-rounded btn-secondary" v-if="edit" @click="addExperience">
					<i class="material-icons">add</i>
				</button>
			</div>
			<ul class="experiences-list p-0" v-if="loading">
				<li>
					<skeleton :count="3" heigth="80px" />
				</li>
			</ul>
			<div class="w-100 text-center" v-else-if="experiences.length < 1">
				<span class="font-16 text-superlight">هیچ تجربیاتی ثبت نشده</span>
			</div>
			<draggable group="experiences" ref="draggable" tag="ul" v-bind="dragOptions" v-model="experiences" class="experiences-list p-0" :disabled="!edit" handle=".hand-hover">
				<Experience @deleted="onDelete(index)" v-model="experiences[index]" :edit="edit" v-for="(experience, index) in experiences" :key="'experience_' + experience.id" />
			</draggable>
		</div>
	</div>
</template>

<script>
import Experience from "./Experience";
export default {
	methods: {
		onDelete(index) {
			this.experiences.splice(index, 1);
		},
		addExperience() {
			this.experiences.push({
				id: "experience_" + Math.round(new Date().getTime()),
			});
		},
		getData() {
			return this.experiences;
		},
	},
	mounted() {
		setTimeout(() => {
			this.loading = false;
		}, 200);
	},
	data() {
		return {
			drag: false,
			loading: true,
			experiences: [],
		};
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	props: {
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	components: {
		Experience,
	},
};
</script>
