<template>
  <v-card>
    <v-card-title>
      <v-tabs v-model="tab" color="primary" grow centered>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab" class="py-1 px-2">
        <v-tab-item v-for="item in items" :key="item">
          <product-description />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "product-description": () =>
      import("@/components/data/ProductDescription.vue"),
  },
})
export default class TabsDescription extends Vue {
  tab = 0;
  items = [
    "Descripción",
    "Información adicional",
    "Valoraciones (0)",
    "Información del vendedor",
  ];
}
</script>