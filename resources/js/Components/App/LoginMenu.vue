<template>
	<b-modal v-model="showModal" hide-footer header-class="modal-menu-header" @show="onShow" body-class="py-0 px-4" ref="modal" size="lg">
		<div class="useroptions">
			<ul class="p-0 menu">
				<li class="list-item d-flex flex-column">
					<a href="#" @click="showlaws">{{ __.get("application.comuunity-guidelines") }}</a>
				</li>
				<li class="list-item d-flex flex-column">
					<a @click="$emit('update:show', false)" href="https://trello.com/b/Vku6XmjN/ternobo" class="m-0">{{ __.get("application.trello") }}</a>
				</li>
				<li class="list-item d-flex flex-column">
					<a @click="$emit('update:show', false)" href="/help" class="m-0">{{ __.get("application.discord") }}</a>
				</li>
			</ul>
			<div class="langs">
				<language-link lang="en" class="lang-item"><img class="emoji" draggable="false" alt="🇺🇸" src="/emoji/72x72/1f1fa-1f1f8.png" /> <span>English</span></language-link>
				<LanguageLink lang="fa" class="lang-item"><img class="emoji" draggable="false" alt="🇮🇷" src="/emoji/72x72/1f1ee-1f1f7.png" /> <span>فارسی</span></LanguageLink>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	methods: {
		showlaws() {
			this.$emit("update:show", false);
			this.$emit("showlaws", false);
		},
		onShow() {
			setTimeout(() => {
				this.$refs.modal.$refs.dialog.style.marginTop = "0";
			}, 100);
		},
	},

	mixins: [ModalMixin],
	name: "UserOptionModal",
};
</script>

<style>
</style>