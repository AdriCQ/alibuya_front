<template>
  <v-card v-bind="cardAllProps" :class="['product-grid-widget', cardClass]">
    <!-- Title -->
    <v-card-title v-if="title" class="text-single-line">
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
            body-class="pa-0"
            class="ma-1"
            small
          />
        </v-col>
      </v-row>
    </v-card-text>
    <!-- / Content -->

    <v-card-actions v-if="to" class="mt-auto">
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
  @Prop({ type: String, default: "Ver más" }) readonly textLink!: string;
  @Prop([Object, String]) readonly to!: TRouteLink;

  /**
   *
   */
  get cardClass() {
    return [{ large: this.large }];
  }

  get cardAllProps() {
    return {
      // defaults
      width: "100%",
      height: "100%",
      // from parent
      ...this.cardProps,
    };
  }
  /**
   *
   */
  goToRoute() {
    this.$router.push(this.to);
  }
}
</script>