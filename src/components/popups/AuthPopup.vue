  <template>
  <v-dialog v-model="show" persistent max-width="600px" scrollable>
    <v-card>
      <div class="text-center pa-2" v-if="loading">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <keep-alive>
        <component
          :is="`${authDefault}-form`"
          @toggle="switchForm"
          @loading:update="updateLoading"
        />
      </keep-alive>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { PopupStore } from "@/store/Popups";

@Component({
  components: {
    "login-form": () => import("@/components/forms/auth/Login.vue"),
    "register-form": () => import("@/components/forms/auth/Register.vue"),
  },
})
export default class AuthPopup extends Vue {
  loading = false;

  get show() {
    return PopupStore.auth;
  }

  get authDefault() {
    return PopupStore.authDefault;
  }

  switchForm() {
    if (PopupStore.authDefault === "register") {
      PopupStore.authDefault = "login";
    } else {
      PopupStore.authDefault = "register";
    }
  }

  updateLoading(_loading: boolean) {
    this.loading = _loading;
  }
}
</script>