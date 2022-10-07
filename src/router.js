import { createRouter, createWebHistory } from "vue-router";
import Beranda from "./views/Beranda.vue";
import Profil from "./views/Profil.vue";
import Produk from "./views/Produk.vue";
import ProdukDetail from "./views/ProdukDetail.vue";
import ProdukForm from "./views/ProdukForm.vue";

const useBuildPath = true;
const routes = {
    beranda: { path: "/", component: Beranda },
    profil: { path: "/profil", component: Profil },
    produk: { path: "/produk", component: Produk },
    produkDetail: { path: "/produk/detail/:id", component: ProdukDetail },
    produkForm: { path: "/produk/form/:id?", component: ProdukForm }
};

const defineMyRouter = routesObj => {
    const routes = Object.entries(routesObj).map(([name, item]) => {
        return { name, ...item };
    });

    const basepath = useBuildPath ? "/" : "/";
    const history = createWebHistory(basepath);

    return createRouter({
        history,
        routes,
        scrollBehavior(to, from, savedPosition){
            if(savedPosition)
                return savedPosition;
            else return { top: 0 };
        }
    });
};

export default defineMyRouter(routes);