<template>
	<div class="mention-menu-container">
		<template v-if="items.length">
			<ul ref="items">
				<li v-for="(item, index) in items" ref="mentionItem" :key="getKey(item.id)" :class="{ 'is-selected': selectedIndex == index }" @keypress.enter="selectItem(item)" @mousedown.left="selectItem(item)">
					<lazy-image class="profile-xxsm me-4" imgClass="profile-xxsm" :src="item.profile" v-if="item.profile" />

					<div class="d-flex flex-column justify-content-center">
						<div class="d-flex align-items-center">
							<span class="name">{{ item.name }}</span>
							<lazy-image class="emoji ms-2" imgClass="emoji" :src="item.icon" v-if="item.icon" />
						</div>

						<span class="text-gray-medium-dark font-10" v-if="item.short_bio">{{ item.short_bio }}</span>
					</div>
				</li>
			</ul>
		</template>
		<div class="item" v-else>No result</div>
	</div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
	name: "MentionList",
	props: {
		items: {
			type: Array,
			required: true,
		},

		command: {
			type: Function,
			required: true,
		},
	},

	data() {
		return {
			selectedIndex: 0,
		};
	},

	watch: {
		items() {
			this.selectedIndex = 0;
		},
	},
	mounted() {
		this.$el.focus();
	},
	methods: {
		getKey(item) {
			return `item_${item}_${uuidv4()}`;
		},
		onKeyDown({ event }) {
			if (event.key === "ArrowUp") {
				this.upHandler();
				return true;
			}

			if (event.key === "ArrowDown") {
				this.downHandler();
				return true;
			}

			if (event.key === "Enter") {
				this.enterHandler();
				return true;
			}

			return false;
		},

		upHandler() {
			this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
			if (this.$refs.items && this.$refs.mentionItem) {
				this.$refs.items.scrollTop = this.$refs.mentionItem[this.selectedIndex].offsetTop;
			}
		},

		downHandler() {
			this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
			if (this.$refs.items && this.$refs.mentionItem) {
				this.$refs.items.scrollTop = this.$refs.mentionItem[this.selectedIndex].offsetTop;
			}
		},

		enterHandler() {
			this.selectItem(this.items[this.selectedIndex]);
		},

		selectItem(item) {
			this.command({ id: item.value, label: item.name });
		},
	},
};
</script>