<template>
  <div id="account-contacts">
    <edit-popup />
    <v-card elevation="0">
      <v-row>
        <v-col
          v-for="(contact, key) in contacts"
          :key="`account-contact-${key}`"
          cols="12"
          sm="6"
          lg="4"
        >
          <contact :contact="contact" :key-contact="key" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { UserStore } from "@/store";
import { IUserContact } from "@/types";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    contact: () => import("@/components/widgets/setting/Contact.vue"),
    "edit-popup": () => import("@/components/popups/ContactEditPopup.vue"),
  },
})
export default class AccountContacts extends Vue {
  created() {
    this.contacts = UserStore.userContacts;
  }

  contacts: IUserContact[] = [];
}
</script>