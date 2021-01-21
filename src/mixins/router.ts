import { Vue, Component } from "vue-property-decorator";
import { AppStore } from '@/store/App';
import { IRoute } from '@/types';
import { ScrollTop } from '@/utils';

/**
 * Utils route methods
 */
@Component
export class RouterMixin extends Vue {
  /**
   * Save the current route in AppStore and go to Auth
   * @param _name string - route name
   */
  gotoAuth(_name = 'auth.login') {
    AppStore.redirect = this.$route;
    this.$router.push({
      name: _name,
    })
  }
  
  /**
   * Redirect to the route saved in AppStore
   */
  redirect() {
    if (AppStore.redirect) {
      this.$router.push({
        name: AppStore.redirect.name as string,
        query: AppStore.redirect.query,
      });
      AppStore.redirect = null;
    } else {
      //! not should happen
      console.log("Error, no redirect route set. Go to main.home route.");
      this.$router.push({
        name: "main.home",
      });
    }
  }

  /**
   * 
   * @param _route IRoute - route to navigate
   */
  goto(_route: IRoute) {
    if (this.$route.name !== _route.name ||
      (this.$route.query !== _route.query && (this.$route.query == {} && !_route.query))) {
      this.$router.push(_route);
    }
  }

  scrollTop() {
    ScrollTop();
  }
}