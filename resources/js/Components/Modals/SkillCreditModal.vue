<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" hide-footer :title="__.get('user-profile.endorse-skill')" size="md" :centered="true">
		<p v-html="__.get('user-profile.endorse-skill-q1', { skill: skill.name, fname: user.first_name })"></p>
		<RadioButton
			class="d-flex justify-content-around"
			:values="[
				{ label: __.get('user-profile.good'), value: '1' },
				{ label: __.get('user-profile.very-good'), value: '2' },
				{ label: __.get('user-profile.highly-skilled'), value: '3' },
			]"
			v-model="level"
		></RadioButton>
		<div class="w-100">
			<div class="my-3">
				<strong class="font-16">{{ __.get("user-profile.endorse-skill-q2", { skill: skill.name, fname: user.first_name }) }}</strong>
			</div>
			<tselect
				class="tselect-lg"
				labelOption="label"
				valueOption="value"
				:dir="appDirection"
				v-model="reason"
				:items="[
					{
						label: __.get('user-profile.endorse-res-1'),
						value: 'با هم روی یک پروژه کار کرده‌ایم',
					},
					{
						label: __.get('user-profile.endorse-res-2', { fname: user.first_name }),
						value: 'مدیریت مستقیم روی کار‌های ' + user.first_name + ' دارم/داشته‌ام',
					},
					{
						label: __.get('user-profile.endorse-res-3'),
						value: 'به طور غیرمستقیم روی یک پروژه کار کرده‌ایم',
					},
					{
						label: __.get('user-profile.endorse-res-4', { fname: user.first_name }),
						value: 'در مورد ' + user.first_name + ' شنیده‌ام',
					},
					{
						label: __.get('user-profile.endorse-res-5'),
						value: 'هیچ کدام از موارد بالا',
					},
				]"
			>
				{{ __.get("user-profile.choose-reason") }}
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
				this.toast(__.get("messages.score-reason-is-required"));
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
