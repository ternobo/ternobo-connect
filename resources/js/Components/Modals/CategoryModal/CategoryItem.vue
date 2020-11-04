<template>
<li class="category-item d-flex">
    <div class="actions">
        <i class="material-icons-outlined text-light hover-dark p-1 hand-hover">unfold_more</i>
        <i class="material-icons-outlined text-light hover-danger p-1 clickale" @click="doDelete()">delete_sweep</i>
    </div>
    <span class="d-flex align-items-center" :class="{'px-3 border':editName}">{{ category.name }}</span>
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
                                value: this.category.name
                            });
                            this.$emit("deleted");
                        },
                    },
                },
            })

        },
    },
    props: {
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
