<template>
  <v-app-bar
    dark
    color="primary"
    tag="div"
    class="pt-3"
    :class="{'app-bar-margin-top-sidebar-open':sidebarLeft}"
  >
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-toolbar-title>Alibuya</v-toolbar-title>
    </template>
    <v-spacer></v-spacer>

    <!-- Search -->
    <div v-if="this.$vuetify.breakpoint.smAndUp">
      <search-inline-form />
    </div>
    <!-- Search -->
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang='ts'>
import { AppStore } from "@/store/App";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "search-inline-form": () =>
      import("@/components/forms/SearchInlineForm.vue"),
  },
})
export default class AppBarSearch extends Vue {
  get sidebarLeft() {
    return AppStore.sidebarLeft;
  }
}
</script>