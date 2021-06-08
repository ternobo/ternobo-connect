<template>
	<div class="achievement-item" v-if="inventions.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.get("user-profile.patent") }}</h2>
				<div class="ms-2 badge-light">{{ inventions.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="inventions-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="inventions" ref="draggable" tag="ul" v-bind="dragOptions" v-model="inventions" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<InventionItem :detailed="open" :class="{ 'edit w-100': edit }" @deleted="onDelete(index)" v-model="inventions[index]" :edit="edit" v-for="(invention, index) in inventions" :page="page" :key="'invention_' + invention.id" />
		</draggable>
	</div>
</template>

<script>
import InventionItem from "./InventionItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.inventions[index].name)) {
				this.deleteConfirmModal(`اختراع ${this.inventions[index].name}`, index, this.inventions);
			} else {
				this.inventions.splice(index, 1);
			}
		},
		addInvention() {
			this.inventions.push({
				id: "invention_" + _.uniqueId(),
			});
		},
		getData() {
			return this.inventions;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			inventions: [],
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
	created() {
		if (this.value != null) {
			this.inventions = this.value;
		}
	},
	props: {
		value: {
			default: null,
			required: true,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	components: {
		InventionItem,
	},
};
</script>
