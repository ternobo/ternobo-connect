<template>
	<div
		class="twemoji-textarea-outer"
		:id="idTextarea"
		:style="{
			paddingBottom: maxlength ? '15px' : '0px',
			backgroundColor: componentColor,
		}"
	>
		<twemoji-picker ref="twemojiPicker" v-bind="propsFor('twemoji-picker')" @addTextBlur="addTextBlur" @emojiUnicodeAdded="emojiUnicodeAdded" @emojiImgAdded="emojiImgAdded" :pickerPaddingOffset="pickerPaddingOffset">
			<template v-for="(_, slotName) in $slots" v-slot:[slotName]>
				<slot :name="slotName" />
			</template>
		</twemoji-picker>

		<div ref="twemojiTextarea" id="twemoji-textarea" class="twemojiTextarea" :contenteditable="textareaDisabled ? false : true" @input="updateContent" @paste="onPaste" @keydown.exact.enter="enterKey" @keydown.shift.enter="shiftEnterKey" @mouseup="saveSelection" @keyup="saveSelection" @focus="restoreSelection" :placeholder="placeholder"></div>

		<div id="send-btn" @click="emitEnterKeyEvent" v-if="enableSendBtn">
			<send-icon-img />
		</div>

		<div id="length-indicator" v-if="maxlength">
			<span :style="{ color: actualContentLength > maxlength ? 'red' : 'black' }">{{ actualContentLength }}</span>
			/
			<span>{{ maxlength }}</span>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import TextareaParser from "../services/TextareaParser";
