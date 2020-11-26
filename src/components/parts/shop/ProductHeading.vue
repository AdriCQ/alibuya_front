<template>
  <v-card-title>
    <v-row align="center" no-gutters>
      <v-col cols="auto">
        <span class="text-h6 text-sm-h5 font-weight-bold"
          >{{ title }}

          <br v-if="xs" />
          <template v-else>&nbsp; | </template>

          {{ `$${Number(price).toFixed(2)}` }}
        </span>
      </v-col>

      <v-spacer />

      <v-col class="text-center" cols="auto">
        <v-btn color="primary" rounded raised outlined class="font-weight-bold">
          {{ brand }}
        </v-btn>
      </v-col>

      <v-col v-if="!xs" cols="12" class="mt-3">
        <v-progress-linear
          value="10"
          height="5"
          background-color="transparent"
        />
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductHeading extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(Number) readonly price!: number;
  @Prop(String) readonly brand!: string;

  // breakpoints
  get xs() {
    return this.$vuetify.breakpoint.xs;
  }
}
</script>