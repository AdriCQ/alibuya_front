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
          <!-- Vendor link shop -->
          <v-col cols="auto">
            <v-card
              class="cursor-pointer"
              width="12rem"
              :to="{ name: 'vendor.business' }"
            >
              <div class="text-center">
                <v-sheet color="secondaryBetha" class="pa-8">
                  <v-icon x-large color="primary">mdi-shopping</v-icon>
                </v-sheet>
              </div>
              <v-card-text class="text-center title"
                >Mi Tienda
                <v-icon color="success" v-if="myVendors">mdi-check</v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- / Vendor link shop -->
          <template v-if="myVendors">
            <v-col
              cols="auto"
              v-for="(option, vKey) in vendorPages"
              :key="`${vKey}`"
            >
              <option-card :option="option" />
            </v-col>
          </template>
        </v-row>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { PopupStore, UserStore, VendorStore } from "@/store";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
    "option-card": () => import("@/components/widgets/VendorOption.vue"),
  },
})
export default class VendorHomeView extends Vue {
  mounted() {
    this.loadVendors();
  }

  get myVendors() {
    return VendorStore.vendor;
  }

  // Config icon and Routes
  get vendorPages() {
    return [
      {
        icon: "mdi-cart-outline",
        label: "Productos",
        to: { name: "vendor.products" },
      },
      {
        icon: "mdi-chart-bar",
        label: "Estadísticas",
      },
      {
        icon: "mdi-account-multiple",
        label: "Colaboladores",
      },
      {
        icon: "mdi-database",
        label: "Ajustes",
      },
      {
        icon: "mdi-help-circle",
        label: "Ayuda",
      },
    ];
  }

  get isLogged() {
    return UserStore.isLogged;
  }

  start() {
    this.$router.push({
      name: "vendor.new",
    });
  }

  async loadVendors() {
    try {
      await VendorStore.getByAuth();
    } catch (err) {
      PopupStore.addNotification(err);
    }
  }
}
</script>