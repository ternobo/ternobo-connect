<template>
<div class="post-notification">
    <div class="d-flex flex-responsive flex-row aling-items-center justify-content-between w-100">
        <a class="d-flex align-items-center justify-content-start w-100" href="https://ternobo.com/soroush_rezae">
            <img src="https://ternobo.com/img/man-profile.png" class="profileimage mr-2" />
            <span class="d-flex align-items-center">
                <span class="d-flex flex-column">
                    <span class="d-flex aling-items-center"><b> {{ notification.sender.name }}</b>
                        <span class="d-flex ml-2 align-items-center text-muted font-11">۲ ماه
                        </span>
                    </span>
                    <div class="w-100 text-left">شما را دنبال می&zwnj;کند</div>
                </span>
            </span>
        </a>
        <div class="actions d-flex align-items-center mt-2 mt-lg-0">
            <button class="connect-btn" onclick="Ternobo.connect('45', this)">
                <span class="mdc-button__ripple"></span>متصل شدن
            </button>

            <button class="follow-btn" onclick="Ternobo.follow('45', this)">
                <span class="mdc-button__ripple"></span>دنبال کردن
            </button>
        </div>
    </div>
</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
    mixins: [NotificationMixin]
};
</script>

<style>
</style>
