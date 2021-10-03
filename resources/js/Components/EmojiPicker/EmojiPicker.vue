<template>
	<div class="emoji-container" :class="{ active: visible }">
		<i class="material-icons-outlined" :class="[`font-${iconSize}`]" @click="toggle">sentiment_very_satisfied</i>
		<portal to="destination" :disabled="!portal">
			<div class="emoji-picker" :style="pickerStyle" v-if="visible">
				<div class="emoji-picker-select">
					<div class="emoji-tabs">
						<span class="emoji-tab recent-emojies" :class="{ active: selectedTab.group == 'recent' }" @click="selectedTab = { group: 'recent' }">
							<i class="material-icons-outlined">schedule</i>
						</span>
						<span class="emoji-tab" :class="{ active: selectedTab.group == tab.group }" v-for="tab in emojiTable" :key="`emoji_group_tab_${tab.group}`" @click="selectedTab = tab">
							<i class="material-icons-outlined">{{ tab.icon }}</i>
						</span>
					</div>
					<div class="emoji-list-container">
						<div class="search-emoji">
							<div class="input-group-icon border-button-group">
								<input type="text" :placeholder="__.get('application.search')" v-model="search" class="form-control border-bottom-input" />
								<i class="material-icons-outlined text-muted">search</i>
							</div>
						</div>
						<div class="emoji-list" ref="emojiScrollable">
							<span class="emoji-item" @click="selectEmoji(emoji)" v-for="emoji in emojis" :key="`emoji_item_${emojiKey(emoji)}`">
								<figure v-lazyemoji class="mb-0">
									<img class="image__item emoji" :data-url="parseEmoji(emoji)" :alt="emoji.unicode" />
								</figure>
							</span>
						</div>
					</div>
				</div>
			</div>
		</portal>
	</div>
</template>

<script>
import emojisLib from "./emojis";
import { v4 as uuidv4 } from "uuid";

export default {
	props: {
		iconSize: {
			default: "32",
		},
		portal: {
			default: false,
		},
	},
	watch: {
		selectedTab() {
			if (this.$refs["emojiScrollable"]) {
				this.$refs["emojiScrollable"].scrollTo(0, 0);
			}
		},
	},
	data() {
		return {
			emojiTable: emojisLib,
			visible: false,
			search: "",
			selectedTab: { group: "recent" },

			pickerStyle: {},
		};
	},
	computed: {
		emojis() {
			if (this.search.length > 0) {
				let list = [];
				this.emojiTable.forEach((iterator) => {
					let emojis = iterator.emojiList.filter((emoji) => emoji.tags.filter((item) => item.includes(this.search)).length > 0);
					if (emojis.length > 0) {
						list.push(emojis);
					}
				});
				return list.flat();
			}
			return this.selectedTab.group != "recent" ? this.selectedTab.emojiList : this.getRecentEmojies();
		},
	},
	methods: {
		getRecentEmojies() {
			const emojisJSON = window.localStorage.getItem("recentEmojis");
			return emojisJSON != null ? JSON.parse(emojisJSON) : emojisLib[0].emojiList;
		},
		selectEmoji(emoji) {
			let recentEmojies = window.localStorage.getItem("recentEmojis");
			recentEmojies = recentEmojies != null ? JSON.parse(recentEmojies) : [];
			if (recentEmojies.filter((emojiItem) => emojiItem.unicode == emoji.unicode).length == 0) {
				recentEmojies.push(emoji);
			}
			window.localStorage.setItem("recentEmojis", JSON.stringify(recentEmojies));
			this.visible = false;
			this.$emit("pick", emoji.unicode);
		},
		parseEmoji(emoji) {
			return twemoji.base + twemoji.size + "/" + twemoji.grabTheRightIcon(emoji.unicode) + ".png";
		},
		emojiKey(emoji) {
			return emoji.tags[0] + "emoji_id_" + uuidv4();
		},
		insert(emoji) {
			this.$emit("emoji", emoji);
		},
		toggle(e) {
			let el = e.target;
			this.visible = !this.visible;
			if (this.portal) {
				var rect = el.getBoundingClientRect(),
					scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
					scrollTop = window.pageYOffset || document.documentElement.scrollTop;

				this.pickerStyle = { top: `${rect.top + scrollTop + el.offsetHeight}px`, left: `${rect.left + scrollLeft}px` };
			}
		},
		hide() {
			this.visible = false;
		},
		escape(e) {
			if (this.visible === true && e.keyCode === 27) {
				this.visible = false;
			}
		},
	},
	directives: {
		lazyemoji: {
			inserted: (el) => {
				el.classList.add("opacity-0");
				function loadImage() {
					const imageElement = Array.from(el.children).find((el) => el.nodeName === "IMG");
					if (imageElement) {
						imageElement.addEventListener("load", () => {
							setTimeout(() => el.classList.remove("opacity-0"), 100);
						});
						imageElement.addEventListener("error", () => {
							setTimeout(() => el.classList.add("error"), 100);
							setTimeout(() => el.classList.add("loaded"), 100);
						});
						setTimeout(() => (imageElement.src = imageElement.dataset.url), 100);
					}
				}

				function handleIntersect(entries, observer) {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							loadImage();
							observer.unobserve(el);
						}
					});
				}

				function createObserver() {
					const options = {
						root: null,
						threshold: "0",
					};
					const observer = new IntersectionObserver(handleIntersect, options);
					observer.observe(el);
				}
				if (window["IntersectionObserver"]) {
					createObserver();
				} else {
					loadImage();
				}
			},
		},
		"click-outside": {
			bind(el, binding, vNode) {
				if (typeof binding.value !== "function") {
					return;
				}
				const bubble = binding.modifiers.bubble;
				const handler = (e) => {
					if (bubble || (!el.contains(e.target) && el !== e.target)) {
						binding.value(e);
					}
				};
				el.__vueClickOutside__ = handler;
				document.addEventListener("click", handler);
			},
			unbind(el, binding) {
				document.removeEventListener("click", el.__vueClickOutside__);
				el.__vueClickOutside__ = null;
			},
		},
	},
	mounted() {
		document.addEventListener("keyup", this.escape);
	},
	destroyed() {
		document.removeEventListener("keyup", this.escape);
	},
};
</script>