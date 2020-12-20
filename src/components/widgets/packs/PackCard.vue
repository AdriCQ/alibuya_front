<template>
  <div class="pack-card-widget">
    <v-card :width="`${size}rem`" @click="goToDetails()">
      <v-card-text class="pa-0">
        <v-row no-gutters>
          <!-- 1 Product -->
          <template v-if="products.length === 1">
            <v-col cols="12">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[0].image)"
                  :alt="products[0].title"
                  :width="`${size}rem`"
                  :height="`${size}rem`"
                />
              </v-sheet>
            </v-col>
          </template>
          <!-- /1 Product -->
          <!-- 2 Product -->
          <template v-if="products.length === 2">
            <v-col cols="12">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[0].image)"
                  :alt="products[0].title"
                  :width="`${size}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[1].image)"
                  :alt="products[1].title"
                  :width="`${size}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
          </template>
          <!-- /2 Product -->
          <!-- 3 Product -->
          <template v-if="products.length === 3">
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[0].image)"
                  :alt="products[0].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[1].image)"
                  :alt="products[1].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[2].image)"
                  :alt="products[2].title"
                  :width="`${size}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
          </template>
          <!-- /3 Product -->
          <!-- 4 Product -->
          <template v-if="products.length === 4">
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[0].image)"
                  :alt="products[0].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[1].image)"
                  :alt="products[1].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[2].image)"
                  :alt="products[2].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[3].image)"
                  :alt="products[3].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
          </template>
          <!-- /4 Product -->
          <!-- +4 Product -->
          <template v-if="products.length > 4">
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[0].image)"
                  :alt="products[0].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[1].image)"
                  :alt="products[1].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6">
              <v-sheet class="pack-image-container">
                <v-img
                  :src="getImage(products[2].image)"
                  :alt="products[2].title"
                  :width="`${size / 2}rem`"
                  :height="`${size / 2}rem`"
                />
              </v-sheet>
            </v-col>
            <v-col cols="6" align-self="center">
              <v-sheet class="pack-image-container" color="secondaryBetha">
                <div :style="moreStyle">+{{ products.length - 3 }}</div>
              </v-sheet>
            </v-col>
          </template>
          <!-- / +4 Product -->
        </v-row>
      </v-card-text>
      <v-card-text v-if="footer">
        <div class="ml-2 mt-2" v-if="productCounter">
          <span>{{ Number(countProducts) }} Productos</span>
        </div>
        <div class="ml-2 mt-2" v-if="withPrice">
          <span>${{ Number(pack.price * pack.cant).toFixed(2) }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { IProductsPack, IShopImage } from "@/types";
import { Vue, Component, Prop } from "vue-property-decorator";
import { ProductImage } from "@/utils";

@Component
export default class PackWidget extends Vue {
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
  @Prop({ type: Boolean, default: false }) readonly withPrice!: boolean;
  @Prop({ type: Boolean, default: false }) readonly productCounter!: boolean;

  @Prop({ type: String, default: "md" }) readonly mode!:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl";

  get size() {
    switch (this.mode) {
      case "xs":
        return 5;
      case "sm":
        return 8;
      case "lg":
        return 12;
      case "xl":
        return 15;
      default:
        return 10;
    }
  }

  get moreStyle() {
    const baseStyle = `width:${this.size / 2}rem; height:${
      this.size / 2
    }rem; text-align:center; color: rgba(0,0,0,0.65); `;
    switch (this.mode) {
      case "xs":
        return baseStyle + "font-size: 0.8rem; padding-top: 10px";
      case "sm":
        return baseStyle + "font-size: 1rem; padding-top: 18px";
      case "lg":
        return baseStyle + "font-size: 1.6rem; padding-top: 35px";
      case "xl":
        return baseStyle + "font-size: 2rem; padding-top: 50px";
      default:
        return baseStyle + "font-size: 1.3rem; padding-top: 25px";
    }
  }

  get products() {
    return this.pack.products;
  }

  get countProducts() {
    let counter = 0;
    this.pack.products.forEach((prod) => {
      counter += Number(prod.cart_cant);
    });
    return counter;
  }

  get footer(){
    return this.withPrice || this.productCounter;
  }

  goToDetails() {
    this.$emit("details");
  }

  deletePack() {
    this.$emit("delete");
  }

  getImage(_image: IShopImage) {
    // TODO: handle getImage
    return new ProductImage(_image).xs;
    // return "img/test/offers/1.png";
  }
}
</script>