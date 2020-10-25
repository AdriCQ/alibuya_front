<template>
  <v-footer padless dark color="secondary" class="pt-3 pb-0 px-2 footer-main">
    <v-container fluid>
      <v-row dense>
        <v-col cols="12" md="8">
          <v-row justify="center">
            <v-col v-for="n in 3" :key="n" cols="6" sm="3" class="pt-0">
              <!-- External Links -->
              <v-list color="secondary" class="external-links pt-0" dark>
                <v-list-item class="text-center">
                  <v-list-item-content>
                    <v-list-item-title>Title</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  color="secondary"
                  v-for="(link, key) in externalLinks"
                  :key="key"
                  :to="{ name: link.to }"
                  class="fit-width mx-auto"
                >
                  <v-list-item-content>
                    <v-list-item-action-text>
                      {{ link.label }}
                    </v-list-item-action-text>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <!-- / External Links -->
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <!-- Contact Banners -->
          <div class="contact-banners mx-auto">
            <h4 class="title text-center text-md-left">Title</h4>
            <v-list
              color="secondary"
              class="mx-auto mx-md-0 pt-0"
              max-width="300"
              subheader
              dense
              dark
            >
              <v-list-item v-for="(link, key) in contactLinks" :key="key" dense>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-hover v-slot="{ hover }">
                      <v-banner
                        rounded="xl"
                        :color="hover ? 'primary' : 'white'"
                        :width="link.width"
                        class="py-1 mx-auto mx-md-0"
                        :light="hover ? false : true"
                        single-line
                      >
                        <template v-slot:icon>
                          <v-icon
                            :color="hover ? 'white' : 'primary'"
                            class="mr-auto"
                            medium
                            >{{ link.icon }}</v-icon
                          >
                        </template>
                        <span class="text-body-1"> {{ link.label }}</span>
                      </v-banner>
                    </v-hover>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <!-- / Contact Banners -->
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row justify="space-between" align="center">
        <v-col sm="4" md="4">
          <v-img
            src="images/logo.png"
            max-width="200"
            alt="logo"
            class="mx-auto mx-md-0"
          />
        </v-col>
        <!-- Main Links -->
        <!--
        <v-col cols="12" sm>     
          <v-list dense color="secondary" class="d-flex">
            <v-list-item v-for="(link, key) in links" :key="key" class="px-0">
              <v-list-item-content>
                <v-btn color="transparent" small depressed dark>
                  {{ link.label }}
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>  
        </v-col>
          -->
        <!-- / Main Links -->

        <v-col md="3" offset-md="1">
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
import { ILinkIconLabel } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {
  icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

  get links(): ILinkIconLabel[] {
    return [
      {
        label: "Link 1",
      },
      {
        label: "Link 2",
      },
      {
        label: "Link 3",
      },
      {
        label: "Link 4",
      },
    ];
  }

  get externalLinks() {
    return [
      {
        label: "Link 1",
        to: "link 1",
      },
      {
        label: "Link 2",
        to: "link 2",
      },
      {
        label: "Link 3",
        to: "link 3",
      },
    ];
  }

  get contactLinks() {
    return [
      { icon: "mdi-phone", label: "+53 92 71 28", width: 200 },
      { icon: "mdi-mail", label: "royal.boxx@nauta.cu", width: 260 },
    ];
  }
}
</script>