import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * Props used in Product Basic and all his containers
 */
@Component
export class ProductBasicMixin extends Vue {
  // props
  @Prop(Boolean) readonly link!: boolean;
  @Prop(Boolean) readonly showTitle!: boolean; 
  @Prop(Boolean) readonly showPrice!: boolean;
  @Prop(Boolean) readonly showDescription!: boolean;
  @Prop(Boolean) readonly showRating!: boolean;
  @Prop(Boolean) readonly showRibbon!: boolean;
  
  // props to children
  @Prop(Object) readonly imageProps!: object;
  @Prop(Object) readonly cardProps!: object;

  // design / states
  @Prop(Boolean) readonly large!: boolean;
  @Prop(Boolean) readonly small!: boolean;
  @Prop(Boolean) readonly fluid!: boolean;

  // getters
  get getLink() {
    if (this.link) return this.link;
    else return true;
  }

   get getShowTitle() {
    if (this.showTitle) return this.showTitle;
    else return false;
   }
  
  get getShowPrice() {
    if (this.showPrice) return this.showPrice;
    else return false;
  }

  get getShowDescription() {
    if (this.showDescription) return this.showDescription;
    else return false;
  }

  get getShowRating() {
    if (this.showRating) return this.showRating;
    else return false;
  }

  get getShowRibbon() {
    if (this.showRibbon) return this.showRibbon;
    else return false;
  }

  get getLarge() {
    if (this.large) return this.large;
    else return false;
  }
  get getSmall() {
    if (this.small) return this.small;
    else return false;
  }

  get getFluid() {
    if (this.fluid) return this.fluid;
    else return false;
  }
}
