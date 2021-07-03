<template>
	<div>
		<slot></slot>

		<div class="tribute-container" v-if="searchKey != null" :style="caretPosition">
			<ul>
				<li v-for="item in items" :key="getKey(item.key)" @mousedown="selectItem(item)">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
	mounted() {
		this.$nextTick(() => {
			this.setup();
		});
	},

	methods: {
		setup() {
			let element = this.$el.querySelector(this.element);
			if (element != null) {
				element.addEventListener("input", this.onInput);
			} else {
				throw Error("Invalid Element");
			}
			this.input = element;
		},
		getKey(item) {
			return `item_${item}_${uuidv4()}`;
		},
		selectItem(item) {
			const value = this.searchKey + String(item.value);
			const range = window.getSelection().getRangeAt(0);
			range.setStart(range.startContainer, range.startOffset - this.searchKey.length - (this.lastSearchText ? this.lastSearchText.length : 0));
			range.deleteContents();
			range.insertNode(document.createTextNode(value));
			range.setStart(range.endContainer, range.endOffset);

			let event = new Event("input");
			this.input.dispatchEvent(event);

			this.$emit("apply", item, this.searchKey);
			this.closeMenu();
		},
		openMenu(key, searchText) {
			if (key == "@") {
				axios.post("/slugsearch", { q: searchText }).then((response) => {
					let data = response.data;
					this.items = data.pages;
				});
			} else if (key == "#") {
				axios.get(this.$APP_URL + "/gettags?term=" + searchText + "&q=" + searchText).then((response) => {
					let data = response.data;
					this.items = data.results;
				});
			}

			this.updateCarretPosition();
		},

		closeMenu() {
			this.searchText = null;
			this.searchKey = null;
			this.items = [];
			this.updateCarretPosition();
		},

		getSelectionStart() {
			return this.input.isContentEditable ? window.getSelection().anchorOffset : this.input.selectionStart;
		},

		getValue() {
			return this.input.isContentEditable ? window.getSelection().anchorNode.textContent : this.input.value;
		},

		getLastKeyBeforeCaret(caretIndex) {
			const [keyData] = this.triggers
				.map((key) => ({
					key,
					keyIndex: this.getValue().lastIndexOf(key, caretIndex - 1),
				}))
				.sort((a, b) => b.keyIndex - a.keyIndex);
			return keyData;
		},

		getLastSearchText(caretIndex, keyIndex) {
			if (keyIndex !== -1) {
				const searchText = this.getValue().substring(keyIndex + 1, caretIndex);
				// If there is a space we close the menu
				if (!/\s/.test(searchText)) {
					return searchText;
				}
			}
			return null;
		},

		onInput(e) {
			const index = this.getSelectionStart();
			if (index >= 0) {
				const { key, keyIndex } = this.getLastKeyBeforeCaret(index);
				const searchText = (this.lastSearchText = this.getLastSearchText(index, keyIndex));
				if (!(keyIndex < 1 || /\s/.test(this.getValue()[keyIndex - 1]))) {
					return false;
				}
				if (searchText != null) {
					this.updateCarretPosition();
					this.openMenu(key, searchText);
					this.searchKey = key;
					this.searchText = searchText;
					return true;
				}
			}

			this.closeMenu();
			return false;
		},

		getLineHeight(el) {
			var temp = document.createElement(el.nodeName),
				ret;
			temp.setAttribute("style", "margin:0; padding:0; " + "font-family:" + (el.style.fontFamily || "inherit") + "; " + "font-size:" + (el.style.fontSize || "inherit"));
			temp.innerHTML = "A";

			el.parentNode.appendChild(temp);
			ret = temp.clientHeight;
			temp.parentNode.removeChild(temp);

			return ret;
		},
		updateCarretPosition() {
			const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
			const inputRect = this.input.getBoundingClientRect();
			this.caretPosition = {
				position: "absolute",
				left: `${rect.left - inputRect.left}px`,
				top: `${rect.top - inputRect.top + this.getLineHeight(this.input)}px`,
				height: `auto`,
			};
		},
	},
	data() {
		return {
			searching: false,

			input: null,

			searchText: null,
			searchKey: null,
			lastSearchText: "",

			containerNode: null,

			caretPosition: {},

			items: [],
		};
	},
	props: {
		searchUrl: {
			type: Object,
			default: () => {
				return {
					"@": "/slugsearch",
					"#": "gettags",
				};
			},
			required: false,
		},
		as: {
			type: String,
			default: "div",
			required: false,
		},
		triggers: {
			type: Array,
			default: () => ["@", "#"],
			required: false,
		},
		element: {
			type: String,
			default: "div[contenteditable]",
			required: false,
		},
	},
};
</script>

<style>
</style>