<template>
  <div class="header">
    <div class="container">
      <div class="d-flex align-items-center w-100">
        <inertia-link href="/feed" class="logodesktop" v-if="$root.isDesktop">
          <img src="/images/farsi-logo.png" class="w-100" />
        </inertia-link>
        <inertia-link href="/feed" class="logo-sm" v-if="!$root.isDesktop">
          <img src="/images/logo.svg" class="mr-2 w-100" />
        </inertia-link>

        <form method="get" action="/search" class="searchfield d-flex mr-3">
          <autocomplete style="min-width: 270px" :default-value="searchVal" :search="search" id="searchforminput" autocomplete="off" required type="text" name="q" placeholder="هر چیزی که در جستن آنی، آنی" />
          <div style="width: max-content" class="text-muted mx-2 align-items-center justify-content-center d-lg-flex d-none nowrap font-12" v-if="$root.isDesktop">
            <img src="/images/beta.svg" class="mr-2 verical-middle" width="36" />
            <span class="mx-1">۰.۵ V</span>
          </div>
        </form>
      </div>
      <div class="d-flex align-items-center justify-content-end" style="min-width: 400px">
        <header-toolbar v-if="$root.isDesktop"></header-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import HeaderToolbar from "./HeaderToolbar";
export default {
  data() {
    return {
      searchVal: this.$page.props.search ? this.$page.props.search : "",
    };
  },
  methods: {
    search(input) {
      const element = document.getElementById("searchforminput").parentElement;
      element.style.position = "unset";
      if (element.getElementsByClassName("autocomplete-result-list").length > 0) {
        element.getElementsByClassName("autocomplete-result-list")[0].style.width = element.getBoundingClientRect().width + "px";
        element.getElementsByClassName("autocomplete-result-list")[0].style.marginTop = "-14px";
      }

      if (input.length < 2) {
        return [];
      }
      return new Promise((resolve, reject) => {
        axios
          .post(this.$APP_URL + "/search", {
            q: input,
          })
          .then((response) => {
            if (response.data.result) {
              resolve(response.data.suggestions);
            } else {
              resolve([]);
            }
          });
      });
    },
  },
  name: "AppHeader",
  components: {
    HeaderToolbar,
    Autocomplete,
  },
};
</script>
