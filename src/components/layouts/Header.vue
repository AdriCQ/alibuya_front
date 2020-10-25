<template>
  <!-- <header> -->
  <!-- <app-bar-social /> -->
  <!-- <app-bar-search v-if="$vuetify.breakpoint.smAndUp" /> -->
  <!-- <app-bar-pages /> -->
  <app-bar-full />
  <!-- </header> -->
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppBarFull from "./app-bars/AppBarFull.vue";

@Component({
  components: {
    AppBarFull,
  },
})
export default class AppHeader extends Vue {}
</script>