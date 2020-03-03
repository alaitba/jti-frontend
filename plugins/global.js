import Vue from "vue";
import loader from '~/components/layouts/loader.vue'

import CircleCounter from 'vue-circle-counter';
import ModalSelect from '~/components/layouts/modals/modal-select.vue'

Vue.component('loader', loader);

Vue.component('CircleCounter', CircleCounter);

Vue.component('modal-select', ModalSelect);