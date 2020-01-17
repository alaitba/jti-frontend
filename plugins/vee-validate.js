import Vue from 'vue';
import VeeValidate from 'vee-validate';
 
Vue.use(VeeValidate, {
	inject: true
});


const dictionary = {
  en: {
    messages:{
      re: () => 'Some English Message'
    }
  },
  ar: {
    messages: {
      alpha: 'حاجة عربي'
    }
  }
};

