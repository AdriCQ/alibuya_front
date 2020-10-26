<template>
  <v-footer padless dark inset color="secondary" class="pt-3 footer-main">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md>
          <div class="d-flex align-center justify-center justify-md-start">
            <v-img src="images/logo.png" max-width="65" />
            <span class="text-h3"> Alibuya </span>
          </div>

          <p class="mb-0">
            Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada
            terra videa magna derita valies.
          </p>
        </v-col>

        <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical class="my-4" />

        <v-col cols="12" sm="3" md="2">
          <!-- Navigation Links -->
          <div class="links">
            <h5 class="subtitle-1 text-center">Navegación</h5>
            <v-list class="secondary d-flex d-sm-block">
              <v-list-item
                v-for="(link, key) in navLinks"
                :key="key"
                :to="{ name: link.to }"
                class="grey--text text--lighten-1 fit-width mx-auto"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ link.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <!-- / Navigation Links -->
        </v-col>

        <v-col cols="12" sm="3" md="2">
          <!-- Others Links -->
          <div class="links">
            <h5 class="subtitle-1 text-center">Otros</h5>
            <v-list class="secondary d-flex d-sm-block">
              <v-list-item
                v-for="(link, key) in otherLinks"
                :key="key"
                :to="{ name: link.to }"
                class="grey--text text--lighten-1 fit-width mx-auto"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ link.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <!-- /  Others Links -->
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <div class="contact-banners mx-auto">
            <div class="links">
              <h4 class="title text-center">Contáctenos</h4>
              <v-list
                color="secondary"
                class="mx-auto mx-md-0"
                subheader
                dense
                dark
              >
                <v-list-item
                  v-for="(link, key) in contactLinks"
                  :key="key"
                  dense
                >
                  <v-list-item-icon>
                    <v-icon color="light" size="22">{{ link.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title> {{ link.label }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row justify="space-between" align="center">
        <v-col>
          <!-- Social Links -->
          <div class="text-center">
            <v-btn
              v-for="(icon, key) in icons"
              :key="key"
              class="mx-2"
              color="white"
              icon
            >
              <v-icon color="white" size="25">{{ icon }} </v-icon>
            </v-btn>
          </div>
          <!-- / Social Links -->
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {
  icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

  get navLinks() {
    return [
      {
        label: "Inicio",
        to: "main.home",
      },
      {
        label: "Carrito",
        to: "main.home",
      },
      {
        label: "Cuentas",
        to: "main.home",
      },
    ];
  }

  get otherLinks() {
    return [
      {
        label: "Ropas",
        to: "main.home",
      },
      {
        label: "Automotiz",
        to: "main.home",
      },
      {
        label: "Celulares",
        to: "main.home",
      },
    ];
  }

  get contactLinks() {
    return [
      { icon: "mdi-chat", label: "chat.alibuya" },
      { icon: "mdi-mail", label: "correo.alibuya.com" },
      { icon: "mdi-phone", label: "+1 (844) 777 0122" },
    ];
  }
}
</script>