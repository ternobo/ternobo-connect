<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>تماس با من</h5>
        </div>
        <ul class="contacts-list p-0">
            <li :class="{ 'edit': edit }" v-if="contacts.email != null || edit">
                <a target="_blank" :href="'mailto:'+contacts.email" v-if="!edit">
                    <i class="material-icons-outlined ml-1" :style="{'color': '#F14336' }">email</i>
                    ارسال پیام به پست الترونیک
                </a>
                <div v-else class="d-flex align-items-center justify-content-between">
                    <span class="text-nowrap ml-2">
                        <i class="material-icons-outlined ml-1" :style="{'color': '#F14336' }">email</i>
                        ارسال پیام به پست الکترونیک
                    </span>
                    <MaterialTextField class="material--sm" style="width: 300px" input-class="w-100 text-left" v-model="contacts.email"></MaterialTextField>
                </div>
            </li>
            <li :class="{ 'edit': edit }" v-if="contacts.telegram != null || edit">
                <a target="_blank" :href="'https://t.me/'+contacts.telegram" v-if="!edit">
                    <i class="ternobo-telegram ml-1" :style="{'color': '#61A7DD' }"></i>
                    ارسال پیام به Telegram
                </a>
                <div v-else class="d-flex align-items-center justify-content-between">
                    <span class="text-nowrap ml-2">
                        <i class="ternobo-telegram ml-1" :style="{'color': '#61A7DD' }"></i>
                        ارسال پیام به تلگرام
                    </span>
                    <MaterialTextField class="material--sm" style="width: 300px" input-class="w-100 text-left" v-model="contacts.telegram"></MaterialTextField>
                </div>
            </li>
            <li :class="{ 'edit': edit }" v-if="contacts.skype != null || edit">
                <a target="_blank" :href="'skype:'+contacts.skype" v-if="!edit">
                    <i class="ternobo-skype ml-1" :style="{'color': '#00AFF0' }"></i>
                    ارسال پیام از طریق Skype
                </a>
                <div v-else class="d-flex align-items-center justify-content-between">
                    <span class="text-nowrap ml-2">
                        <i class="ternobo-skype ml-1" :style="{'color': '#00AFF0' }"></i>
                        ارسال پیام از طریق Skype
                    </span>
                    <MaterialTextField class="material--sm" style="width: 300px" input-class="w-100 text-left" v-model="contacts.skype"></MaterialTextField>
                </div>
            </li>
            <li :class="{ 'edit': edit }" v-if="contacts.whatsapp != null || edit">
                <a target="_blank" :href="'https://wa.me/'+contacts.whatsapp" v-if="!edit">
                    <i class="ternobo-whatsapp ml-1" :style="{'color': '#191919' }"></i>
                    ارسال پیام به WhatsApp
                </a>
                <div v-else class="d-flex align-items-center justify-content-between">
                    <span class="text-nowrap ml-2">
                        <i class="ternobo-whatsapp ml-1" :style="{'color': '#191919' }"></i>
                        ارسال پیام به WhatsApp
                    </span>
                    <MaterialTextField class="material--sm" style="width: 300px" input-class="w-100 text-left" v-model="contacts.whatsapp"></MaterialTextField>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'

import {
    Skeleton
} from 'vue-loading-skeleton'
import ContactItem from "./Items/ContactItem";
export default {
    methods: {
        onDelete(index) {
            this.contacts.splice(index, 1);
        },
        addContact() {
            if (this.usableOptions.length > 0) {
                this.contacts.push(null);
            }
        },
        updateData() {
            this.contacts = this.getData();
            this.usableOptions = [];
            this.options.forEach((option) => {
                let canAdd = true;
                this.contacts.forEach((contact) => {
                    if (contact.option != null) {
                        if (contact.option.id == option.id) {
                            canAdd = false;
                        }
                    }
                });
                if (canAdd) {
                    this.usableOptions.push(option);
                }
            });
        },
        validate() {
            let cantPass = true;
            if (!(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/.test(this.contacts.whatsapp))) {
                this.toast("شماره واتس‌اپ نامعتبر است");
                cantPass = false;
            }
            if (!(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(this.contacts.email))) {
                this.toast("پست الکترونیک نامعتبر است");
                cantPass = false;
            }
            if (!(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(this.contacts.telegram))) {
                this.toast("نام کاربر تلگرام نامعتبر است");
                cantPass = false;
            }

            if (!(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(this.contacts.skype))) {
                this.toast("نام کاربری اسکایپ نامعتبر است");
                cantPass = false;
            }
            return cantPass;
        },
        getData() {
            if (this.contacts.whatsapp.startsWith("0")) {
                this.contacts.whatsapp = this.contacts.whatsapp.replace("0", "98");
            } else if (this.contacts.whatsapp.startsWith("+")) {
                this.contacts.whatsapp = this.contacts.whatsapp.replace("+", "");
            } else if (this.contacts.whatsapp.startsWith("00")) {
                this.contacts.whatsapp = this.contacts.whatsapp.replace("00", "98");
            }
            return this.contacts;
        }
    },
    data() {
        return {
            loading: true,
            contacts: {
                email: null,
                telegram: null,
                skype: null,
                whatsapp: null
            },
        }
    },
    props: {
        edit: {
            type: Boolean,
            default: false,
            required: false
        },
        page: {
            type: Object,
            default: undefined,
            required: true
        },

    },
    mounted() {
        if (this.page.contact_data != null) {
            this.contacts = this.page.contact_data.contacts;
        }
    },
    components: {
        Skeleton,
        ContactItem
    }

}
</script>
