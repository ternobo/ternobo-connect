<template>
	<li :class="{ 'skill-edit': edit }" v-if="value != undefined">
		<SkillCreditModal @credited="credited" :show.sync="creditModal" :user="user" :skill="skillVal"></SkillCreditModal>
		<credits-modal :skill="skillVal.id" :show.sync="creditsListModal"></credits-modal>
		<skeleton :height="'24px'" v-if="loading && !edit"></skeleton>
		<div v-else>
			<div class="skill-name" v-if="!edit">
				<div class="endorsement" v-if="$store.state.user != null && !checkUser(user.id)">
					<i class="material-icons" @click="credit">
						{{ canCredit ? "arrow_circle_up" : "highlight_off" }}
					</i>
					<span class="action">
						{{ formatNumber(credits_count, "0a") }}
					</span>
				</div>
				<div class="d-flex flex-column justify-content-center">
					<span class="d-flex medium align-items-center clickale">
						<wire-link :href="'/search?q=' + skillVal.name">{{ skillVal.name }}</wire-link>
					</span>
					<div class="skill-credits clickable">
						<div class="credit-icon" v-if="$store.state.user != null && checkUser(user.id)">
							<i class="material-icons">arrow_circle_up</i>
							<span>{{ formatNumber(credits_count, "0a") }}</span>
						</div>
						<span class="credits-text" v-if="skillVal.credit_text != null && credits_count >= 1">
							<wire-link v-if="skillVal.credit_text.first" class="hover-dark" :href="userURL(skillVal.credit_text.first)">
								<strong>{{ skillVal.credit_text.first.name }}</strong>
								{{ credits_count > 2 ? __.get("application.comma") : "" }}
							</wire-link>

							<span v-if="credits_count == 2" @click="creditsListModal = true">{{ __.get("application.and") }}</span>
							<wire-link v-if="skillVal.credit_text.second" class="hover-dark" :href="userURL(skillVal.credit_text.second)">
								<strong>{{ skillVal.credit_text.second.name }}</strong>
							</wire-link>
							<span @click="creditsListModal = true">{{ credits_count - 2 > 0 ? " " + __.get("application.more-people", { number: credits_count - 2 }) : "" }} {{ skillVal.credit_text.verb }}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="editItem" v-else>
				<div class="actions" v-if="edit">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
				</div>
				<auto-complete v-if="skillVal.isNew" v-model="skillVal.name" maxlength="50" :suggestionPosition="{ x: 0, y: 30 }" endpoint="/skills/search" inputClass="xsm-input" class="w-75">
					<template #suggestionItem="{ suggestion }">
						{{ suggestion }}
					</template>
				</auto-complete>
				<span class="skill-name" v-else>
					{{ skillVal.name }}
				</span>
			</div>
		</div>
	</li>
</template>

<script>
import AutoComplete from "../../../inputs/AutoComplete.vue";
import RadioButton from "../../../inputs/RadioButton";
import SkillCreditModal from "../../../Modals/SkillCreditModal";
import CreditsModal from "./CreditsModal.vue";
export default {
	components: {
		RadioButton,
		SkillCreditModal,
		CreditsModal,
		AutoComplete,
	},
	watch: {
		skillVal() {
			this.$emit("input", this.skillVal);
		},
	},
	methods: {
		credited() {
			this.canCredit = false;
			this.credits_count += 1;
		},
		credit() {
			if (this.canCredit) {
				this.creditModal = true;
			} else {
				this.confirmDialog(__.get("messages.delete-endoser-confirm")).then((value) => {
					if (value) {
						this.loading = true;
						axios
							.delete("/skills/credit/" + this.skillVal.id, {})
							.then((response) => {
								if (response.data.result) {
									this.canCredit = true;
									if (this.skillVal.credit_text) {
										this.credits_count -= 1;
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
				});
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
					this.credits_count = response.data.credits_count;
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

			credits_count: 0,
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
