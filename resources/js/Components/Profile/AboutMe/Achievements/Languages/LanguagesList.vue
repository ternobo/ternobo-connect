<template>
	<div class="achievement-item" v-if="languages.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.language", 2) }}</h2>
				<div class="ms-2 badge-light">{{ languages.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="languages-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="langs" ref="draggable" tag="ul" v-bind="dragOptions" v-model="languages" class="languages-list" :disabled="!edit" handle=".hand-hover">
			<LanguageItem :detailed="open" :class="{ 'edit w-100': edit, open: open }" @deleted="onDelete(index)" v-model="languages[index]" :user="page.user" :edit="edit" v-for="(language, index) in languages" :key="'language_' + language.id" />
		</draggable>
	</div>
</template>

<script>
import LanguageItem from "./LanguageItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.languages[index].name)) {
				this.deleteConfirmModal(`زبان ${this.languages[index].name}`, index, this.languages);
			} else {
				this.languages.splice(index, 1);
			}
		},
		addLanguege() {
			this.languages.push({
				name: "",
				id: "lang_" + _.uniqueId(),
				level: null,
			});
		},
		getData() {
			return this.languages;
		},
	},
	data() {
		return {
			loading: false,
			languages: [],
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
			this.languages = this.value;
		}
	},
	props: {
		value: {
			default: null,
			required: true,
		},
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
	components: {
		LanguageItem,
	},
};
</script>
