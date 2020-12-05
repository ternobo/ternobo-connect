<template>
	<div class="action bg-white px-0 mb-3" v-if="action.post !== null">
		<div class="actionText border-bottom" v-if="action.action !== 'post'">
			{{ actionText }}
		</div>
		<component class="shadow-0" :post="action.post" v-bind:is="componentType"></component>
	</div>
</template>

<script>
import SimplePost from "./SimplePost";
import ArticleCard from "./ArticleCard";
export default {
	created() {
		if (this.action.post.type === "article") {
			this.componentType = require("./ArticleCard").default;
		} else if (this.action.post.type === "share") {
			this.componentType = require("./ResharedPost").default;
		}
	},
	data() {
		return {
			componentType: require("./SimplePost").default,
		};
	},
	computed: {
		actionText() {
			if (this.action.action == "like") {
				return this.page.name + " این محتوا را پسندید";
			} else if (this.action.action == "comment") {
				return this.page.name + " برای این محتوا دیدگاه ارسال کرد";
			} else if (this.action.action == "share") {
				return this.page.name + " این محتوا را بازنشر کرد";
			}
		},
	},
	name: "ActionCard",
	props: {
		action: {
			type: Object,
			default: undefined,
			required: true,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
