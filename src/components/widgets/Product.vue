<template>
  <v-card class="mx-auto" :max-width="`${width}px`">
    <template v-if="!(horizontal && $vuetify.breakpoint.smAndUp)">
      <div :style="`width:${width}px`">
        <v-img width="100%" :src="product.img" />
      </div>
      <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" small>
          <v-icon class="mr-1">mdi-eye</v-icon>Detalles
        </v-btn>

        <v-btn color="primary" small>
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </template>
    <!-- Horizontal -->
    <div class="d-flex pb-2" v-else>
      <div :style="`width:${width*0.5}px`">
        <v-img width="100%" :src="product.img" />
      </div>
      <div class="d-block">
        <v-card-title>${{ Number(product.price).toFixed(2) }}</v-card-title>
        <v-card-subtitle class="pb-0">{{ product.title }}</v-card-subtitle>
        <v-card-actions style="position: absolute; bottom: 2px">
          <v-btn color="primary" small>
            <v-icon class="mr-1">mdi-eye</v-icon>Detalles
          </v-btn>

          <v-btn color="primary" small>
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <!--/ Horizontal -->
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProduct } from "@/types";

@Component
export default class ProductWidget extends Vue {
  @Prop({
    type: Object,
    default: {
      title: "",
      price: "",
      img: "",
      description: "",
    },
  })
  readonly product!: IProduct;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly horizontal!: boolean;

  get width() {
    const rem = 18;
    if (this.horizontal && this.$vuetify.breakpoint.smAndUp) return 25 * rem;
    else return 13 * rem;
  }
}
</script>