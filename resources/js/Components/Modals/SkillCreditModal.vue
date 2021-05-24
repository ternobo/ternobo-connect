<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" hide-footer :title="'تایید مهارت ' + user.name" size="md" :centered="true">
		<p>
			به مهارت <span class="mx-1">{{ user.first_name }}</span> در <strong class="mx1">{{ skill.name }}</strong> چه امتیازی می‌دهید؟
		</p>
		<RadioButton
			class="d-flex justify-content-around"
			:values="[
				{ label: 'خوب', value: '1' },
				{ label: 'عالی', value: '2' },
				{ label: 'ماهر', value: '3' },
			]"
			v-model="level"
		></RadioButton>
		<div class="w-100">
			<div class="my-3">
				<strong class="font-16">چرا این امتیاز را به {{ user.first_name }} می‌دهید؟</strong>
			</div>
			<tselect
				class="tselect-lg"
				labelOption="label"
				valueOption="value"
				dir="rtl"
				v-model="reason"
				:items="[
					{
						label: 'با هم روی یک پروژه کار کرده‌ایم',
						value: 'با هم روی یک پروژه کار کرده‌ایم',
					},
					{
						label: 'مدیریت مستقیم روی کار‌های ' + user.first_name + ' دارم/داشته‌ام',
						value: 'مدیریت مستقیم روی کار‌های ' + user.first_name + ' دارم/داشته‌ام',
					},
					{
						label: 'به طور غیرمستقیم روی یک پروژه کار کرده‌ایم',
						value: 'به طور غیرمستقیم روی یک پروژه کار کرده‌ایم',
					},
					{
						label: 'در مورد ' + user.first_name + ' شنیده‌ام',
						value: 'در مورد ' + user.first_name + ' شنیده‌ام',
					},
					{
						label: 'هیچ کدام از موارد بالا',
						value: 'هیچ کدام از موارد بالا',
					},
				]"
			>
				انتخاب دلیل
			</tselect>
		</div>
		<div class="w-100 d-flex mt-4 justify-content-center">
			<loading-button :loading="loading" @click.native="onCredit" class="btn btn-dark">ثبت</loading-button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import RadioButton from "../inputs/RadioButton";
export default {
	methods: {
		onCredit() {
			if (this.reason != null) {
				this.loading = true;

				axios
					.post("/skills/credit", {
						skill: this.skill.id,
						level: this.level,
						reason: this.reason.value,
					})
					.then((response) => {
						if (response.data.result) {
							this.$emit("credited");
							this.$emit("update:show", false);
						} else {
							this.handleError(response.data.errors);
						}
					})
					.catch((errors) => {})
					.then(() => (this.loading = false));
			} else {
				this.toast("دلیل امتیاز اجباری است");
			}
		},
	},
	components: {
		RadioButton,
	},
	data() {
		return {
			level: undefined,
			reason: null,
			loading: false,
		};
	},
	props: {
		skill: {
			type: Object,
			default: undefined,
			required: true,
		},
		user: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	mixins: [ModalMixin],
	name: "SkillCreditModal",
};
</script>

<style></style>
