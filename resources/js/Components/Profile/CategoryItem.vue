<template>
<li class="d-flex">
    <inertia-link :href="'/'+slug+'/category/'+category.id + '/' +location" class="d-flex align-items-center" :class="{'px-3 border':editName}" :contenteditable="editName" ref="name">{{ category.name }}</inertia-link>
</li>
</template>

<script>
export default {
    methods: {
        async doDelete() {
            const res = await this.$dialog.warning({
                text: 'از حذف  ' + this.category.name + ' اطمینان دارید؟',
                title: 'حذف دسته بندی',
                actions: {
                    false: 'لغو',
                    true: {
                        text: 'تایید',
                        variant: 'primary',
                        handle: async () => {
                            axios.delete(this.$APP_URL + "/categories/" + this.category.id, {
                                value: this.$refs.name.textContent
                            });
                            this.$el.remove();
                        },
                    },
                },
            })

        },
        doEdit() {
            if (this.editName) {
                axios.put(this.$APP_URL + "/categories/" + this.category.id, {
                    value: this.$refs.name.textContent
                });
                this.editName = false;
            } else {
                this.editName = true;
            }
        }
    },
    props: {
        edit: {
            type: Boolean,
            default: false,
            required: false
        },
        slug: {
            type: String,
            default: undefined,
            required: true
        },
        location: {
            type: String,
            default: undefined,
            required: true
        },
        category: {
            type: Object,
            default: undefined,
            required: true
        },

    },
    data() {
        return {
            order: 0,
            editName: false,
        }
    },

}
</script>

<style>

</style>
