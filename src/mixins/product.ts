import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * Props used in Product Basic and all his containers
 */
@Component
export class ProductMixin extends Vue {
  // shows
  @Prop({ type: Boolean, default: false }) readonly showTitle!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showPrice!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showDescription!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showRating!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showRibbon!: boolean;

  // props to children
  @Prop(Object) readonly imageProps!: object;
  @Prop(Object) readonly cardProps!: object;

  // design
  @Prop({ type: Boolean, default: true }) readonly link!: boolean;
  @Prop({ type: Boolean, default: false }) readonly large!: boolean;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
  @Prop({ type: Boolean, default: false }) readonly fluid!: boolean;
  @Prop({ type: Boolean, default: false }) readonly horizontal!: boolean;
  @Prop({ type: Boolean, default: true }) readonly titleOneLine!: boolean;
}
