<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>تماس با من</h5>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit && usableOptions.length > 0 && contacts.length < options.length" @click="addContact">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="contacts-list p-0">
            <li v-if="loading">
                <Skeleton :count="4" :heigth="25" />
            </li>
            <ContactItem @deleted="onDelete(index)" @input="updateData" :options="usableOptions" :edit="edit" v-for="(contact,index) in contacts" :contact="contact" :key="'contact_item_num_'+index"></ContactItem>
        </ul>
    </div>
</div>
</template>

<script>
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
            contacts: []
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
        this.contacts = this.page.contact_data;
        axios.post("/contact/contact-option").then((response) => {
            this.options = response.data.options;
            this.loading = false;

            if (this.contacts == null) {
                this.contacts = [];
                this.usableOptions = this.options;
            } else {
                this.options.forEach((option) => {
                    let canAdd = true;

                    this.contacts.forEach((contact) => {
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
        ContactItem
    }

}
</script>

<style lang="scss">
.contacts-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
        width: 50%;
        flex: 50%;
        padding: 7px 0;

        .editItem {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 10px;

            @media screen and(max-width: 622px) {
                flex-wrap: wrap;
            }
        }

    }

    li.edit {
        width: 100%;
        flex: 100%;
        padding: 7px 0;

        &:not(:last-child) {
            padding-bottom: 1rem;
            border-bottom: 1px solid #C8C8C8;
            margin-bottom: 1rem;
        }
    }

}
</style>
