import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store';
import { IUserProfile } from '@/types';

@Module({ generateMutationSetters: true })
class AuthModule extends VuexModule {
  profile: IUserProfile = {
    email: '',
    first_name: '',
    last_name: ''
  };

  api_token: string | null = null;

  /**
   * 
   */
  get isLogged() {
    return this.api_token ? true : false;
  }
}

// register module (could be in any file) 
export const AuthStore = new AuthModule({ store, name: 'Auth' });