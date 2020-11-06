<template>
<b-modal v-if="$page.user != null" v-model='showModal' :no-close-on-backdrop="false" hide-footer body-class="pb-0" :title="'تایید مهارت ' + user.name" size="md" :centered="true">
    <p>
        به مهارت <span class="mx-1">{{user.first_name }}</span> در <span class="mx1">{{ skill.name }}</span> چه امتیازی می‌دهید؟
    </p>
    <RadioButton class="d-flex justify-content-around" :values="[
                {label:'خوب',value:'1'},
                {label:'عالی',value:'2'},
                {label:'ماهر',value:'3'},
            ]"></RadioButton>
    <div class="w-100">
        <h4>چرا این امتیاز را به {{ user.first_name }} می‌دهید؟</h4>
        <v-select ref="reasonSelect" class="dropdown-list w-100" :placeholder="'انتخاب دلیل'" label="label" dir="rtl" v-model="reason" :options="[
            {
                label: 'با هم روی یک پروژه کار کرده‌ایم',
                value:'با هم روی یک پروژه کار کرده‌ایم'
            },
            {
                label: 'مدیریت مستقیم روی کار‌های فرناز دارم/داشته‌ام',
                value:'مدیریت مستقیم روی کار‌های فرناز دارم/داشته‌ام'
            },
            {
                label: 'به طور غیرمستقیم روی یک پروژه کار کرده‌ایم',
                value:'به طور غیرمستقیم روی یک پروژه کار کرده‌ایم'
            },
            {
                label: 'در مورد '+ user.first_name +' شنیده‌ام',
                value:'در مورد '+ user.first_name +' شنیده‌ام'
            },
            {
                label: 'هیچ کدام از موارد بالا',
                value:'هیچ کدام از موارد بالا'
            }
        ]">
            <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                    <i class="material-icons">keyboard_arrow_down</i>
                </span>
            </template>
        </v-select>
    </div>
    <div class="w-100 d-flex mt-3 justify-content-center" style="margin-bottom: -8px">
        <button class="btn btn-dark">ثبت</button>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
import RadioButton from "../inputs/RadioButton";
export default {
    components: {
        RadioButton
    },
    data() {
        return {
            level: undefined,
            reason: null,
            isOpen: false
        }
    },
    props: {
        skill: {
            type: Object,
            default: undefined,
            required: true
        },
        user: {
            type: Object,
            default: undefined,
            required: true
        },

    },
    mixins: [ModalMixin],
    name: "SkillCreditModal",
};
</script>

<style>
</style>
