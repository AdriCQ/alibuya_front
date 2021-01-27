<template>
  <v-card-title class="py-2">
    <v-section class="full-width" fluid>
      <v-row justify="space-between" no-gutters>
        <v-col>
          <span class="text-h6 text-sm-h5 text-lg-h4 font-weight-bold">
            {{ title }}

            <!-- Price in smAndUp -->
            <template v-if="price && smAndUp">
              &nbsp; |
              {{ `$${Number(price).toFixed(2)}` }}
            </template></span
          >
        </v-col>

        <!--
          Suggested Tag
          TODO: Crear v-banner para indicar que este producto es sugerido, incluir links a lista de productos sugeridos
         -->
        <v-col v-if="isSuggested" cols="auto">
          <v-btn
            color="primary"
            :fab="smAndDown"
            :rounded="!smAndDown"
            x-small
            outlined
            class="text-transform-none"
          >
            <v-icon :x-small="!smAndDown" :small="smAndDown" class="mr-md-1">
              mdi-heart
            </v-icon>
            <template v-if="!smAndDown"> Sugerido</template>
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="space-between" no-gutters class="mt-3">
        <!-- Raiting -->
        <v-col cols="auto">
          <v-rating
            :value="rating"
            background-color="primary lighten-1"
            color="primary"
            dense
            half-increments
            readonly
          />
        </v-col>
        <!-- Brand -->
        <v-col cols="auto">
          <v-btn color="primary" rounded depressed small>
            {{ brand }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- Price in xs -->
      <v-row v-if="xs" no-gutters class="mt-2">
        <v-col cols="12">
          <span class="title">
            {{ `$${Number(price).toFixed(2)}` }}
          </span>
        </v-col>
      </v-row>
    </v-section>
  </v-card-title>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { GettersBreakpointsMixin } from "@/mixins/utils";

@Component
export default class ProductDetailsHeading extends mixins(
  GettersBreakpointsMixin
) {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop(Number) readonly price!: number;
  @Prop({ type: Number, default: 3.5 }) readonly rating!: number;
  @Prop(String) readonly brand!: string;
  // suggested product
  @Prop({ type: Boolean, default: false }) readonly isSuggested!: boolean;
}
</script>