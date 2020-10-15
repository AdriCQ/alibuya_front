<template>
  <v-dialog
    v-model="show"
    scrollable
    :max-width="`${dialogMaxWidth}rem`"
    @click:outside="closePopup"
  >
    <v-card>
      <v-card-title>
        <span class="headline"
          >{{ product.title }} ${{ Number(product.price).toFixed(2) }}</span
        >
      </v-card-title>
      <v-container max-height="400px" class="overflow-y-auto">
        <v-row>
          <v-col>
            <v-img :src="product.img" />
          </v-col>
          <v-col>
            <ul>
              <li v-for="(text, i) in product.description" :key="i">
                {{ text }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn color="secondary" icon @click="closePopup">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="goToDetails"
          ><v-icon class="mr-1">mdi-eye</v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp">Detalles Avanzados</span>
        </v-btn>
        <v-btn color="primary" @click="closePopup"
          ><v-icon class="mr-1">mdi-cart-plus</v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp">Añadir al Carrito</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component
export default class ProductDetailsPopup extends Vue {
  get show() {
    return PopupStore.productPopup;
  }

  get product() {
    return PopupStore.productToShow;
  }

  get dialogMaxWidth() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return 52;
      case "lg":
        return 50;
      case "md":
        return 42;
      case "sm":
        return 40;
      case "xs":
        return 20;
      default:
        return 10;
    }
  }

  closePopup() {
    PopupStore.productPopup = false;
  }

  goToDetails() {
    this.$router.push({
      name: "shop.details",
    });
    this.closePopup();
  }
}
</script>