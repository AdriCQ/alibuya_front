import { VuexModule, Module, Action, Mutation } from 'vuex-class-modules';
import store from '@/store/store';
import { IUserProfile, ILoginParams, IRegisterParams, IUserContact, IResetPasswordParams, IApiResponse, IAuthResponse } from '@/types';
import { UserService, AxiosHelper } from '@/services';
import Storage from '@/utils/Storage';
import { Route } from 'vue-router';

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
  contacts: IUserContact[] = [];

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
  login(_params: ILoginParams) {
    return new Promise((resolve, reject) => {
      AxiosHelper.callableService(UserService.login(_params), (_resp: IApiResponse<IAuthResponse>) => {
        this.profile = _resp.DATA.profile;
        this.api_token = _resp.DATA.api_token;
      })
        .then(_resp => {
          this.getContacts().catch(contactError => reject(contactError))
          resolve(_resp)
        })
        .catch(_error => reject(_error));
    })
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
   * Actions user module
   * @param _email 
   */
  @Action
  async requestResetPasswordEmail(_email: string) {
    try {
      const _resp = (await UserService.requestPasswordResetEmail(_email)).data;
      if (!_resp.STATUS) {
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

  @Action
  async resetPasword(_params: IResetPasswordParams) {
    try {
      const _resp = (await UserService.resetPassword(_params)).data;
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

  @Action
  addContact(_contact: IUserContact) {
    return new Promise((resolve, reject) => {
      AxiosHelper.callableService(UserService.storeContact(_contact), (_resp: IApiResponse<IUserContact>) => {
        this.contacts.push({
          id: _resp.DATA.id,
          first_name: _resp.DATA.first_name,
          last_name: _resp.DATA.last_name,
          ci: _resp.DATA.ci,
          address: _resp.DATA.address,
        });
      }).then(() => resolve(true)).catch(error => reject(error));
    });
  }

  @Action
  getContacts() {
    return new Promise((resolve, reject) => {
      AxiosHelper.callableService(UserService.getContacts(), (_resp: IApiResponse<IUserContact[]>) => {
        _resp.DATA.forEach(contact => {
          this.contacts.push({
            id: contact.id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            ci: contact.ci,
            address: contact.address,
          });
        })
      }).then(() => resolve(true)).catch(error => reject(error));
    });
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
  @Mutation
  getFromLocalStorage() {
    console.log("Get user from local storage.");
    const store = storage.get();
    if (store) {
      this.profile = store.profile;
      this.api_token = store.api_token;
    }
  }

  /**
   * Remove contact from contacts
   * @param _key number
   */
  removeContact(_key: number) {
    this.contacts.splice(_key, 1);
  }

  getContactById(_id: number) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === _id) {
        return this.contacts[i]
      }
    }
    return null;
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