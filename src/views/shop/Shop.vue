<template>
  <div id="shop-view" class="view-container">
    <v-section>
      <v-container>
        <v-card>
          <v-card-title>Todos los departamentos</v-card-title>
        </v-card>
      </v-container>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ShopHome extends Vue {}
</script>