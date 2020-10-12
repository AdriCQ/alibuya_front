<template>
  <header>
    <!-- <app-bar-social /> -->
    <app-bar-search />
    <app-bar-pages />
  </header>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppBarPages from "./app-bars/AppBarPages.vue";
import AppBarSearch from "./app-bars/AppBarSearch.vue";
// import AppBarSocial from "./app-bars/AppBarSocial.vue";

@Component({
  components: {
    AppBarPages,
    AppBarSearch,
    // AppBarSocial,
  },
})
export default class AppHeader extends Vue {}
</script>