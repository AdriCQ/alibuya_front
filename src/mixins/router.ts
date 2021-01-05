import { Vue, Component } from "vue-property-decorator";
import { UserStore } from '@/store';
import { IRoute } from '@/types';

/**
 * Vuetify breakpoints and breakpoints conditionals getters
 */
@Component
export class RouterMixin extends Vue {

  gotoAuth() {
    UserStore.redirect = this.$route;
    this.$router.push({
      name: 'auth.login',
    })
  }

  goto(_route: IRoute) {
    if (this.$route.name !== _route.name || this.$route.query !== _route.query) {
      this.$router.push(_route)
    }

  }
}