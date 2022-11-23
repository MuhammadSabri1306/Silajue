import { createRouter, createWebHistory } from "vue-router";

import Beranda from "./views/Beranda.vue";
import Profil from "./views/Profil.vue";
import Tentang from "./views/Tentang.vue";
import Produk from "./views/Produk.vue";
import ProdukSaya from "./views/ProdukSaya.vue";
import ProdukDetail from "./views/ProdukDetail.vue";
import Blog from "./views/Blog.vue";
import BlogDetail from "./views/BlogDetail.vue";
import Account from "./views/Account.vue";
import Panduan from "./views/Panduan.vue";
import Invoice from "./views/Invoice.vue";

import DashbProduct from  "./views/DashbProduct.vue";
import DashbProductForm from "./views/DashbProductForm.vue";
import DashbProductCategory from "./views/DashbProductCategory.vue";

const useBuildPath = true;
const routes = {
    beranda: { path: "/", component: Beranda },
    profil: { path: "/user", component: Profil, meta: { needLogin: true } },
    tentang: { path: "/about", component: Tentang },
    produk: { path: "/product", component: Produk },
    produkKategori: { path: "/product/category/:categoryId", component: Produk },
    produkDetail: { path: "/product/detail/:id", component: ProdukDetail },
    blog: { path: "/blog", component: Blog },
    login: { path: "/login", component: Account },
    register: { path: "/register", component: Account },
    panduan: { path: "/guide", component: Panduan },
    invoice: { path: "/invoice", component: Invoice, meta: { needLogin: true } },
    dashboard: { path: "/app", component: DashbProduct, meta: { needAdminRole: true } },
    dashbProduct: { path: "/app/product", component: DashbProduct, meta: { needAdminRole: true } },
    dashbProductNew: { path: "/app/product/new", component: DashbProductForm, meta: { needAdminRole: true } },
    dashbProductEdit: { path: "/app/product/edit/:id", component: DashbProductForm, meta: { needAdminRole: true } },
    dashbProductCategory: { path: "/app/product/category", component: DashbProductCategory, meta: { needAdminRole: true } }
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