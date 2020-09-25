<template>
<b-modal v-model='showModal' hide-footer hide-header :centered="true">
    <div class="d-flex flex-column w-100 aling-items-center">
        <h5 class="mt-0 font-16 text-center mb-4 w-25" style="border-bottom: 1px solid #000019;width: fit-content;align-self: center;margin-top: 20px;padding-bottom: 10px;padding-left: 0;padding-right: 0;">
            ورود</h5>
    </div>
    <form class="signup-login d-flex flex-column align-items-center justify-content-center clearfix" method="POST" action="https://ternobo.com/login">
        <div class="w-100">
            <input type="text" class="form-control bg-transparent mb-2" name="username" placeholder="تلفن، ایمیل یا شناسه" value="" />

        </div>
        <div class="w-100">
            <input type="password" class="form-control bg-transparent" name="password" placeholder="رمزعبور" value="" />
            <a class="text-primary float-left font-11" style="margin-top: 3px;" data-toggle="modal" href="#resetpasswordmodal">فراموشی رمزعبور</a>
        </div>
        <button class="btn btn-dark mt-2 w-50" type="submit">
            <span class="mdc-button__ripple"></span> ورود
        </button>
    </form>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
export default {
    mixins: [ModalMixin],
    name: "LoginModal"
}
</script>

<style>

</style>
