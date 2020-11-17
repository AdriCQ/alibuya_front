<template>
  <div class="view-container" id="init-vendor-view">
    <v-section>
      <business-form @submit="submitForm" />
    </v-section>
  </div>
</template>

<script lang='ts'>
import { IVendor } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "business-form": () => import("@/components/forms/vendor/BusinessForm.vue"),
  },
})
export default class NewVendorView extends Vue {
  submitForm(_vendor: IVendor) {
    console.log("Form submit", _vendor);
  }
}
</script>