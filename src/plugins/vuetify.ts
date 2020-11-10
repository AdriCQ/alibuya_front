import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: '#FFCA28',
        secondary: '#263238',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        // Others
        tertiary: '#263238',
        // Primary variants
        primaryLight: '#FFECB3',
        primaryDark: '#FB8C00',
        // Gray light
        grayLight: '#CFD8DC'
      }
    },
  },
},
);
