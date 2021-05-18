<template>
	<div class="card">
		<div class="card-body">
			<div class="about-me--card-title-container">
				<h2 class="about-me--card-title">مهارت‌ها</h2>
				<button class="rounded-add-btn btn-light-action" v-if="edit" @click="addSkill">
					<i class="material-icons">add</i>
				</button>
			</div>
			<ul class="skills-list p-0" v-if="skills == null">
				<li>
					<Skeleton :count="4" :heigth="25" />
				</li>
			</ul>
			<div class="w-100 text-center" v-else-if="skills.length < 1">
				<span class="font-16 text-superlight">هیچ مهارتی ثبت نشده</span>
			</div>
			<draggable group="skills" ref="draggable" tag="ul" v-bind="dragOptions" v-model="skills" class="skills-list" :disabled="!edit" handle=".hand-hover">
				<Skill @deleted="onDelete(index)" v-model="skills[index]" :user="page.user" :edit="edit" v-for="(skill, index) in skillsToShow" :key="'skill_' + skill.id" />
			</draggable>
			<div class="show-all-skills" @click="showMore = !showMore" v-if="skills != null && skills.length > 5 && !edit">{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}</div>
		</div>
	</div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import Skill from "./Skill";
import { v4 as uuidv4 } from "uuid";
export default {
	watch: {
		edit(val) {
			if (!val) {
				this.skills.forEach((item, index) => {
					item.isNew = false;
					this.$set(this.skills, index, item);
				});
			}
		},
	},
	methods: {
		onDelete(index) {
			const h = this.$createElement;
			this.confirmDialog(["ایا از حذف مهارت ", h("strong", {}, [this.skills[index].name]), " اطمینان دارید؟"]).then((value) => {
				if (value) {
					this.skills.splice(index, 1);
				}
			});
		},
		addSkill() {
			this.skills.push({
				name: "",
				id: "skill_" + uuidv4(),
				isNew: true,
			});
		},
		getData() {
			return this.skills;
		},
	},
	data() {
		return {
			drag: false,
			showMore: false,
			skills: null,
		};
	},
	computed: {
		skillsToShow() {
			if (this.showMore || this.edit) {
				return this.skills;
			}
			return this.skills.slice(0, 5);
		},
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
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	created() {
		if (this.page.skills != null && this.page.skills != undefined) {
			this.skills = this.page.skills;
		} else {
			this.skills = [];
		}
	},
	components: {
		Skeleton,
		Skill,
	},
};
</script>
