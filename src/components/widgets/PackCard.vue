<template>
  <div class="pack-card-widget">
    <v-card outlined max-width="10rem" @click="goToDetails()">
      <v-row no-gutters>
        <!-- 1 Product -->
        <template v-if="products.length === 1">
          <v-col cols="12">
            <v-sheet color="secondaryBetha">
              <v-img
                :src="products[0].images"
                :alt="products[0].title"
                height="10rem"
              />
            </v-sheet>
          </v-col>
        </template>
        <!-- / 1 Product -->

        <!-- 2 Product -->
        <template v-if="products.length === 2">
          <v-col cols="12">
            <v-sheet color="secondaryBetha">
              <v-img
                :src="products[0].images"
                :alt="products[0].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="secondaryBetha" class="mt-1">
              <v-img
                :src="products[1].images"
                :alt="products[1].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
        </template>
        <!-- / 2 Product -->

        <!-- 3 Product -->
        <template v-if="products.length === 3">
          <v-col cols="6">
            <v-sheet color="secondaryBetha">
              <v-img
                :src="products[0].images"
                :alt="products[0].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="ml-1">
              <v-img
                :src="products[1].images"
                :alt="products[1].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <v-sheet color="secondaryBetha" class="mt-1">
              <v-img
                :src="products[2].images"
                :alt="products[2].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
        </template>
        <!-- / 3 Product -->
        <!-- 4 Product -->
        <template v-if="products.length === 4">
          <v-col cols="6">
            <v-sheet color="secondaryBetha">
              <v-img
                :src="products[0].images"
                :alt="products[0].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="ml-1">
              <v-img
                :src="products[1].images"
                :alt="products[1].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="mt-1">
              <v-img
                :src="products[2].images"
                :alt="products[2].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="mt-1 ml-1" height="5rem">
              <v-img
                :src="products[3].images"
                :alt="products[3].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
        </template>
        <!-- / 4 Product -->
        <!-- +4 Product -->
        <template v-if="products.length > 4">
          <v-col cols="6">
            <v-sheet color="secondaryBetha">
              <v-img
                :src="products[0].images"
                :alt="products[0].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="ml-1">
              <v-img
                :src="products[1].images"
                :alt="products[1].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet color="secondaryBetha" class="mt-1">
              <v-img
                :src="products[2].images"
                :alt="products[2].title"
                height="5rem"
              />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet
              color="secondaryBetha"
              class="mt-1 ml-1 text-center justify-center pt-7"
              height="5rem"
            >
              <div style="font-size: 1.5rem; color: grey">
                +{{ products.length - 4 }}
              </div>
            </v-sheet>
          </v-col>
        </template>
        <!-- / +4 Product -->
      </v-row>
      <span class="ml-2">
        ${{ Number(pack.price * pack.cant).toFixed(2) }}
      </span>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { IProductsPack } from "@/types";
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

  get products() {
    return this.pack.products;
  }

  goToDetails() {
    this.$emit("details");
  }

  deletePack() {
    this.$emit("delete");
  }
}
</script>