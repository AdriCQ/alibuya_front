<template>
  <v-form class="full-width">
    <v-text-field
      background-color="white"
      placeholder="Buscar en ALIBUYA"
      dense
      light
      flat
      hide-details
      class="input-padding"
    >
      <template v-slot:append>
        <v-btn tile color="primaryDark" dark rounded>
          <v-icon>mdi-magnify</v-icon>
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