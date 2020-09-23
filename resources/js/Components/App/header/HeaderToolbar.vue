<template>
  <div class="toolbar">
    <div class="header-menu">
      <a class="active" href="https://ternobo.com/feed">
        <i class="navheader-icon">home</i>
        <div class="navheader-text">خانه</div>
      </a>
      <a href="https://ternobo.com/connections">
        <i class="navheader-icon">group</i>
        <div class="navheader-text">شبکه من</div>
      </a>
      <a href="https://ternobo.com/notifications">
        <i class="navheader-icon">notifications_none</i>
        <div class="navheader-text">اعلان‌ها</div>
      </a>
      <a href="https://ternobo.com/bookmarks">
        <i class="navheader-icon">bookmarks</i>
        <div class="navheader-text">نشان‌ها</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderToolbar",
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/application/components/header/toolbar";
</style>