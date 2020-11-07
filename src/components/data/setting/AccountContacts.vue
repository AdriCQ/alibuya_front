<template>
  <div id="account-contacts">
    <v-card elevation="0">
      <v-row>
        <v-col
          v-for="(contact, key) in contacts"
          :key="`account-contact-${key}`"
          cols="12"
          sm="6"
          lg="4"
        >
          <contact-widget :contact="contact" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { IUserContact } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    "contact-widget": () =>
      import("@/components/widgets/setting/AccountContact.vue"),
  },
})
export default class AccountContacts extends Vue {
  contacts: IUserContact[] = [
    {
      full_name: "Darian",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
      full_name: "Pedro",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
      full_name: "Raquel",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
      full_name: "Leo",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
    {
      full_name: "Julio",
      ci: "01083172380",
      address:
        "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
    },
  ];
}
</script>