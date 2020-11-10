import { VuexModule, Module, Action } from 'vuex-class-modules';
import store from '@/store/store';
import { IUserProfile, ILoginParams, IRegisterParams } from '@/types';
import { UserService } from '@/services';
import Storage from '@/utils/Storage';
<<<<<<< HEAD
import { IUserContact } from '@/types/store/user';
=======
import { IUserContact } from '@/types';
>>>>>>> 7d722b76e4e7d774e97b7a6c8b0d295195767461

const storage = new Storage("userStorage");

@Module({ generateMutationSetters: true })
class UserModule extends VuexModule {
  profile: IUserProfile = {
    first_name: '',
    last_name: '',
    email: '',
    address: ''
  };

  api_token: string | null = null;

<<<<<<< HEAD
  contacts: IUserContact[] = [];
=======
  userContacts: IUserContact[] = [{

    full_name: "Darian",
    ci: "01083172380",
    address:
      "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
  },
  {

    full_name: "Pedro",
    ci: "01083172380",
    address:
      "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
  },
  {

    full_name: "Raquel",
    ci: "01083172380",
    address:
      "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
  },
  {

    full_name: "Leo",
    ci: "01083172380",
    address:
      "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
  },
  {

    full_name: "Julio",
    ci: "01083172380",
    address:
      "Calle Silencio #32, E/ Cerice y San Antonio, Palmira, Cienfuegos",
  },];
>>>>>>> 7d722b76e4e7d774e97b7a6c8b0d295195767461

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
   * Remove contact from userContacts
   * @param _key number
   */
  removeContact(_key: number) {
    this.contacts.splice(_key, 1);
     console.log(this.contacts);
  }

  /**
   * Add contact to store
   * @param _contact IUserContact
   */
  addContact(_contact: IUserContact) {
    this.contacts.push(_contact);
    console.log(this.contacts);
  }

  /**
   * Update contact in idx [_key] with _contact
   * @param _contact IUserContact
   * @param _key number
   */
  updateContact(_contact: IUserContact, _key: number) {
    this.contacts[_key] = _contact;
  }
}

// register module (could be in any file) 
export const UserStore = new UserModule({ store, name: 'Auth' });