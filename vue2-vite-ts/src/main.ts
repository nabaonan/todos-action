import Vue from "vue";
import VueCompositionAPI, { createApp} from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import App from "./App.vue";
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)



//element-ui配置

// import { Loading, MessageBox, Notification, Message } from 'element-ui'

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

//iview配置
import { Message, LoadingBar, Modal, Notice, Spin } from "view-design";
// import Message from 'view-design/src/components/message'
// import LoadingBar from 'view-design/src/components/loading-bar'
// import Modal from 'view-design/src/components/modal'
// import Notice from 'view-design/src/components/notice'
// import Spin from 'view-design/src/components/spin'

Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Spin = Spin;


createApp({
  pinia: createPinia(),
  render: h => h(App),
  router,
}).mount('#app')

// app.use()
// new Vue({
//   el: "#app",
//   router,
//   pinia:store,
//   render: h => h(App),
// });


