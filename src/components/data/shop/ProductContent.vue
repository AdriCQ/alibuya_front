<template>
  <v-row>
    <v-col cols="12" md="9" order="2" order-md="1" class="pt-0">
      <v-card flat height="100%">
        <v-row no-gutters>
          <!-- Product Heading in smAndDown -->
          <v-col v-if="!mdAndUp" cols="12">
            <product-heading
              :title="product.title"
              :price="Number(product.price)"
              :brand="product.brand"
              :is-suggested="Boolean(product.suggested)"
            />
          </v-col>
          <!-- / Product Heading in smAndDown -->

          <!-- Product Gallery -->
          <v-col cols="12" md="5" class="mb-6 mb-md-0">
            <product-gallery :imgs-src="imagesSrc" />
          </v-col>
          <!-- / Product Gallery -->

          <v-col cols="12" md="7" order="4" order-md="2">
            <!-- Product Heading in mdAndUp -->
            <product-heading
              v-if="mdAndUp"
              :title="product.title"
              :price="Number(product.price)"
              :brand="product.brand"
              :is-suggested="Boolean(product.suggested)"
            />
            <!-- / Product Heading in mdAndUp -->

            <!-- Product Tags -->
            <v-card-text class="py-2">
              <v-row>
                <v-col v-if="product.tags" cols="12" class="mb-2">
                  <span class="text-body-1 font-weight-bold"> Etiquetas:</span>
                  <v-chip
                    v-for="(tag, key) in product.tags"
                    :key="`product-tags-${key}`"
                    color="primaryAlpha"
                    small
                    link
                    pill
                    class="black--text mx-1 mb-1"
                  >
                    {{ tag }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card-text>
            <!-- / Product Tags -->

            <!-- Production Description -->
            <div v-if="product.description" class="px-3">
              <v-col cols="12">
                <div v-html="product.description" class="text-justify" />
              </v-col>
              <v-col cols="12">
                <div v-html="product.description" class="text-justify" />
              </v-col>
              <v-col cols="12">
                <div v-html="product.description" class="text-justify" />
              </v-col>
            </div>
            <!-- / Production Description -->

            <v-card-text class="py-2">
              <!-- Simple Product Options -->
              <v-row no-gutters>
                <!-- Product Weight -->
                <v-col v-if="product.weight" cols="12" class="mb-2">
                  <span class="text-body-1 font-weight-bold"> Peso:</span>
                  {{ product.weight }} kg
                </v-col>

                <!-- Product Available Cant -->
                <v-col v-if="product.available_cant" cols="12" class="mb-2">
                  <span class="text-body-1 font-weight-bold">
                    Cantidad Disponible:</span
                  >
                  {{ product.available_cant }}
                </v-col>
              </v-row>
              <!-- / Simple Product Options -->
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- Add to Cart Form -->
    <v-col cols="12" md="3" order="1" order-md="2" class="pt-0">
      <add-to-cart
        v-if="isLogged"
        :product="product"
        class="mx-auto position-sticky"
        :style="stickyStyles"
      />
      <login-card
        v-else
        :props="{ flat: true, maxWidth: 450 }"
        class="mx-auto position-sticky"
        :style="stickyStyles"
      />
    </v-col>
    <!-- / Add to Cart Form -->
  </v-row>
</template>

<script lang='ts'>
import { UserStore } from "@/store";
import { IProductCart } from "@/types";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { GettersBreakpointsMixin } from "@/mixins/utils";

@Component({
  components: {
    "product-heading": () =>
      import("@/components/parts/shop/ProductHeading.vue"),
    "product-gallery": () => import("@/components/sliders/ProductGallery.vue"),
    "add-to-cart": () => import("@/components/parts/shop/ProductAddToCart.vue"),
    "login-card": () => import("@/components/widgets/LoginCard.vue"),
  },
})
export default class ProductContent extends mixins(GettersBreakpointsMixin) {
  @Prop({ type: Object }) readonly product!: IProductCart;

  // personsInfo: TPackDestinationPerson[] = [];

  // TODO: Work with limits
  // productLimit = 2;
  /**
   * Getters
   */
  get isLogged() {
    return UserStore.isLogged;
  }

  get stickyStyles() {
    return { top: this.lgAndUp ? "111px" : "0" };
  }

  // test - array of images
  get imagesSrc() {
    const images: string[] = [];

    /*
    if (this.product.images?.length) {
      this.product.images.forEach((image) => {
        images.push(new ProductImage(image).sm);
      });
    } else {
      images.push(new ProductImage(this.product.image).sm);
    }
    */

    // test images
    images.push("img/test/offers/1.png");
    images.push("img/test/offers/2.png");
    images.push("img/test/offers/3.png");
    images.push("img/test/offers/4.jpg");
    images.push("img/test/offers/1.png");
    images.push("img/test/offers/2.png");
    images.push("img/test/offers/3.png");

    return images;
  }
}
</script>