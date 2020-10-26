<template>
<div class="profile clickable" :class="size" @click="openFileSelect">
    <CropperModal title="انتخاب تصویر پروفایل" :show.sync="crop" v-if="canChange" :aspect-ratio="1/1" :image="image" @cropped="upload"></CropperModal>
    <input type="file" class="d-none" v-if="canChange" ref="imageFile" @change="imageSelect" />
    <lazy-image :src="src" img-class="rounded-circle" :class="size" />
    <i class="material-icons" v-if="canChange">camera</i>
    <div class="position-absolute d-flex align-items-center justify-content-center profile-xlg" style="top:-3px;left:-3px;right:-3px;bottom:-3px;width:calc(100%+3px);height:calc(100%+3px);background:rgba(0,0,0,0.5);" v-if="loading">
        <loading-spinner></loading-spinner>
    </div>
</div>
</template>

<script>
import CropperModal from "../Modals/CropperModal";
import {
    Inertia
} from '@inertiajs/inertia'
export default {
    props: {
        canChange: {
            type: Boolean,
            default: false,
            required: false
        },
        src: {
            type: String,
            default: undefined,
            required: true
        },
        size: {
            type: String,
            default: "profile-xlg",
            required: false
        }
    },
    methods: {
        openFileSelect() {
            if (this.canChange) {
                this.$refs.imageFile.click();
            }
        },
        imageSelect(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                let file = event.target.files[0];
                var filetype = file.type;
                let blobURL = URL.createObjectURL(file);
                if (filetype.startsWith("image")) {
                    this.file = file;
                    this.image = blobURL;
                    this.crop = true;
                } else {
                    this.toast("فایل انتخابی تصویر نیست!");
                }
            }
        },
        upload(cordinates) {
            this.loading = true;
            const formData = new FormData();
            formData.append("profile", this.file);
            formData.append("sizes", JSON.stringify(cordinates));
            formData.append("json", true);
            axios.post(this.$APP_URL + '/setprofile', formData)
                .then((response) => {
                    const data = response.data;
                    if (data.result) {
                        Inertia.reload();
                        this.$emit("updated");
                    } else {
                        const errors = data.errors;
                        this.handleError(errors);
                    }
                }).then(() => this.loading = false);
        }

    },
    data() {
        return {
            crop: false,
            image: "",
            file: null,
            loading: false
        }
    },
    components: {
        CropperModal
    }

}
</script>

<style lang="scss" scoped>
.profile {
    margin-top: -104px;
    position: relative;
    border: 3px solid #FFF;
    background: #FFF;

    >i {
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        width: calc(100%+3px);
        height: calc(100%+3px);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF;
        border-radius: 50%;
        background: rgba($color: #191919, $alpha: 0.5);
        opacity: 0;
        transition: 0.3s all;
    }

    >figure {
        transition: 0.3s all;
    }

    &:hover {
        >figure {
            filter: blur(2px);
        }

        >i {
            opacity: 1;
        }
    }
}
</style>
