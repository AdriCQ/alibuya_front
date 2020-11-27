<template>
  <div id="shop-view" class="view-container">
    <v-section>
      <v-container>
        <v-card flat>
          <v-card-title>Todos los departamentos</v-card-title>
          <v-card-text>
            <v-row justify="space-around">
              <v-col
                cols="auto"
                v-for="(category, key) in categories"
                :key="key"
              >
                <v-card
                  :to="category.to"
                  :width="$vuetify.breakpoint.mdAndUp ? '10rem' : '15rem'"
                >
                  <v-img
                    :src="category.image"
                    :alt="`Category-${key}`"
                    width="100%"
                  />
                  <v-card-subtitle class="black--text">{{
                    category.labelLang.es
                  }}</v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { CATEGORIES } from "@/utils";

@Component
export default class ShopHome extends Vue {
  get categories() {
    return CATEGORIES;
  }
}
</script>