<template>
<b-modal v-model='showModal' hide-footer title="ویرایش دسته‌بندی‌ها" size="md" :centered="true">
    <div class="row">
        <div class="col-md-5">
            <draggable v-model="list" handle=".hand-hover">
                <category-item v-for="(category,index) in list" :key="'category_'+category.id" @deleted="doDelete(index)" :category="category"></category-item>
            </draggable>
        </div>
        <div class="col-md-7">
            <div class="d-flex">
                <input type="text" class="form-control" v-model="input" placeholder="دسته بندی جدید را وارد کنید" />
                <button style="background: #E0E0E0;border: 0;color: #757575;" @click="addCategory" class="btn d-flex justify-content-center align-items-center btn-light rounded-0">
                    <i v-if="!loading" class="material-icons">add</i>
                    <span style="height: 14px;width: 14px;border-width: 2px;" v-if="loading" class="    loadingspinner"></span>
                </button>
            </div>
        </div>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../../Mixins/Modal';
import CategoryItem from "./CategoryItem";
export default {
    methods: {
        addCategory() {
            this.loading = true;

            axios.post("/categories", {
                name: this.input
            }).then((response) => {
                this.input = null;
                if (response.data.result) {
                    this.$emit('categoryAdded', response.data.category);
                }
                this.loading = false;
            });
        },
        doDelete(index) {
            this.list.splice(index, 1);
        }
    },
    created() {
        this.list = this.categories;
    },
    watch: {
        list(newVal) {
            newVal.forEach((item, index) => {
                item.sort_place = index;
                axios.post(this.$APP_URL + "/categories/sort/" + item.id, {
                    order: index
                });
            });
            this.$emit("update:categories", newVal);
        }
    },
    data() {
        return {
            list: [],
            input: null,
            loading: false
        }
    },
    components: {
        CategoryItem
    },
    props: {
        categories: {
            type: Array,
            default: () => {
                return []
            },
            required: true
        },
    },
    mixins: [ModalMixin],
    name: "CategoriesModal",
};
</script>

<style>
</style>
