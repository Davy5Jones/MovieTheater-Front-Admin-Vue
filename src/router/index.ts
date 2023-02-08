
import Home from "@/components/Pages/Home.vue";
import Page404 from "@/components/Pages/Page404.vue";
import ScreeningList from "@/components/ScreeningArea/ScreeningList.vue";
import Store,{getter} from "@/Vuex/Store";
import type * as vueRouter from "vue-router";
import MovieList from "@/components/MovieArea/MovieList.vue";
import LogginPage from "@/components/Forms/LogginPage.vue"
import AddMovie from "@/components/Forms/AddMovie.vue";



import  {
  createRouter,
  createWebHistory,
} from "vue-router";
import SingleMovieVue from "@/components/MovieArea/SingleMovie.vue";
import SingleScreeningVue from "@/components/ScreeningArea/SingleScreening.vue";
import PurchasesList from "@/components/PurchaseArea/PurchasesList.vue";
import CustomerList from "@/components/CustomerArea/CustomerList.vue";
import SingleCustomerVue from "@/components/CustomerArea/SingleCustomer.vue";
const ifNotAuthenticated = (
  to: vueRouter.RouteLocationNormalized,
  from: vueRouter.RouteLocationNormalized,
  next: vueRouter.NavigationGuardNext
) => {
  if (Store.getters[getter.GET_IS_LOGGED]) {
    next("/home");
    return;
  }
    next();

  
};

const ifAuthenticated = (
  to: vueRouter.RouteLocationNormalized,
  from: vueRouter.RouteLocationNormalized,
  next: vueRouter.NavigationGuardNext
) => {
  if (Store.getters[getter.GET_IS_LOGGED]) {
    next();
    return;
  }
  next("/home/login");
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/home/login",
      name: "login",
      beforeEnter: ifNotAuthenticated,
      component: LogginPage,
    },

    {
      path: "/screenings",
      name: "screenings",
      beforeEnter: ifAuthenticated,
      component: ScreeningList,
    },
    {
      path: "/screenings/:id",
      name: "singleScreening",
      beforeEnter: ifAuthenticated,
      component: SingleScreeningVue,
    },
    {
      path: "/movies",
      name: "movies",
      beforeEnter: ifAuthenticated,
      component: MovieList,
    },
    {
      path: "/movies/add",
      name: "addMovie",
      beforeEnter: ifAuthenticated,
      component: AddMovie,
    },
    {
      path: "/movies/:id",
      name: "singleMovie",
      beforeEnter: ifAuthenticated,
      component: SingleMovieVue,
    },
    {
      path: "/purchases",
      name: "purchases",
      beforeEnter: ifAuthenticated,
      component: PurchasesList,
    },
    {
      path: "/customers",
      name: "customers",
      beforeEnter: ifAuthenticated,
      component: CustomerList,
    },
    {
      path: "/customers/:id",
      name: "singleCustomer",
      beforeEnter: ifAuthenticated,
      component: SingleCustomerVue,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: Page404,
    },
  ],
});

export default router;
