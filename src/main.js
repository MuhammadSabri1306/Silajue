import { createApp } from "vue";

import router from "./router";
import { createPinia } from "pinia";
import FontAwesomeIcon from "./FontAwesomeIcon";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(PrimeVue);
app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
