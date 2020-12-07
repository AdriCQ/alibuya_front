import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * Props used in Product Basic and all his containers
 */
@Component
export default class ProductBaseClass extends Vue {
  // props
  @Prop({ type: Boolean, default: false }) readonly link!: boolean;
  @Prop({ type: Boolean, default: false }) readonly showTitle!: boolean; 
  @Prop({ type: Boolean, default: false }) readonly showPrice!: boolean;

  // props to children
  @Prop(Object) readonly imageProps!: object;
  @Prop(Object) readonly cardProps!: object;

  // class to childen
  @Prop(String) readonly titleClass!: string;
  @Prop(String) readonly bodyClass!: string;
  @Prop(String) readonly footerClass!: string;

  
  // methods 
  showProductDetails(id: number) {
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
