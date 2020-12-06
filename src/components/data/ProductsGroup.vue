<template>
  <v-card class="products-group" flat v-bind="props">
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-row v-if="!sm && !md" no-gutters>
      <v-col
        v-for="(product, key) in productsFilter"
        :key="`products-group-${key}`"
        cols
        sm="6"
        md="4"
        lg
      >
        <product-basic
          :product="product"
          :card-props="cardConfig"
          :image-props="imageConfig"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          class="ma-1 ma-md-2 ma-lg-0"
        >
        </product-basic>
      </v-col>
    </v-row>

    <slick-carousel
      v-else
      class="slick pa-0"
      :arrows="!xs"
      :centerMode="false"
      :infinite="false"
      :slidesToShow="slidesToShow"
      :swipe="true"
      :swipeToSlide="true"
      :slidesToScroll="1"
    >
      <!-- Arrows -->
      <template #prevArrow>
        <v-btn color="primary" x-small tile :height="60">
          <v-icon color="black"> mdi-arrow-left</v-icon>
        </v-btn>
      </template>

      <template #nextArrow>
        <v-btn color="primary" x-small tile :height="60">
          <v-icon color="black"> mdi-arrow-right</v-icon>
        </v-btn>
      </template>
      <!-- / Arrows -->

      <div
        v-for="(product, key) in products"
        :key="`slider-item-${key}`"
        class="pa-2"
      >
        <product-basic
          :card-props="cardConfig"
          :image-props="imageConfig"
          :product="product"
          :link="link"
          :show-title="showTitle"
          :show-price="showPrice"
          class="mx-auto"
        />
      </div>
    </slick-carousel>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";
import ProductBaseClass from "@/utils/mixins";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Basic.vue"),
  },
})
export default class ProductsGroup extends ProductBaseClass {
  @Prop({ type: Array, required: true }) readonly products!: IProduct[];
  @Prop(String) readonly title!: string;
  @Prop(Object) readonly props!: object;

  /* TODO: 
    Usar un getter para usar la cantidad de products de los que me manda el server dependiendo del breakpoint
    Esta componente sera un grid para las ofertas de productos que me mande el server
  */

  /**
   *
   */
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }

  get sm() {
    return this.$vuetify.breakpoint.sm;
  }

  get md() {
    return this.$vuetify.breakpoint.md;
  }

  /**
   *
   */
  get productsFilter() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return this.products.slice(0, 2);
      case "md":
        return this.products.slice(0, 3);
      case "lg":
        return this.products.slice(0, 4);
      case "xl":
        return this.products.slice(0, 5);
      default:
        return this.products.slice(0, 1);
    }
  }

  get cardConfig() {
    const cardDefaults = {
      flat: true,
      tile: true,
      ...this.cardProps,
    };
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return {};
      case "md":
        return {};

      case "lg":
        return {
          ...cardDefaults,
        };

      case "xl":
        return {
          ...cardDefaults,
        };

      default:
        return {
          ...cardDefaults,
          maxWidth: "100%",
        };
    }
  }

  get imageConfig() {
    const imageDefaults = {
      ...this.imageProps,
    };
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return {
          ...imageDefaults,
        };
      case "md":
        return {
          ...imageDefaults,
        };
      case "lg":
        return {
          ...imageDefaults,
          maxWidth: 210,
        };
      case "xl":
        return {
          ...imageDefaults,
          maxWidth: 300,
        };
      default:
        return {
          ...imageDefaults,
          maxWidth: 320,
        };
    }
  }

  get slidesToShow() {
    switch (this.$vuetify.breakpoint.name) {
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 4;
      case "xl":
        return 5;

      default:
        return 1;
    }
  }
}
</script>