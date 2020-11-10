<template>
  <v-form class="full-width">
    <v-text-field
      background-color="white"
      placeholder="Buscar en alibuya"
      dense
      light
      flat
      hide-details
      class="input-padding"
    >
      <template v-slot:append>
<<<<<<< HEAD
        <v-btn height="32" min-width="50" tile color="primary">
=======
        <v-btn tile color="primaryDark" dark rounded>
>>>>>>> 7d722b76e4e7d774e97b7a6c8b0d295195767461
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