import { Vue, Component } from "vue-property-decorator";
import { TBreakpointsNumber } from '@/types';

/**
 * Vuetify breakpoints and breakpoints conditionals getters
 */
@Component
export class GettersBreakpointsMixin extends Vue {
	// Breakpoints
	get xs() {
		return this.$vuetify.breakpoint.xs;
	}
	get sm() {
		return this.$vuetify.breakpoint.sm;
	}
	get md() {
		return this.$vuetify.breakpoint.md;
	}
	get lg() {
		return this.$vuetify.breakpoint.lg;
	}
	get xl() {
		return this.$vuetify.breakpoint.xl;
	}

	// Conditionals
	get xsOnly() {
		return this.$vuetify.breakpoint.xsOnly;
	}

	get smOnly() {
		return this.$vuetify.breakpoint.smOnly;
	}

	get smAndDown() {
		return this.$vuetify.breakpoint.smAndDown;
	}

	get smAndUp() {
		return this.$vuetify.breakpoint.smAndUp;
	}

	get mdOnly() {
		return this.$vuetify.breakpoint.mdOnly;
	}

	get mdAndDown() {
		return this.$vuetify.breakpoint.mdAndDown;
	}

	get mdAndUp() {
		return this.$vuetify.breakpoint.mdAndUp;
	}

	get lgOnly() {
		return this.$vuetify.breakpoint.lgOnly;
	}

	get lgAndDown() {
		return this.$vuetify.breakpoint.lgAndDown;
	}

	get lgAndUp() {
		return this.$vuetify.breakpoint.lgAndUp;
	}

	get xlOnly() {
		return this.$vuetify.breakpoint.xlOnly;
	}
}

/**
 * Config the global Product Widgets height
 */
@Component
export class ProductWidgetsHeight extends Vue {
	ProductWidgetsHeight_height: TBreakpointsNumber = {
		xl: 410,
		lg: 395,
		md: 390,
		sm: 380,
		xs: 340,
	}
}