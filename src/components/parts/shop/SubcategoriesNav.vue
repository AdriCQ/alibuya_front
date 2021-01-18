<template>
  <v-row :justify="justify">
    <v-col
      cols="auto"
      v-for="(subcategory, key) in subcategories"
      :key="`subcategory-nav-${key}`"
    >
      <v-btn
        color="primary"
        :to="subcategory.to"
        small
        depressed
        rounded
        class="btn-primary-alpha-gradient text-transform-none"
      >
        {{ subcategory.labelLang[appLang] }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { IProductTypeLink } from "@/types";
import { AppStore } from "@/store";

@Component
export default class SubcategoriesNav extends Vue {
  @Prop({ type: Array, required: true })
  readonly subcategories!: IProductTypeLink[];
  @Prop({ type: String, default: "" }) readonly justify!: string;

  get appLang() {
    return AppStore.lang;
  }
}
</script>