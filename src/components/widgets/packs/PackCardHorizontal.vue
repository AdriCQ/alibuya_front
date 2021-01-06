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
      <p class="font-weight-bold">Método envío: {{ pack.delivery_method }}</p>
      <p class="font-weight-bold">Destinatario(s): {{ destinataries }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { PackStore } from "@/store";

@Component({
  components: {
    "pack-card": () => import("@/components/widgets/packs/PackCard.vue"),
  },
})
export default class PackCardWidgetHorizontal extends Vue {
  @Prop(Number) readonly packKey!: number;

  get pack() {
    return PackStore._packs[this.packKey];
  }
  get packPrice() {
    return PackStore.getPackPrice(this.packKey);
  }

  get destinataries() {
    let str = "";
    this.pack.destinataries?.forEach((dest) => {
      str += `${dest.first_name} ${dest.last_name}, ${dest.address}`;
    });
    return str;
  }
}
</script>