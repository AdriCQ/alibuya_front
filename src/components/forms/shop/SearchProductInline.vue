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
      :class="{ 'input-small': small }"
    >
      <template v-slot:append>
        <v-btn color="primary" :height="btnHeight" dark class="rounded-lg">
          <v-icon color="black">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SearchInlineProduct extends Vue {
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;

  get btnHeight() {
    return this.small ? 32 : 38;
  }
}
</script>