<template>
	<div class="achievement-item" v-if="publishs.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.publication", 2) }}</h2>
				<div class="ms-2 badge-light">{{ publishs.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="achievement-list" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="publishs" ref="draggable" tag="ul" v-bind="dragOptions" v-model="publishs" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<PublishItem :detailed="open" :class="{ 'edit w-100': edit }" ref="publishs" @deleted="onDelete(index)" v-model="publishs[index]" :edit="edit" v-for="(publish, index) in publishs" :page="page" :key="'publish_' + publish.id" />
		</draggable>
	</div>
</template>

<script>
import PublishItem from "./PublishItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.publishs[index].name)) {
				this.deleteConfirmModal(`${__.choice("user-profile.publication", 1)} ${this.publishs[index].name}`, index, this.publishs);
			} else {
				this.publishs.splice(index, 1);
			}
		},
		addPublish() {
			this.publishs.push({
				id: "publish_" + _.uniqueId(),
			});
			this.$nextTick(() => {
				this.scrollToElement(this.$refs.publishs[this.publishs.length - 1].$el, 180);
			});
		},
		getData() {
			return this.publishs;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			publishs: [],
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
			this.publishs = this.value;
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
		PublishItem,
	},
};
</script>
