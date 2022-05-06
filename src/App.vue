<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    />
    <navigation v-if="showNavigation" />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/pages/Navigation";

const hideNavigationOnPages = ["login"];

export default {
  name: "app",
  components: {
    Navigation
  },
  computed: {
    showNavigation() {
      return !hideNavigationOnPages.includes(this.$route.name);
    }
  }
};
</script>

<style></style>
