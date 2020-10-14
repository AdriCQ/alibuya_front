<template>
  <div id="contact-view">
    <section class="mt-0">
      <banner-widget />
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "banner-widget": () => import("@/components/widgets/Banner.vue"),
  },
})
export default class ContactView extends Vue {}
</script>