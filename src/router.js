import { createRouter, createWebHistory } from "vue-router";
import Beranda from "./views/Beranda.vue";
import Profil from "./views/Profil.vue";
import Tentang from "./views/Tentang.vue";
import Produk from "./views/Produk.vue";
import ProdukSaya from "./views/ProdukSaya.vue";
import ProdukDetail from "./views/ProdukDetail.vue";
import ProdukForm from "./views/ProdukForm.vue";
import Blog from "./views/Blog.vue";
import BlogDetail from "./views/BlogDetail.vue";
import BlogForm from "./views/BlogForm.vue";
import Account from "./views/Account.vue";
import Panduan from "./views/Panduan.vue";

const useBuildPath = true;
const routes = {
    beranda: { path: "/", component: Beranda },
    profil: { path: "/user", component: Profil },
    tentang: { path: "/about", component: Tentang },
    produk: { path: "/product", component: Produk },
    produkSaya: { path: "/myproduct", component: ProdukSaya },
    produkDetail: { path: "/product/detail/:id", component: ProdukDetail },
    produkForm: { path: "/product/form/:id?", component: ProdukForm },
    blog: { path: "/blog", component: Blog },
    blogDetail: { path: "/blog/detail/:id", component: BlogDetail },
    blogForm: { path: "/blog/form/:id?", component: BlogForm },
    login: { path: "/login", component: Account },
    register: { path: "/register", component: Account },
    panduan: { path: "/guide", component: Panduan }
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