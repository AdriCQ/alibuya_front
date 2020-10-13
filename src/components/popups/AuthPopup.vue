  <template>
  <v-dialog v-model="show" persistent max-width="600px" scrollable>
    <keep-alive>
      <component :is="activeComponent" @toggle="switchForm" />
    </keep-alive>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Poups";

@Component({
  components: {
    "login-form": () => import("@/components/forms/auth/Login.vue"),
    "register-form": () => import("@/components/forms/auth/Register.vue"),
  },
})
export default class AuthPopup extends Vue {
  activeComponent: "register-form" | "login-form" = "register-form";

  get show() {
    return PopupStore.auth;
  }

  switchForm() {
    if (this.activeComponent === "register-form") {
      this.activeComponent = "login-form";
    } else {
      this.activeComponent = "register-form";
    }
  }
}
</script>