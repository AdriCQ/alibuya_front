<template>
  <v-footer padless dark inset color="secondary" class="pt-3 footer-main">
    <v-container>
      <v-row justify="space-around">
        <v-col
          cols="auto"
          v-for="(group, gKey) in footerLinks"
          :key="`group-${gKey}`"
        >
          <div class="contact-banners mx-auto">
            <div class="links">
              <v-list
                color="secondary"
                class="mx-auto mx-md-0"
                subheader
                dense
                dark
              >
                <v-list-item
                  v-for="(link, key) in group"
                  :key="key"
                  dense
                  :to="link.to"
                >
                  <v-list-item-content>
                    <v-list-item-title> {{ link.label }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </div>
        </v-col>

        <v-col cols="auto">
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
import { ILinkIconLabel } from "@/types";
import { WEB_PAGES } from "@/utils";

@Component
export default class AppFooter extends Vue {
  icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

  get footerLinks(): Array<ILinkIconLabel[]> {
    return [
      WEB_PAGES,
      // Row 2
      [
        {
          label: "Empieza a Vender",
          to: { name: "vendor.home" },
        },
        {
          label: "Afiliados",
          to: { name: "vendor.home" },
        },
      ],
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