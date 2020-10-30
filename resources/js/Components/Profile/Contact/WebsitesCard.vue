<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>وب‌سایت‌ها</h5>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit && usableOptions.length > 0 && websites.length < options.length" @click="addSocial">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="websites-list p-0">
            <li v-if="loading">
                <Skeleton :count="6" :heigth="25" />
            </li>
            <WebsiteItem @deleted="onDelete(index)" @input="updateData" :options="usableOptions" :edit="edit" v-for="(website,index) in websites" :website="website" :key="'contact_item_num_'+index"></WebsiteItem>
        </ul>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from 'vue-loading-skeleton'
import WebsiteItem from "./Items/WebsiteItem";
export default {
    methods: {
        onDelete(index) {
            this.websites.splice(index, 1);
        },
        addSocial() {
            if (this.usableOptions.length > 0) {
                this.websites.push(null);
            }
        },
        updateData() {
            this.websites = this.getData();
            this.usableOptions = [];
            this.options.forEach((option) => {
                let canAdd = true;
                this.websites.forEach((contact) => {
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
            websites: []
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
        this.websites = this.page.contact_data;
        axios.post("/contact/website-option").then((response) => {
            this.options = response.data.options;
            this.loading = false;

            if (this.websites == null) {
                this.websites = [];
                this.usableOptions = this.options;
            } else {
                this.options.forEach((option) => {
                    let canAdd = true;

                    this.websites.forEach((contact) => {
                        if (item.option.id == option.id) {
                            console.log(contact);
                            canAdd = false;
                        }
                    });
                    if (canAdd) {
                        this.usableOptions.push(option);
                    }
                });
            }

        });
    },
    components: {
        Skeleton,
        WebsiteItem
    }

}
</script>
