<template>
  <v-card outlined>
    <v-card-title class="pa-2 text-body-1"> {{ product.title }} </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <product-basic
            v-bind="basicProps"
            :product="basicPropProduct"
          ></product-basic>
        </v-col>
        <v-col cols="12" sm="6">
          <v-list>
            <!-- Color -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Color:
                  <v-btn
                    :color="product.options_details.color.value"
                    :max-height="colorBtnSize"
                    :max-width="colorBtnSize"
                    :ripple="false"
                    depressed
                    fab
                    dark
                    class="cursor-default"
                  />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- / Color -->

            <!-- Size -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Talla:
                  <v-chip outlined> {{ product.options_details.size }} </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- / Size -->

            <!-- Price -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Precio: ${{ Number(product.price).toFixed(2) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- / Price -->

            <!-- Cant -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Cantidad:
                  {{ product.cart_cant }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- / Cant -->

            <!-- Total -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Total: ${{
                    Number(product.cart_cant * product.price).toFixed(2)
                  }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Mixins } from "vue-property-decorator";
import { IProduct, IProductCart } from "@/types";
import { GettersBreakpointsMixin } from "@/mixins";

@Component({
  components: {
    "product-basic": () => import("@/components/widgets/products/Base.vue"),
  },
})
export default class ProductCartWidget extends Mixins(GettersBreakpointsMixin) {
  @Prop({ type: Object, required: true }) readonly product!: IProductCart;

  colorBtnSize = 28;

  /**
   * Getters
   */
  get basicPropProduct(): IProduct {
    return {
      id: this.product.id,
      title: this.product.title,
      brand: this.product.brand,
      tax: this.product.tax,
      description: this.product.description,
      price: this.product.price,
      images: this.product.images,
      image: this.product.image,
      weight: this.product.weight,
      options: this.product.options,
      tags: this.product.tags,
      rating: this.product.rating,
      suggested: this.product.suggested,
      available_cant: this.product.available_cant,
      type: this.product.type,
    };
  }

  get basicProps() {
    return {
      cardProps: {
        color: "grey lighten-2",
        outlined: true,
      },
      fluid: true,
    };
  }
}
</script>