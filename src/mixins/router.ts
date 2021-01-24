import { Vue, Component } from "vue-property-decorator";
import { AppStore } from '@/store/App';
import { IRoute } from '@/types';

/**
 * Utils route methods
 */
@Component
export class RouterMixin extends Vue {
  private $_RouterMixin_SaveRoute() {
    AppStore.redirect = this.$route;
  }
  
  /**
   * Save the current route in AppStore and navigate to _route
   * @param _route IRoute - route to navigate
   */
  RouterMixin_saveRouteAndGoto(_route: IRoute) {
    this.$_RouterMixin_SaveRoute();
    this.RouterMixin_goto(_route);
  }
  
  /**
   * Redirect to the route saved in AppStore
   */
  RouterMixin_redirect() {
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
   * Navigate to _route
   * @param _route IRoute - route to navigate
   */
  RouterMixin_goto(_route: IRoute) {
    if (this.$route.name !== _route.name ||
      (this.$route.query !== _route.query && (this.$route.query == {} && !_route.query))) {
      this.$router.push(_route);
    }
  }
}