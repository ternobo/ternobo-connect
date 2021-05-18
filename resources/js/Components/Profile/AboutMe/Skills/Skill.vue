<template>
	<li :class="{ 'skill-edit': edit }" v-if="value != undefined">
		<SkillCreditModal @credited="credited" v-if="$store.state.user != null && !checkUser(user.id)" :show.sync="creditModal" :user="user" :skill="skillVal"></SkillCreditModal>
		<credits-modal :skill="skillVal.id" :show.sync="creditsListModal"></credits-modal>
		<skeleton :height="'24px'" v-if="loading && !edit"></skeleton>
		<div v-else>
			<div class="skill-name" v-if="!edit">
				<div class="endorsement" v-if="$store.state.user != null && !checkUser(user.id)">
					<i class="material-icons" @click="credit">
						{{ canCredit ? "arrow_circle_up" : "remove_circle_outline" }}
					</i>
					<span class="action">
						{{ skillVal.credit_text == null ? 0 : formatNumber(skillVal.credit_text.nums, "0a") }}
					</span>
				</div>
				<div class="d-flex flex-column justify-content-center">
					<span class="d-flex medium align-items-center clickale">
						<wire-link :href="'/search?q=' + skillVal.name">{{ skillVal.name }}</wire-link>
					</span>
					<div class="skill-credits clickable" @click="if (skillVal.credit_text.nums >= 1) creditsListModal = true;">
						<div class="credit-icon">
							{{ skillVal.credit_text == null ? 0 : formatNumber(skillVal.credit_text.nums, "0a") }}
							<i class="material-icons">arrow_circle_up</i>
						</div>
						<span class="font-14" v-if="skillVal.credit_text != null && skillVal.credit_text.nums >= 1">
							<wire-link v-if="skillVal.credit_text.first" :href="userURL(skillVal.credit_text.first)">
								<strong class="font-14">{{ skillVal.credit_text.first.name }}</strong>
								{{ skillVal.credit_text.nums > 2 ? "،" : "" }}
							</wire-link>

							<span v-if="skillVal.credit_text.nums == 2">و</span>
							<wire-link v-if="skillVal.credit_text.second" :href="userURL(skillVal.credit_text.second)">
								<strong class="font-14">{{ skillVal.credit_text.second.name }}</strong>
							</wire-link>
							<span v-if="skillVal.credit_text.nums > 2">و</span>
							<span v-if="skillVal.credit_text.nums - 2 > 0">{{ formatNumber(skillVal.credit_text.nums - 2, "0a") }} نفر دیگر این مهارت را تایید کرده‌اند</span>
							<span v-else-if="(skillVal.credit_text.nums = 1)">این مهارت را تایید کرده است</span>
							<span v-else-if="skillVal.credit_text.nums == 2">این مهارت را تایید کرده‌اند</span>
						</span>
					</div>
				</div>
			</div>
			<div class="editItem" v-else>
				<div class="actions" v-if="edit">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
				</div>
				<MaterialTextField v-if="skillVal.isNew" maxlength="50" v-model="skillVal.name" class="material--sm w-75" input-class="w-100"></MaterialTextField>
				<span class="skill-name" v-else>
					{{ skillVal.name }}
				</span>
			</div>
		</div>
	</li>
</template>

<script>
import RadioButton from "../../../inputs/RadioButton";
import SkillCreditModal from "../../../Modals/SkillCreditModal";
import CreditsModal from "./CreditsModal.vue";
export default {
	components: {
		RadioButton,
		SkillCreditModal,
		CreditsModal,
	},
	watch: {
		skillVal() {
			this.$emit("input", this.skillVal);
		},
	},
	methods: {
		credited() {
			this.canCredit = false;
			if (this.skillVal.credit_text) {
				this.skillVal.credit_text.nums += 1;
			}
		},
		credit() {
			if (this.canCredit) {
				this.creditModal = true;
			} else {
				this.loading = true;
				axios
					.delete("/skills/credit/" + this.skillVal.id, {})
					.then((response) => {
						if (response.data.result) {
							this.canCredit = true;
							if (this.skillVal.credit_text) {
								this.skillVal.credit_text.nums -= 1;
							}
						} else {
							this.handleError(response.data.errors);
						}
					})
					.catch((errors) => {
						console.log(errors);
					})
					.then(() => (this.loading = false));
			}
		},
		doDelete() {
			this.$emit("deleted");
		},
	},
	mounted() {
		if (this.$store.state.user) {
			axios
				.post("/skills/can-credit", {
					skill: this.skillVal.id,
				})
				.then((response) => {
					this.canCredit = response.data.canCredit;
				})
				.catch((err) => {})
				.then(() => (this.loading = false));
		} else {
			this.loading = false;
		}
	},
	created() {
		if (this.value != undefined && this.value != null) {
			this.skillVal = this.value;
		}
	},
	data() {
		return {
			skillVal: null,
			creditModal: false,
			canCredit: true,
			loading: true,
			creditsListModal: false,
		};
	},
	props: {
		user: {
			type: Object,
			default: undefined,
			required: true,
		},
		value: {
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

<style></style>
