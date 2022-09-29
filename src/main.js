import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import FontAwesomeIcon from "./FontAwesomeIcon";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
