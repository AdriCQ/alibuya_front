<template>
  <v-carousel
    hide-delimiter-background
    height="auto"
    cycle
    show-arrows-on-hover
  >
    <v-carousel-item>
      <v-section
        bg="images/banners/b3.jpg"
        height="auto"
        class="pa-5"
        :minHeight="minHeight"
      >
        <v-row justify="end" align="center">
          <v-col xs="12" sm="8" md="6" lg="4" xl="4">
            <v-card light>
              <v-card-text class="pb-0">
                <p class="title text-center">
                  Inicia sesión para vivir tu mejor experiencia
                </p>
              </v-card-text>
              <v-card-text class="mt-0">
                <v-btn
                  color="primary"
                  large
                  width="100%"
                  @click="openAuthPopup('login')"
                >
                  Iniciar Sesión
                </v-btn>
                <p
                  class="anchor--text pt-2 cursor-pointer"
                  @click="openAuthPopup('register')"
                >
                  Registrar Cuenta
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-section>
    </v-carousel-item>
    <v-carousel-item>
      <v-section
        bg="images/banners/b1.jpg"
        height="auto"
        class="pa-5"
        :minHeight="minHeight"
      >
        <v-row align="center">
          <v-col xs="12" sm="8" md="6" lg="4" xl="4">
            <v-card light>
              <v-card-text class="pb-0">
                <p class="title text-center">
                  Envía hermosos regalos desde tu hogar
                </p>
              </v-card-text>
              <v-card-text class="mt-0">
                <v-btn
                  color="primary"
                  width="100%"
                  @click="openAuthPopup('login')"
                >
                  <v-icon class="mr-2">mdi-gift</v-icon> Explorar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-section>
    </v-carousel-item>

    <v-carousel-item>
      <v-section
        bg="images/banners/b2.png"
        height="auto"
        class="pa-5"
        :minHeight="minHeight"
      >
        <v-row align="center">
          <v-col xs="12" sm="8" md="6" lg="4" xl="4">
            <v-card light>
              <v-card-text class="pb-0">
                <p class="title text-center">
                  Lorem, ipsum dolor sit amet consectetur
                </p>
              </v-card-text>
              <v-card-text class="mt-0">
                <v-btn color="primary" width="100%">
                  <v-icon class="mr-2">mdi-cart</v-icon> lorem
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-section>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component
export default class HomeAppSider extends Vue {
  minHeight = "300px";

  openAuthPopup(type: "register" | "login") {
    PopupStore.openAuth(type);
  }
}
</script>