<template>
	<div v-if="showModal">
		<portal to="destination">
			<transition name="fade">
				<confetti v-if="has_confetti && showModal" @click.native="$emit('update:show', false)" />
			</transition>
		</portal>
		<b-modal v-model="showModal" header-class="announcement-modal-header" :hide-backdrop="has_confetti" hide-footer size="sm" :centered="true">
			<template #modal-header="{ close }">
				<img :src="icon" width="64" />
				<button type="button" aria-label="Close" class="close" @click="close">close</button>
			</template>
			<h2 class="mb-6 font-24">{{ title_toShow }}</h2>
			<p class="font-16" style="line-height: 1.5" v-html="text_toShow"></p>
			<wire-link v-if="link != null" as="button" :href="link" class="btn btn-primary btn-lg mt-9 w-100">{{ link_text }}</wire-link>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import Confetti from "../Branding/Confetti.vue";
export default {
	components: { Confetti },
	mixins: [ModalMixin],
	name: "AnnouncementModal",
	props: ["title", "has_confetti", "link", "link_text", "text", "icon"],
	computed: {
		title_toShow() {
			let $t = __.get(`announcements.titles.${this.title}`);
			return $t != `announcements.titles.${this.title}` ? $t : this.title;
		},
		text_toShow() {
			let $t = __.get(`announcements.texts.${this.text}`);
			return $t != `announcements.texts.${this.text}` ? $t : this.text;
		},
	},
};
</script>