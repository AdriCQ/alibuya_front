import { Vue, Component } from "vue-property-decorator";
import { UserStore } from '@/store/User';

/**
 * Utils methods for UserStore
 */
@Component
export class UserMixin extends Vue {
    logout() {
        UserStore.logout();
        if (this.$route.meta.requiresAuth) {
            this.$router.push({ name: 'main.home' });
        }
    }
}