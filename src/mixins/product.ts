import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * Props used in Product Basic and all his containers
 */
@Component
export default class ProductBaseClass extends Vue {
  // props
  @Prop({ type: Boolean, default: true }) readonly link!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showTitle!: boolean; 
  @Prop({ type: Boolean, default: false }) readonly showPrice!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showDescription!: boolean;
  
  // props to children
  @Prop(Object) readonly imageProps!: object;
  @Prop(Object) readonly cardProps!: object;

  // design / states
  @Prop({ type: Boolean, default: false }) readonly large!: boolean;
  @Prop({ type: Boolean, default: false }) readonly small!: boolean;
}
