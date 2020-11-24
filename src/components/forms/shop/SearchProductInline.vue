<template>
  <v-form class="form-search-product full-width">
    <v-text-field
      background-color="white"
      placeholder="Buscar en alibuya"
      dense
      light
      flat
      solo
      hide-details
      class="input-padding rounded-lg"
    >
      <template v-slot:append>
        <v-btn color="primary" :height="38" dark class="rounded-lg">
          <v-icon color="black">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SearchInlineProduct extends Vue {}
</script>