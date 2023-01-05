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
import Invoice from "./views/Invoice.vue";

import DashbHome from "./views/DashbHome.vue";
import DashbProfile from "./views/DashbProfile.vue";
import DashbProduct from  "./views/DashbProduct.vue";
import DashbProductForm from "./views/DashbProductForm.vue";
import DashbProductCategory from "./views/DashbProductCategory.vue";
import DashbInvoice from "./views/DashbInvoice.vue";
import DashbInvoiceDetail from "./views/DashbInvoiceDetail.vue";
import DashbBlog from "@/views/DashbBlog.vue";
import DashbBlogNew from "@/views/DashbBlogNew.vue";
import DashbBlogEdit from "@/views/DashbBlogEdit.vue";
import DashbUser from "./views/DashbUser.vue";
import DashbSocial from "./views/DashbSocial.vue";

import ScanInvoice from "./views/ScanInvoice.vue";
import ErrorNotFound from "./views/ErrorNotFound.vue";

const useBuildPath = true;
const routes = {
    beranda: { path: "/", component: Beranda },
    profil: { path: "/user", component: Profil, meta: { needLogin: true } },
    tentang: { path: "/about", component: Tentang },
    produk: { path: "/product", component: Produk },
    produkKategori: { path: "/product/category/:categoryId", component: Produk },
    produkDetail: { path: "/product/detail/:id", component: ProdukDetail },
    blog: { path: "/blog", component: Blog },
    blogDetail: { path: "/blog/detail/:slug", component: BlogDetail },
    login: { path: "/login", component: Account },
    register: { path: "/register", component: Account },
    invoice: { path: "/invoice", component: Invoice, meta: { needLogin: true } },

    dashboard: { path: "/app", component: DashbHome, meta: { needLogin: true } },
    dashbProfile: { path: "/app/profile", component: DashbProfile, meta: { needLogin: true } },
    dashbProduct: { path: "/app/product", component: DashbProduct, meta: { needAdminRole: true } },
    dashbProductNew: { path: "/app/product/new", component: DashbProductForm, meta: { needAdminRole: true } },
    dashbProductEdit: { path: "/app/product/edit/:id", component: DashbProductForm, meta: { needAdminRole: true } },
    dashbProductCategory: { path: "/app/product/category", component: DashbProductCategory, meta: { needAdminRole: true } },
    dashbInvoice: { path: "/app/invoice", component: DashbInvoice, meta: { needAdminRole: true } },
    dashbInvoiceDetail: { path: "/app/invoice/:id", component: DashbInvoiceDetail, meta: { needLogin: true } },
    dashbBlog: { path: "/app/blog", component: DashbBlog, meta: { needAdminRole: true } },
    dashbBlogNew: { path: "/app/blog/new", component: DashbBlogNew, meta: { needAdminRole: true } },
    dashbBlogEdit: { path: "/app/blog/edit/:id", component: DashbBlogEdit, meta: { needAdminRole: true } },
    dashbUser: { path: "/app/users", component: DashbUser, meta: { needAdminRole: true } },
    dashbSocial: { path: "/app/social", component: DashbSocial, meta: { needAdminRole: true } },

    scanInvoice: { path: "/app/scan-qr", component: ScanInvoice },
    e404: { path: "/:pathMatch(.*)*", component: ErrorNotFound }
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