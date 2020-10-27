import { VuexModule, Module, Action } from 'vuex-class-modules';
import store from '@/store/store';
import { IUserProfile, ILoginParams, IRegisterParams } from '@/types';
import { AuthService } from '@/services';

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

  /**
   * Logout
   */
  logout() {
    this.profile = {
      email: '',
      first_name: '',
      last_name: ''
    };

    this.api_token = null;
  }

  /**
   * Login action
   * @param _params ILoginParams
   * @emits error
   */
  @Action
  async login(_params: ILoginParams) {
    try {
      const _resp = (await AuthService.login(_params)).data;
      if (_resp.STATUS) {
        this.profile = _resp.DATA.profile;
        this.api_token = _resp.DATA.api_token;
      } else {
        const errors: string[] = [];
        for (const _key in _resp.ERRORS as unknown[]) {
          errors.push(_resp.ERRORS[_key]);
        }
        throw errors;
      }
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }

  /**
   * Register action
   * @param _params IRegisterParams
   * @emits error
   */
  @Action
  async register(_params: IRegisterParams) {
    try {
      const _resp = (await AuthService.register(_params)).data;
      if (_resp.STATUS) {
        this.profile = _resp.DATA.profile;
        this.api_token = _resp.DATA.api_token;
      } else {
        const errors: string[] = [];
        for (const _key in _resp.ERRORS as unknown[]) {
          errors.push(_resp.ERRORS[_key]);
        }
        throw errors;
      }
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }
}

// register module (could be in any file) 
export const AuthStore = new AuthModule({ store, name: 'Auth' });