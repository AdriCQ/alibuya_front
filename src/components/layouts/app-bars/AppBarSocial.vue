<template>
  <v-app-bar tag="div" dense color="primary" dark>
    <!-- Social -->
    <v-btn icon>
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-twitter</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-youtube</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <!-- Social -->
    <v-divider vertical />

    <!-- Lanuage -->
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-flag</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- / Lanuage -->
    <v-divider vertical />

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppBarSocial extends Vue {}
</script>