<template>
  <v-sheet color="white" width="100%" height="100%" class="py-2">
    <v-container class="mx-auto">
      <v-row justify="center">
        <v-col cols="auto">
          <v-img
            src="img/logos/logo_550x178.png"
            class="cursor-pointer mx-auto"
            max-width="300"
            @click="$router.push({ name: 'main.home' })"
          />
          <keep-alive>
            <router-view />
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AuthLayout extends Vue {}
</script>