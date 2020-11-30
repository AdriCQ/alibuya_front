<template>
  <div class="fill-height py-6">
    <v-container class="mx-auto">
      <v-row justify="center">
        <v-col cols="auto">
          <v-img
            src="img/logos/logo_550x178.png"
            class="mx-auto"
            max-width="300"
          />
          <keep-alive>
            <router-view />
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AuthLayout extends Vue {}
</script>