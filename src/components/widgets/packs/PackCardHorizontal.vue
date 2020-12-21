<template>
  <v-card class="pack-card-widget-horizontal d-flex" flat>
    <v-card-text class="pa-0 text-center" style="width: auto">
      <pack-card :pack="pack" :mode="$vuetify.breakpoint.name" />
    </v-card-text>

    <v-card-text class="w-100 pt-0">
      <p
        v-for="(product, productKey) in pack.products"
        :key="`product-${productKey}`"
      >
        {{ product.title }}
      </p>
      <p class="font-weight-bold">Cantidad: {{ pack.cant }}</p>
      <p class="font-weight-bold">
        Precio: ${{ Number(packPrice).toFixed(2) }}
      </p>
      <!-- <p class="font-weight-bold">Destinatario(s): {{ pack.destinataries }}</p> -->
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProductsPack } from "@/types";
import { PackStore } from "@/store";

@Component({
  components: {
    "pack-card": () => import("@/components/widgets/packs/PackCard.vue"),
  },
})
export default class PackCardWidgetHorizontal extends Vue {
  @Prop({
    type: Object,
    default: {
      price: 0,
      products: [],
      title: "",
      weight: 0,
      cant: 1,
      destinataries: [],
    },
  })
  readonly pack!: IProductsPack;
  @Prop(Number) readonly packKey!: number;

  get packPrice() {
    return PackStore.getPackPrice(this.packKey);
  }
}
</script>