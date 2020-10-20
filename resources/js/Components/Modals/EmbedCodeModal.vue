<template>
<b-modal v-model='showModal' hide-footer title="قوانین و مقررات ترنوبو" size="md">
    <template #modal-header>
        <h5 class="mb-0">
            <i class="material-icons ml-1">code</i>
            دریافت کد امبد
        </h5>
        <button type="button" aria-label="Close" class="close" @click="showModal = false">×</button>
    </template>
    <div class="d-flex justify-content-center align-items-center p-5" v-if="code === undefined">
        <loading-spinner></loading-spinner>
    </div>
    <div class="d-flex flex-column" v-else>
        <div>
            <div class="input-group">
                <textarea class="form-control bg-white" ref="textarea" readonly style="resize: none;direction: ltr;min-height: 300px" :value="optimizedCode"></textarea>
                <button class="btn btn-grey-10" @click="copy">
                    <i class="material-icons-outlined">file_copy</i>
                </button>
            </div>

            <div class="mt-3">
                <p class="text-light font-18">
                    کد امبد را کپی کنید و در وب‌سایت خود قرار دهید.
                </p>
            </div>

            <div class="mt-3">
                <p class="font-20 text-dark"><i class="material-icons-outlined ml-1">remove_red_eye</i>
                    پیش نمایش
                </p>
            </div>

        </div>
        <div class="border-top pt-2" style="height: 700px" v-html="code"></div>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
export default {
    methods: {
        copy() {
            this.$refs.textarea.select();
            document.execCommand('copy');
            this.toast("کپی شد");
        }
    },
    watch: {
        showModal(newValue) {
            if (newValue) {
                axios.post(this.$APP_URL + "/posts/" + this.post.id + "/embed").then((response) => {
                    if (response.data.result) {
                        this.code = response.data.code;
                    }
                }).catch((error) => {
                    this.toast("خطا در برقراری ارتباط");
                });
            }
        },

    },
    computed: {
        optimizedCode() {
            if (this.code !== undefined) {
                return this.code.replaceAll("\n", "");
            }
            return undefined;
        }
    },
    props: {
        post: {
            type: Object,
            default: {},
            required: true
        },

    },
    data() {
        return {
            code: undefined
        }
    },
    mixins: [ModalMixin],
    name: "EmbedCodeModal",
};
</script>

<style>
</style>
