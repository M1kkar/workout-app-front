import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from "vuelidate/src";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.config.productionTip = false

Vue.use(Vuelidate);

const options = {
  confirmButtonColor: '#C1A65F',

}

Vue.use(VueSweetalert2, options);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
