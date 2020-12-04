<template>
  <div class="pack-card-widget">
    <v-card :width="`${size}rem`" outlined @click="goToDetails()">
      <v-row no-gutters>
        <!-- 1 Product -->
        <template v-if="products.length === 1">
          <v-col cols="12">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[0].images)"
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
                :src="getImage(products[0].images)"
                :alt="products[0].title"
                :width="`${size}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[1].images)"
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
                :src="getImage(products[0].images)"
                :alt="products[0].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[1].images)"
                :alt="products[1].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[2].images)"
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
                :src="getImage(products[0].images)"
                :alt="products[0].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[1].images)"
                :alt="products[1].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[2].images)"
                :alt="products[2].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[3].images)"
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
                :src="getImage(products[0].images)"
                :alt="products[0].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[1].images)"
                :alt="products[1].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <v-img
                :src="getImage(products[2].images)"
                :alt="products[2].title"
                :width="`${size / 2}rem`"
                :height="`${size / 2}rem`"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet class="pack-image-container">
              <div
                :style="`font-size:${size / 5}rem; width:${
                  size / 2
                }rem; height:${
                  size / 2
                }rem; text-align:center; text-justify:center;`"
              >
                +{{ products.length - 4 }}
              </div>
            </v-sheet>
          </v-col>
        </template>
        <!-- / +4 Product -->
      </v-row>
      <div class="ml-2" v-if="withPrice">
        <span>${{ Number(pack.price * pack.cant).toFixed(2) }}</span>
      </div>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { IProductsPack, IShopImage } from "@/types";
import { ProductImage } from "@/utils";
import { Vue, Component, Prop } from "vue-property-decorator";

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
  @Prop(Boolean) readonly withPrice!: boolean;

  @Prop({ type: Number, default: 10 }) readonly size!: number;

  get products() {
    return this.pack.products;
  }

  goToDetails() {
    this.$emit("details");
  }

  deletePack() {
    this.$emit("delete");
  }

  getImage(_image: IShopImage) {
    // TODO: handle getImage
    return new ProductImage(_image);
  }
}
</script>