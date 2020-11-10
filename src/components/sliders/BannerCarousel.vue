<template>
  <v-carousel
    hide-delimiter-background
    height="auto"
    cycle
    show-arrows-on-hover
  >
    <!-- Carousel 1 -->
    <v-carousel-item>
      <v-sheet color="#FFE082" light height="400px" class="pb-5">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
            <v-card-text
              class="text-center"
              :style="`font-size: ${titleSize}rem`"
              >ALIBUYA</v-card-text
            >
            <v-card-text
              class="text-center"
              :style="`font-size: ${subtitleSize}rem`"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              nam ea quam unde.
            </v-card-text>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
            <v-img src="img/png/1.png" width="100%" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <!-- / Carousel 1 -->

    <!-- Carousel 2 -->
    <v-carousel-item>
      <v-sheet color="accent" light height="400px" class="pb-5">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
            <v-card-text
              class="text-center"
              :style="`font-size: ${titleSize}rem`"
              >¿Eres vendedor?</v-card-text
            >
            <v-card-text
              class="text-center"
              :style="`font-size: ${subtitleSize}rem`"
              >Comienza a vender tus productos en Alibuya!!!</v-card-text
            >
            <v-card-text
              class="text-center"
              :style="`font-size: ${subtitleSize}rem`"
              ><v-btn
                :to="{ name: 'vendor.home' }"
                class="black--text"
                color="primary"
                >Empezar a vender</v-btn
              >
            </v-card-text>
          </v-col>

          <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
            <v-img src="img/png/4.png" width="100%" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
    <!-- / Carousel 3 -->
  </v-carousel>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store";

@Component
export default class BannerCarousel extends Vue {
  colors = [
    "indigo",
    "warning",
    "pink darken-2",
    "red lighten-1",
    "deep-purple accent-4",
  ];
  slides = ["First", "Second", "Third", "Fourth", "Fifth"];

  get titleSize() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return 3;
      case "lg":
        return 2;
      case "md":
        return 2;
      case "sm":
        return 1.8;
      case "xs":
        return 1.8;
      default:
        return 1;
    }
  }

  get subtitleSize() {
    switch (this.$vuetify.breakpoint.name) {
      case "xl":
        return 2;
      case "lg":
        return 1.2;
      case "md":
      default:
        return 1.2;
    }
  }

  openRegisterPopup() {
    PopupStore.auth = true;
  }
}
</script>