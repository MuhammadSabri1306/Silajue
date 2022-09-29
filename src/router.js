import { createRouter, createWebHistory } from "vue-router";
import Beranda from "./views/Beranda.vue";

const useBuildPath = true;
const routes = {
    beranda: {
        path: "/",
        component: Beranda
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