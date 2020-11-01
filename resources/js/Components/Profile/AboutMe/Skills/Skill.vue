<template>
<li v-if="skill != undefined">
    <SkillCreditModal v-if="user.id != $page.user.id" :show.sync="creditModal" :user="user" :skill="skillVal"></SkillCreditModal>
    <div class="skill-name" v-if="!edit">
        <div class="endorsement" v-if="user.id != $page.user.id">
            <i class="material-icons">arrow_circle_up</i>
            <span class="action">
                {{ formatNumber(skillVal.credits.length,'0a') }}
            </span>
        </div>
        <div class="d-flex flex-column justify-content-center">
            <span class="font-18 d-flex medium align-items-center clickale">
                <inertia-link :href="'/search?q='+skillVal.name" class="text-dark">{{ skillVal.name }}</inertia-link>
            </span>
            <span class="font-11 clickable" v-if="skillVal.credit_text != null">
                <inertia-link v-if="skillVal.credit_text.first" :href="userURL(skillVal.credit_text.first)" class="text-dark">
                    <strong class="text-light">{{ skillVal.credit_text.first.name }}</strong>
                </inertia-link>
                <span v-if="skillVal.credit_text.nums > 2">،</span>
                <span v-if="skillVal.credit_text.nums == 2">و</span>
                <inertia-link v-if="skillVal.credit_text.second" :href="userURL(skillVal.credit_text.second)" class="text-dark">
                    <strong class="text-light">{{ skillVal.credit_text.second.name }}</strong>
                </inertia-link>
                <span v-if="skillVal.credit_text.nums > 2">و</span>
                <span>{{ formatNumber(skillVal.credit_text.nums - 2,'0a') }} نفر دیگر این مهارت را تایید کرده‌اند</span>
            </span>
        </div>
    </div>
    <div class="editItem" v-else>
        <div class="actions" v-if="edit">
            <i class="material-icons hand-hover">unfold_more</i>
            <i class="material-icons-outlined hover-danger clickable">delete</i>
        </div>
        <MaterialTextField v-if="skillVal.isNew" v-model="skillVal.name" class="material--sm w-100" input-class="w-100"></MaterialTextField>
        <span class="font-18 text-dark" v-else>
            {{ skillVal.name }}
        </span>
    </div>
</li>
</template>

<script>
import RadioButton from "../../../inputs/RadioButton";
import SkillCreditModal from "../../../Modals/SkillCreditModal";
export default {
    components: {
        RadioButton,
        SkillCreditModal
    },
    watch: {
        skillVal() {
            this.$emit("input", this.skillVal);
        },
    },
    methods: {
        doDelete() {
            this.$emit("deleted");
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
            creditModal: false
        }
    },
    props: {
        user: {
            type: Object,
            default: undefined,
            required: true
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

}
</script>

<style>

</style>
