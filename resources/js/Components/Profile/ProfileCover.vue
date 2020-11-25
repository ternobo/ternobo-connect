<template>
  <div class="card-img-top position-relative page-cover">
    <div class="position-absolute d-flex align-items-center justify-content-center" style="top: 0px; left: 0px; right: 0px; bottom: 0px; width: calc(100%); height: calc(100%); background: rgba(0, 0, 0, 0.5); z-index: 1" v-if="loading">
      <loading-spinner></loading-spinner>
    </div>
    <CropperModal title="انتخاب تصویر پروفایل" v-if="canChange" :show.sync="crop" :aspect-ratio="25 / 7.8" :image="image" @cropped="upload"></CropperModal>
    <input type="file" class="d-none" ref="imageFile" @change="imageSelect" />
    <lazy-image style="min-height: 87px" :src="src" img-class="w-100" class="mb-0 page-cover" />
    <i class="material-icons-outlined camera-btn" v-if="canChange" @click="openFileSelect">photo_camera</i>
  </div>
</template>

<script>
import CropperModal from "../Modals/CropperModal";
import { Inertia } from "@inertiajs/inertia";
export default {
  props: {
    canChange: {
      type: Boolean,
      default: false,
      required: false,
    },
    src: {
      type: String,
      default: undefined,
      required: true,
    },
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
      formData.append("cover", this.file);
      formData.append("sizes", JSON.stringify(cordinates));
      formData.append("json", true);
      axios
        .post(this.$APP_URL + "/setcover", formData)
        .then((response) => {
          const data = response.data;
          if (data.result) {
            Inertia.reload();
          } else {
            const errors = data.errors;
            this.handleError(errors);
          }
        })
        .then(() => (this.loading = false));
    },
  },
  data() {
    return {
      crop: false,
      image: "",
      file: null,
      loading: false,
    };
  },
  components: {
    CropperModal,
  },
};
</script>

<style scoped>
.closebtn {
  position: absolute;
  left: 16px;
  top: 16px;
}
</style>
