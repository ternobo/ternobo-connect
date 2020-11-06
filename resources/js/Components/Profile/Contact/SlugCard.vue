<template>
<div class="card">
    <div class="card-body px-4">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img width="24" src="/images/logo.svg" class="ml-2">
                <span>
                    پروفایل <strong>{{ page.user ? page.user.first_name : page.name }}</strong>
                </span>
            </div>

            <div class="slugItem" id="slugItem" v-if="!edit">
                <span class="ml-2">
                    {{ $APP_URL.replace("https://","").replace("http://","") + "/" + page.slug }}
                </span>
                <div class="icon clickable" v-clipboard="$APP_URL +'/' + page.slug">
                    <i class="font-18 material-icons-outlined">copy</i>
                </div>
            </div>

            <section class="slugItem bg-white" v-if="edit">
                <div class="ml-2 d-flex align-items-center" style="direction: ltr">
                    <span class="mr-1">{{ $APP_URL.replace("https://","").replace("http://","") + "/" }}</span>
                    <input type="text" class="p-1 font-14 text-left form-control" pattern="^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,29}$" v-model="slug" />
                </div>
                <section class="icon" v-clipboard="$APP_URL +'/' + page.slug">
                    <i class="font-18 material-icons-outlined">copy</i>
                </section>
            </section>
        </div>
    </div>
</div>
</template>

<script>
export default {
    created() {
        this.slug = this.page.slug;
    },
    data() {
        return {
            slug: ""
        }
    },
    watch: {
        slug() {
            this.$emit("input", this.slug);
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
    methods: {
        validate() {
            return this.slug.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
        }
    },

}
</script>

<style>

</style>
