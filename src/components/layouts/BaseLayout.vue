<template>
  <div>
    <app-sidebar-left />
    <app-header />

    <!-- Sizes your content based upon application components -->
    <v-main id="app-content" style="padding: 0; height: 1000px;">
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppHeader from "./Header.vue";
import AppSidebarLeft from "./SidebarLeft.vue";

@Component({
  components: {
    AppHeader,
    AppSidebarLeft,
  },
})
export default class BaseLayout extends Vue {}
</script>