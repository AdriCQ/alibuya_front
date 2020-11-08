<template>
  <div id="vendor-home-view" class="view-container">
    <v-section>
      <v-card>
        <v-card-title>Sección de Vendedores</v-card-title>
        <!-- Require login -->
        <v-card-text v-if="!isLogged">
          <v-row>
            <!-- Login Card -->
            <v-col cols="12" sm="6">
              <login-card />
            </v-col>
            <!-- / Login Card -->
            <v-col cols="12" sm="6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquid maiores architecto asperiores libero quisquam est
                consequatur facere, labore nulla illum laborum repellat totam
                voluptate beatae enim pariatur deserunt recusandae
                exercitationem?
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- / Require login -->

        <v-row justify="space-around" v-else>
          <v-col
            cols="auto"
            v-for="(option, vKey) in vendorPages"
            :key="`${vKey}`"
          >
            <option-card :option="option" />
          </v-col>
        </v-row>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { UserStore } from "@/store";
import { VENDOR_PAGES } from "@/utils";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "option-card": () => import("@/components/widgets/VendorOption.vue"),
  },
})
export default class VendorHomeView extends Vue {
  // Config icon and Routes
  get vendorPages() {
    return VENDOR_PAGES;
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  start() {
    this.$router.push({
      name: "vendor.new",
    });
  }
}
</script>