import EmojiService from "../services/EmojiService";
import TwemojiPicker from "./TwemojiPicker";
import SendIconImg from "./SendIconImg.vue";
import TwemojiProps from "./TwemojiPicker/props";
import TwemojiPropWatchers from "./TwemojiPicker/prop-watchers";
import { propsForMixin } from "../mixins/propsFor";
import TwitterText from "twitter-text";
export default Vue.extend({
	name: "TwemojiTextarea",
	components: {
		"twemoji-picker": TwemojiPicker,
		"send-icon-img": SendIconImg,
	},
	mixins: [propsForMixin],
	props: Object.assign(Object.assign({}, TwemojiProps), {
		// ** Textarea Props **/
		idTextarea: {
			default: "twemoji-textarea-outer",
			type: String,
		},
		initialContent: {
			default: "",
			type: String,
		},
		enableSendBtn: {
			default: false,
			type: Boolean,
		},
		emojiPickerDisabled: {
			default: false,
			type: Boolean,
		},
		textareaDisabled: {
			default: false,
			type: Boolean,
		},
		componentColor: {
			type: String,
			default: "#F7F7F7",
			validator: function (value) {
				const s = new Option().style;
				s.color = value;
				const bolValid = s.color !== "";
				if (bolValid === false) {
					console.error('The value entered for the prop "componentColor" is invalid. ' + "Please inform a valid CSS color.");
				}
				return true;
			},
		},
		placeholder: {
			type: String,
			default: "",
		},
		maxlength: {
			type: Number,
			default: null,
		},
	}),
	data() {
		return {
			savedRange: null,
			twemojiOptions: {},
			actualContentLength: 0,
		};
	},
	computed: {
		twemojiTextarea() {
			return this.$refs.twemojiTextarea;
		},
		twemojiPicker() {
			return this.$refs.twemojiPicker;
		},
	},
	created() {
		this.twemojiOptions = {
			base: this.twemojiPath,
			ext: this.twemojiExtension,
			size: this.twemojiFolder,
		};
	},
	mounted() {
		// Init TwemojiPicker watchers
		TwemojiPropWatchers(this, this.twemojiPicker);
		if (this.initialContent.length > 0) {
			this.twemojiTextarea.innerHTML = this.initialContent;
		}
	},
	methods: {
		updateContent(event) {
			const targetedElement = event.target;
			let content = targetedElement.innerHTML;
			this.$emit("contentChangedHtml", content);
			content = TextareaParser.replaceEmojiWithAltAttribute(content);
			content = TextareaParser.unescapeHtml(content);
			if (content.length !== 0 && content[content.length - 1] === "\n") {
				content = content.slice(0, -1);
			}
			this.actualContentLength = TwitterText.parseTweet(content || "").weightedLength;
			if (this.twemojiPicker.$refs.popupEmoji) this.twemojiPicker.$refs.popupEmoji.popperInstance.forceUpdate();
			this.$emit("update:content", content);
			this.$emit("actualContentLengthChanged", this.actualContentLength);
			this.$emit("contentChanged", content);
		},
		emitIsContentOverflowed() {
			if (this.actualContentLength > this.maxlength) this.$emit("isContentOverflowed", true);
			else this.$emit("isContentOverflowed", false);
		},
		emitEnterKeyEvent(event) {
			this.emitIsContentOverflowed();
			this.$emit("enterKey", event);
		},
		enterKey(event) {
			if (event.shiftKey === false) {
				event.preventDefault();
				this.emitIsContentOverflowed();
				this.emitEnterKeyEvent(event);
			}
		},
		shiftEnterKey(event) {
			event.stopPropagation();
			event.preventDefault();
			if (this.twemojiTextarea.innerHTML === "" || this.twemojiTextarea.innerHTML[this.twemojiTextarea.innerHTML.length - 1] !== "\n") {
				this.addText("\n");
				this.addText("\n");
			} else {
				this.addText("\n");
			}
			this.twemojiTextarea.scrollTop = this.twemojiTextarea.scrollHeight;
			if (this.twemojiPicker.$refs.popupEmoji) this.twemojiPicker.$refs.popupEmoji.popperInstance.forceUpdate();
		},
		onPaste(pasteEvent) {
			let pastedData;
			pasteEvent.stopPropagation();
			pasteEvent.preventDefault();
			const clipboardData = pasteEvent.clipboardData;
			pastedData = (clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData("Text")) || "";
			pastedData = TextareaParser.escapeHTML(pastedData);
			pastedData = EmojiService.getEmojiImgFromUnicode(pastedData, this.twemojiOptions);
			window.document.execCommand("insertHTML", false, pastedData);
			this.twemojiTextarea.scrollTop = this.twemojiTextarea.scrollHeight;
		},
		focus() {
			const doc = this.twemojiTextarea;
			const childNode = doc.childNodes[0];
			doc.focus();
			if (childNode === undefined) {
				const textNode = document.createTextNode("");
				doc.appendChild(textNode);
				const range = document.createRange();
				const sel = window.getSelection();
				range.setStart(doc.childNodes[0], 0);
				range.collapse(true);
				sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
				sel === null || sel === void 0 ? void 0 : sel.addRange(range);
				this.saveSelection();
			}
		},
		blur() {
			const doc = this.twemojiTextarea;
			doc.blur();
		},
		saveSelection() {
			var _a;
			if (window.getSelection) {
				this.savedRange = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.getRangeAt(0);
			}
		},
		restoreSelection() {
			const doc = this.twemojiTextarea;
			doc.focus();
			if (this.savedRange != null) {
				if (window.getSelection) {
					const s = window.getSelection();
					if ((s === null || s === void 0 ? void 0 : s.rangeCount) || 0 > 0) {
						s === null || s === void 0 ? void 0 : s.removeAllRanges();
					}
					s === null || s === void 0 ? void 0 : s.addRange(this.savedRange);
				}
			}
		},
		addTextBlur(text) {
			this.focus();
			text = TextareaParser.escapeHTML(text);
			text = EmojiService.getEmojiImgFromUnicode(text, this.twemojiOptions);
			window.document.execCommand("insertHTML", false, text);
			this.saveSelection();
			this.blur();
		},
		addText(text) {
			this.focus();
			text = TextareaParser.escapeHTML(text);
			text = EmojiService.getEmojiImgFromUnicode(text, this.twemojiOptions);
			window.document.execCommand("insertHTML", false, text);
			this.saveSelection();
		},
		cleanText() {
			this.twemojiTextarea.innerHTML = "";
			this.$emit("update:content", "");
		},
		emojiUnicodeAdded(unicode) {
			this.$emit("emojiUnicodeAdded", unicode);
		},
		emojiImgAdded(img) {
			this.$emit("emojiImgAdded", img);
		},
	},
});
</script>

<style>
</style>