import Vue from "vue";
import loader from '~/components/layouts/loader.vue'

import CircleCounter from 'vue-circle-counter';
import ModalSelect from '~/components/layouts/Modals/modal-select.vue'

import ModalMain from '~/components/layouts/Modals/modal-main.vue'

Vue.component('loader', loader);

Vue.component('CircleCounter', CircleCounter);

Vue.component('ModalSelect', ModalSelect);

Vue.component('ModalMain', ModalMain);