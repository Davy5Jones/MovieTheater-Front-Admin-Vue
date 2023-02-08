import router from "@/router";
import Store, { actions } from "@/Vuex/Store";
import axios from "axios";
import notify from "./NotificationService";
const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((req) => {
  req.withCredentials = true;
  return req;
});

tokenAxios.interceptors.response.use(
  (response) => response,
  (error) => {

    if (
      !error.response.status ||
      error.response.status === 401 ||
      error.response.status === 403
    ) {
      sessionStorage.clear(); //.setItem("theaterAdminLogged", JSON.stringify(false));
      Store.dispatch(actions.SET_IS_LOGGED, false);
       notify.error(new Error("please log in"));
       router.push("/home/login")
       return
    }
    notify.error(error.response.data);
    return Promise.reject(error);
  }
);

export default tokenAxios;
