<template>
	<div class="card">
		<div class="card-body">
			<div class="d-flex mb-2 aling-items-center justify-content-between">
				<h2 class="about-me--card-title">تحصیلات</h2>
				<button class="rounded-add-btn btn-light-action" v-if="edit" @click="addEducaction">
					<i class="material-icons">add</i>
				</button>
			</div>
			<ul class="educations-list p-0" v-if="loading">
				<li>
					<Skeleton :count="3" heigth="80px" />
				</li>
			</ul>
			<div class="w-100 text-center" v-else-if="educations.length < 1">
				<span class="font-16 text-superlight">هیچ تحصیلاتی ثبت نشده</span>
			</div>
			<draggable group="edupublishs" ref="draggable" tag="ul" v-bind="dragOptions" v-model="educations" class="educations-list p-0" :disabled="!edit" handle=".hand-hover">
				<Education @deleted="onDelete(index)" v-model="educations[index]" :edit="edit" v-for="(educaction, index) in educations" :key="'education_' + educaction.id" />
			</draggable>
		</div>
	</div>
</template>

<script>
import Education from "./Education";
export default {
	methods: {
		onDelete(index) {
			this.educations.splice(index, 1);
		},
		addEducaction() {
			this.educations.push({
				id: "education_" + Math.round(new Date().getTime()),
			});
		},
		getData() {
			return this.educations;
		},
	},
	mounted() {
		setTimeout(() => {
			this.loading = false;
		}, 300);
	},
	data() {
		return {
			drag: false,
			loading: true,
			educations: [],
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
		Education,
	},
};
</script>
