<template>
  <v-card :width="width" class="product-grid-widget">
    <!-- Title -->
    <v-card-title v-if="title" class="py-2 text-single-line">
      {{ title }}
    </v-card-title>
    <!-- Title -->

    <!-- Content -->
    <v-card-text>
      <v-row no-gutters>
        <v-col
          v-for="(product, key) in products"
          :key="`product-grid-item-${key}`"
          cols="6"
        >
          <product-basic
            :product="product"
            :card-props="{ flat: true }"
            :show-title="showTitle"
            title-class="text-subtitle-2"
            body-class="pa-0"
            class="ma-1"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <!-- / Content -->

    <v-card-actions v-if="to" class="px-4 py-3 mt-auto">
      <span class="text-link text-body-2" @click="goToRoute">
        {{ textLink }}
      </span>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import ProductBaseClass from "@/mixins/product";
import { IProduct, TRouteLink } from "@/types";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class GridProductWidget extends ProductBaseClass {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop({ type: [String, Number], default: 350 }) readonly width!:
    | string
    | number;
  @Prop({ type: String, default: "Ver más" }) readonly textLink!: string;
  @Prop([Object, String]) readonly to!: TRouteLink;

  /**
   *
   */
  goToRoute() {
    this.$router.push(this.to);
  }
}
</script>