<template>
  <div class="view-container" id="init-vendor-view">
    <v-section>
      <business-form @submit="submitForm" :edit="edit" />
    </v-section>
  </div>
</template>

<script lang='ts'>
import { PopupStore, VendorStore } from "@/store";
import { IVendor } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "business-form": () => import("@/components/forms/vendor/BusinessForm.vue"),
  },
})
export default class NewVendorView extends Vue {
  get edit() {
    return VendorStore.vendor ? true : false;
  }

  async submitForm(_vendor: IVendor) {
    try {
      await VendorStore.store(_vendor);
      this.$router.push({
        name: "vendor.home",
      });
    } catch (error) {
      PopupStore.addNotification(error);
    }
  }
}
</script>