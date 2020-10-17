<template>
  <div id="contact-view">
    <v-section bg="images/banners/b3.jpg">
      <v-row class="mt-10">
        <v-col v-for="i in 3" :key="i">
          <v-card>
            <v-card-title>Card {{ i }}</v-card-title>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              dignissimos alias ex ducimus laboriosam doloremque quia autem quos
              in eum. Harum, maiores deleniti. Reprehenderit ab ea sequi
              quisquam ad aut.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-section>
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