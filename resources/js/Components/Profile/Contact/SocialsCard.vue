<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>شبکه‌های اجتماعی</h5>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit && usableOptions.length > 0 && socials.length < options.length" @click="addSocial">
                <i class="material-icons">add</i>
            </button>
        </div>

        <ul class="socials-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <ul class="socials-list p-0" v-else>
            <SocialItem @deleted="onDelete(index)" @input="updateData" :options="usableOptions" :edit="edit" v-for="(social,index) in socials" :social="social" :key="'social_item_num_'+index"></SocialItem>
        </ul>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from 'vue-loading-skeleton'
import SocialItem from "./Items/SocialItem";
export default {
    methods: {
        onDelete(index) {
            this.socials.splice(index, 1);
        },
        addSocial() {
            if (this.usableOptions.length > 0) {
                this.socials.push(null);
            }
        },
        updateData() {
            this.socials = this.getData();
            this.usableOptions = [];
            this.options.forEach((option) => {
                let canAdd = true;
                this.socials.forEach((social) => {
                    if (social.option != null) {
                        if (social.option.id == option.id) {
                            canAdd = false;
                        }
                    }
                });
                if (canAdd) {
                    this.usableOptions.push(option);
                }
            });
        },
        getData() {
            let data = [];
            this.$children.forEach((item) => {
                data.push(item.value);
            });
            return data;
        }
    },
    data() {
        return {
            loading: true,
            options: [],
            usableOptions: [],
            socials: []
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
    created() {
        this.loading = true;
        axios.post("/contact/social-option").then((response) => {
            this.options = response.data.options;
            if (this.page.contact_data != null) {
                this.socials = this.page.contact_data.socials;
                this.options.forEach((option) => {
                    let canAdd = true;

                    this.socials.forEach((social) => {
                        if (social.option.id == option.id) {
                            canAdd = false;
                        }
                    });
                    if (canAdd) {
                        this.usableOptions.push(option);
                    }
                });
            }
            this.loading = false;
        });
    },
    components: {
        Skeleton,
        SocialItem
    }

}
</script>
