import { Vue, Component, Prop } from 'vue-property-decorator';
import { IProduct, IRibbon, IProductBaseWidget_title, IProductBaseWidget_rating } from '@/types';
@Component
export class ProductBaseMixin extends Vue {
  @Prop({ type: Object, required: true }) readonly product!: IProduct;
  // design
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
  @Prop({ type: Boolean, default: false }) readonly large!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showPrice!: boolean;
  @Prop({ type: Boolean, default: true }) readonly link!: boolean;

  // options
  @Prop(Object) readonly title!: IProductBaseWidget_title;
  @Prop(Object) readonly rating!: IProductBaseWidget_rating;
  @Prop(Object) readonly ribbon!: IRibbon;
  @Prop(Object) readonly cardProps!: object;
  @Prop(Object) readonly imageProps!: object;

  /**
   * Getters for objects prop with default values
   */
  get getTitle(): IProductBaseWidget_title {
    const _defaultTitle: IProductBaseWidget_title = { show: true, position: 'top', singleLine: true };
    return Object.assign(_defaultTitle, this.title);
  }

  get getRating(): IProductBaseWidget_rating {
    const _defaultRating: IProductBaseWidget_rating = { show: true, color: 'primary accent-4', bgColor: 'primary' };
    return Object.assign(_defaultRating, this.rating);
  }

  get getRibbon(): IRibbon {
    const _defaultRibbon: IRibbon = { show: false, color: 'primary', dark: true };
    return Object.assign(_defaultRibbon, this.ribbon);
  }

  /**
   * Methods
   */
  goToProductDetails(id: number) {
    if (id) {
      if (this.$route.name !== "shop.details")
        this.$router.push({
          name: "shop.details",
          query: {
            productId: id.toString(),
          },
        });
    }
  }
}
