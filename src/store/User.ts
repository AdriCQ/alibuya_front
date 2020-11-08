import { VuexModule, Module, Action } from 'vuex-class-modules';
import store from '@/store/store';
import { IUserProfile, ILoginParams, IRegisterParams } from '@/types';
import { UserService } from '@/services';
import Storage from '@/utils/Storage';
import { TPackDestinationPerson } from '../types/store/product';

const storage = new Storage("userStorage");

@Module({ generateMutationSetters: true })
class UserModule extends VuexModule {
  profile: IUserProfile = {
    email: '',
    first_name: '',
    last_name: '',
    address: ''
  };

  api_token: string | null = null;

  _userDestinataries: TPackDestinationPerson[] = [
    {
      first_name: "Adel",
      last_name: "Ferz",
      address: "Address",
    },
    {
      first_name: "Rafael",
      last_name: "Lopez",
      address: "Address",
    },
  ];

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
      last_name: '',
      address: ''
    };

    this.api_token = null;
    this.storeOnLocalStorage();
  }

  /**
   * Login action
   * @param _params ILoginParams
   * @emits error
   */
  @Action
  async login(_params: ILoginParams) {
    try {
      const _resp = (await UserService.login(_params)).data;
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
      const _resp = (await UserService.register(_params)).data;
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
  * Save on localStorage
  */
  storeOnLocalStorage() {
    storage.store({
      profile: this.profile,
      api_token: this.api_token,
    });
  }

  /**
   * Load from localStorage
   */
  getFromLocalStorage() {
    const store = storage.get();
    if (store) {
      this.profile = store.profile;
      this.api_token = store.api_token;
    }
  }

  /**
   * 
   */
  get userDestinataries(): TPackDestinationPerson[] {
    if (this.isLogged && !this._userDestinataries.length) {
      this._userDestinataries.push({
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        address: this.profile.address ? this.profile.address : '',
      })
    }
    return this._userDestinataries;
  }

  /**
   * addUserDestinatary
   * @param dest TPackDestinationPerson
   */
  addUserDestinatary(dest: TPackDestinationPerson) {
    if (dest.first_name !== '' && dest.last_name !== '' && dest.address !== '')
      this._userDestinataries.push(dest);
  }
}

// register module (could be in any file) 
export const UserStore = new UserModule({ store, name: 'Auth' });