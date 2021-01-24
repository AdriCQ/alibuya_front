<template>
  <div class="full-width max-w-30">
    <v-card-title>{{ title }}</v-card-title>
    <v-img :src="imageSrc" />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EmptyInventary extends Vue {
  @Prop(String) readonly title!: string;
  imageSrc = "img/png/empty-cart.png";
}
</script>