<template>
  <div id="contact-view">
    <v-section class="pt-2">
      <v-card>
        <v-card-title>Atención a Clientes</v-card-title>
        <v-card-subtitle>Estamos disponibles 24 horas</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <contact-form />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card-title>Extra</v-card-title>

              <div class="text-center">
                <v-btn
                  color="secondary"
                  v-for="(v, i) in helpMethods"
                  :key="i"
                  width="100%"
                  class="mt-3"
                >
                  <a style="text-decoration: none; color: white" :href="v.to">
                    <v-icon color="primary">{{ v.icon }}</v-icon>
                    <span class="ml-2">{{ v.label }}</span>
                  </a> </v-btn
                ><br />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-section>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "contact-form": () => import("@/components/forms/Contact.vue"),
  },
})
export default class ContactView extends Vue {
  helpMethods = [
    {
      icon: "mdi-phone",
      label: "Atención telefónica",
      to: "tel:53375180",
    },
    {
      icon: "mdi-email-outline",
      label: "Envía un Email",
      to: "mailto:myemail@gmail.com",
    },
    {
      icon: "mdi-whatsapp",
      label: "Grupo de Ayuda Whatsapp",
      to: "mailto:myemail@gmail.com",
    },
  ];
}
</script>