<template>
<div class="row ml-0">
    <div class="col-md-4">
    </div>
    <div class="col-md-8">
        <SlugCard :edit="edit" :page="page" v-model="slug"></SlugCard>
        <ContactCard class="mt-3" :page="page" :edit="edit"></ContactCard>
    </div>
</div>
</template>

<script>
import SlugCard from "./SlugCard";
import ContactCard from "./ContactCard";
export default {
    created() {
       this.slug = this.page.slug;
    },
    data() {
        return {
            slug: "",
            options: [],
        }
    },

    props: {
        page: {
            type: Object,
            default: undefined,
            required: true
        },
        edit: {
            type: Boolean,
            default: false
        }

    },
    components: {
        SlugCard,
        ContactCard
    }
}
</script>

<style>

</style>
