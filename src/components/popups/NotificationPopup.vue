<template>
  <v-snackbar app :value="show" top :color="notification.type" @input="update">
    <p v-for="(n, key) in notification.content" :key="key">
      {{ String(n) }}
    </p>

    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";

@Component
export default class NotificationPopup extends Vue {
  get show() {
    return PopupStore.notificationPopup;
  }

  get notification() {
    return PopupStore.notificationPopupContent;
  }

  close() {
    PopupStore.clearNotifications();
    PopupStore.notificationPopup = false;
  }

  update(_input: boolean) {
    PopupStore.notificationPopup = _input;
  }
}
</script>