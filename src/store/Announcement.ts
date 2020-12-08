import { VuexModule, Module } from 'vuex-class-modules';
import store from '@/store/store';
import { IAnnouncement, IProduct, IAnnouncementWithProducts, IAnnouncementsParams } from '@/types';
import { ShopService } from '@/services';


@Module({ generateMutationSetters: true })
class AnnouncementModule extends VuexModule {
  announcements: IAnnouncement[] = [];
  announcementsWithProducts: IAnnouncementWithProducts[] = [];
  products: IProduct[] = [];

  async startup() {
    try {
      this._getAnnouncements({
        count: 3,
      })
    }
    catch (error) {
      if (Array.isArray(error))
        throw error;
      else
        throw [error]
    }
  }

  /**
   * Gets announcements
   * @param _params 
   */
  async _getAnnouncements(_params: IAnnouncementsParams) {
    try {
      const _resp = (await ShopService.getAnnouncements(_params)).data;
      if (_resp.STATUS) {
        this.announcements = _resp.DATA.data;
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
export const AnnouncementStore = new AnnouncementModule({ store, name: 'Announcement' });