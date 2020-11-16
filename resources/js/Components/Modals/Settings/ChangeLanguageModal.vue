<template>
<b-modal v-model='showModal' hide-footer title="زبان نمایش" size="lang" :centered="true">
    <div class="row justify-content-center m-0 px-3">
        <div class="col-md-6 clickable">
            فارسی
        </div>
        <div class="col-md-6 text-muted disabled">
            English
        </div>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../../Mixins/Modal';
export default {
    mixins: [ModalMixin],
    name: "ChangeLanguageModal",
};
</script>

<style>
</style>
