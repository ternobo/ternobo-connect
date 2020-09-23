<template>
  <div class="header">
    <div class="container">
      <div class="d-flex align-items-center w-100">
        <router-link to="/feed" class="logodesktop" v-if="$root.isDesktop">
          <img src="/images/farsi-logo.png"  class="w-100" />
        </router-link>
        <router-link to="/feed" class="logo-sm" v-if="!$root.isDesktop">
          <img src="/images/logo.svg" class="mr-2 w-100" />
        </router-link>

        <div class="searchfield d-flex mr-3">
          <div class="input-group-icon searchfield">
            <input
              class="form-control searchfield rounded-pill py-2"
              id="searchforminput"
              autocomplete="off"
              required
              type="text"
              name="q"
              placeholder="هر چیزی که در جستن آنی، آنی"
            />
            <i class="material-icons clickale">search</i>
          </div>
          <div
            style="width: max-content"
            class="text-muted mx-2 align-items-center justify-content-center d-lg-flex d-none nowrap font-12"
            v-if="$root.isDesktop"
          >
            <img src="/images/beta.svg" class="mr-2 verical-middle" width="36"/>
            <span
              class="mx-1"
            >۰.۲ V</span>
          </div>
        </div>
      </div>
      <header-toolbar v-if="$root.isDesktop"></header-toolbar>
    </div>
  </div>
</template>

<script>
import HeaderToolbar from "./HeaderToolbar";
export default {
  name: "AppHeader",
  components: {
    HeaderToolbar
  }
};
</script>

<style lang="scss" scoped>
input{
  outline: none;
}
@import "../../../../sass/application/components/header/header";
</style>