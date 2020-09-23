<template>
  <div>
    <AppHeader></AppHeader>
    <LawsModal></LawsModal>
  </div>
</template>

<script>
import LawsModal from "../Components/Modals/LawsModal";
import AppHeader from "../Components/App/header/AppHeader";
export default {
  name: "Welcome",
  components: { LawsModal, AppHeader },
};
</script>

<style>
</style>