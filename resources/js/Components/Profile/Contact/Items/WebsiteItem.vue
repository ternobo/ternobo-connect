<template>
	<li>
		<a target="_blank" class="d-flex flex-column text-left" :href="websiteUrl" v-if="!edit">
			<span class="text-action">{{ websiteName }}</span>
			<strong class="text-superlight">{{ value.option.name }}</strong>
		</a>
		<div class="editItem" v-else>
			<MaterialTextField placeholder="آدرس وبسایت" class="material--sm w-100" input-class="w-100" v-model="val"></MaterialTextField>
			<div class="d-flex align-items-center mb-3 mb-lg-0 w-100">
				<v-select :searchable="false" class="dropdown-list w-100" :placeholder="'انتخاب کنید'" label="name" dir="rtl" v-model="option" :options="options">
					<template v-slot:selected-option="{ icon, color, name }">
						<i class="material-icons-outlined ml-1" :style="{ color: color }" v-html="icon"></i>
						<span class="ml-3" style="white-space: nowrap">
							{{ name }}
						</span>
					</template>
					<template v-slot:option="option">
						<div class="w-100">
							<i class="material-icons-outlined ml-1" :style="{ color: option.color }" v-html="option.icon"></i>
							<span class="ml-3">
								{{ option.name }}
							</span>
						</div>
					</template>
					<template #no-options>موردی یافت نشد</template>
				</v-select>
				<i class="material-icons-outlined text-muted hover-danger pr-2 clickable" @click="doDelete">delete</i>
			</div>
		</div>
	</li>
</template>

<script>
export default {
	watch: {
		val() {
			this.value = {
				id: this.website.id,
				option: this.option,
				url: this.val,
			};
			this.$emit("input", this.value);
		},
		option() {
			this.value = {
				id: this.website.id,
				option: this.option,
				url: this.val,
			};
			this.$emit("input", this.value);
		},
	},
	computed: {
		websiteName() {
			let url = this.value.url.replace("https://", "").replace("http://", "");
			if (url.endsWith("/")) {
				url = url.substring(0, url.length - 1);
			}
			if (url.startsWith("www.")) {
				url = url.replace("www.", "");
			}
			return url;
		},
		websiteUrl() {
			let url = this.value.url;
			if (url.startsWith("http://") || url.startsWith("https://")) {
				return url;
			} else {
				return "http://" + url;
			}
		},
	},
	methods: {
		validate() {
			let regex = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
			if (this.option != null) {
				if (regex.test(this.val) && this.val != null && this.val.length > 0) {
					return true;
				} else {
					this.toast("آدرس وبسایت وارد نشده است");
				}
			} else {
				this.toast("نوع وبسایت انتخاب نشده است");
			}
			return false;
		},
		doDelete() {
			this.$emit("deleted");
		},
	},
	created() {
		if (this.website != undefined && this.website != null) {
			this.val = this.website.url;
			this.option = this.website.option;
		}
		this.value = {
			option: this.option,
			url: this.val,
		};
	},
	data() {
		return {
			value: {},
			val: null,
			option: null,
			availableOptions: [],
		};
	},
	props: {
		options: {
			type: Array,
			default: () => {
				return [];
			},
			required: true,
		},
		placeholder: {
			type: String,
			default: undefined,
		},
		website: {
			type: Object,
			default: undefined,
		},
		edit: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style>
</style>
