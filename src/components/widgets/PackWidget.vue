<template>
  <!-- Pack Cart -->
  <v-card
    class="mx-auto"
    :max-width="`${width + 6}rem`"
    :min-width="`${width}rem`"
  >
    <div style="position: absolute; right: 3px; top: 0px; z-index: 2">
      <v-btn color="error" x-large @click="deletePack" icon
        ><v-icon>mdi-delete-circle</v-icon></v-btn
      >
    </div>
    <div
      :style="`width:${width}rem; max-width: ${width + 2}rem; min-width: ${
        width - 2
      }rem`"
      class="mt-1"
    >
      <v-sheet width="100%" height="10rem" color="secondary" />
    </div>
    <v-card-title>
      <span class="text-center" style="width: 100%">{{ pack.title }}</span>
    </v-card-title>
    <v-card-text class="d-flex justify-center align-center">
      <input-cant :cant.sync="pack.cant" :can-minus="pack.cant > 1" />
      <span class="ml-2">
        Subtotal: ${{ Number(pack.price * pack.cant).toFixed(2) }}
      </span>
    </v-card-text>
  </v-card>
  <!-- / Pack Cart -->
</template>

<script lang='ts'>
import { IProductsPack } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    "input-cant": () => import("@/components/forms/shop/ProductCantInput.vue"),
  },
})
export default class PackWidget extends Vue {
  @Prop(Object) readonly pack!: IProductsPack;
  get width() {
    return 15;
  }

  deletePack() {
    this.$emit("delete");
  }
}
</script>