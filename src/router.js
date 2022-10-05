import { createRouter, createWebHistory } from "vue-router";
import Beranda from "./views/Beranda.vue";
import Profil from "./views/Profil.vue";
import Produk from "./views/Produk.vue";

const useBuildPath = true;
const routes = {
    beranda: {
        path: "/",
        component: Beranda
    },
    profil: {
        path: "/profil",
        component: () => import("./views/Profil.vue")
    },
    produk: {
        path: "/produk",
        component: () => import("./views/Produk.vue")
    },
    produkDetail: {
        path: "/produk/detail/:id",
        component: () => import("./views/ProdukDetail.vue")
    }
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