<template>
	<li v-if="skill != undefined">
		<SkillCreditModal @credited="credited" v-if="$page.props.user != null && !checkUser(user.id)" :show.sync="creditModal" :user="user" :skill="skillVal"></SkillCreditModal>
		<skeleton :height="'24px'" v-if="loading"></skeleton>
		<div v-else>
			<div class="skill-name" v-if="!edit">
				<div class="endorsement" v-if="$page.props.user != null && !checkUser(user.id)">
					<i class="material-icons" @click="credit">
						{{ canCredit ? "arrow_circle_up" : "remove_circle_outline" }}
					</i>
					<span class="action" v-if="skillVal.credit_text != null">
						{{ formatNumber(skillVal.credit_text.nums, "0a") }}
					</span>
				</div>
				<div class="d-flex flex-column justify-content-center">
					<span class="d-flex medium align-items-center clickale">
						<inertia-link :href="'/search?q=' + skillVal.name">{{ skillVal.name }}</inertia-link>
					</span>
					<span class="font-11 clickable" v-if="skillVal.credit_text != null && skillVal.credit_text.nums > 1">
						<inertia-link v-if="skillVal.credit_text.first" :href="userURL(skillVal.credit_text.first)" class="text-dark">
							<strong class="text-light">{{ skillVal.credit_text.first.name }}</strong>
						</inertia-link>
						<span v-if="skillVal.credit_text.nums > 2">،</span>
						<span v-if="skillVal.credit_text.nums == 2">و</span>
						<inertia-link v-if="skillVal.credit_text.second" :href="userURL(skillVal.credit_text.second)" class="text-dark">
							<strong class="text-light">{{ skillVal.credit_text.second.name }}</strong>
						</inertia-link>
						<span v-if="skillVal.credit_text.nums > 2">و</span>
						<span>{{ formatNumber(skillVal.credit_text.nums - 2, "0a") }} نفر دیگر این مهارت را تایید کرده‌اند</span>
					</span>
				</div>
			</div>
			<div class="editItem" v-else>
				<div class="actions" v-if="edit">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
				</div>
				<MaterialTextField v-if="skillVal.isNew" v-model="skillVal.name" class="material--sm w-75" input-class="w-100"></MaterialTextField>
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
export default {
	components: {
		RadioButton,
		SkillCreditModal,
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
					.catch((errors) => {})
					.then(() => (this.loading = false));
			}
		},
		doDelete() {
			this.$emit("deleted");
		},
	},
	mounted() {
		if (this.$page.props.user) {
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
		if (this.skill != undefined && this.skill != null) {
			this.skillVal = this.skill;
		}
	},
	data() {
		return {
			skillVal: null,
			creditModal: false,
			canCredit: true,
			loading: true,
		};
	},
	props: {
		user: {
			type: Object,
			default: undefined,
			required: true,
		},
		skill: {
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
