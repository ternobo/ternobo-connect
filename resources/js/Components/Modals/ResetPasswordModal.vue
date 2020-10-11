<template>
<b-modal v-model='showModal' hide-footer hide-header :centered="true">
    <div class="d-flex flex-column w-100 aling-items-center">
        <h5 class="mt-0 font-16 text-center mb-4 w-25" style="border-bottom: 1px solid #000019;width: fit-content;align-self: center;margin-top: 20px;padding-bottom: 10px;padding-left: 0;padding-right: 0;">
            بازیابی رمزعبور
        </h5>
    </div>
    <div class="signup-login d-flex flex-column align-items-center justify-content-center clearfix" ref="loginForm" method="POST" action="javascript:;">
        <div class="w-100">
            <input type="text" class="form-control bg-transparent mb-2" name="username" v-model="username" placeholder="تلفن، ایمیل یا شناسه" />
        </div>
        <loading-button @click.native="login" :loading="loading" class="btn btn-dark mt-2 w-50" type="button">
            ارسال کد بازیابی
        </loading-button>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
export default {
    data() {
        return {
            username: undefined,
            loading: false
        }

    },
    methods: {

    },
    mixins: [ModalMixin],
    name: "ResetPasswordModal"
}
</script>
