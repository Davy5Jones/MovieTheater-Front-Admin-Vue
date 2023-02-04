import type { InjectionKey } from "vue";
import { createStore, useStore as baseStore, Store} from "vuex";

interface State{
  logged:boolean
}
export const enum actions {
  SET_IS_LOGGED = "SET_IS_LOGGED",
}
export const enum getter {
  GET_IS_LOGGED = "GET_IS_LOGGED",
}

export const key: InjectionKey<Store<State>> = Symbol();
export default createStore<State>({
  state: {
    logged: JSON.parse(sessionStorage?.getItem("theaterAdminLogged")||'false')
  },
  getters: {
    [getter.GET_IS_LOGGED](state): boolean {
      return state.logged;
    },
  },
  mutations: {
    [actions.SET_IS_LOGGED](state, value: boolean) {
      state.logged = value;
    },
  },
  actions: {
    [actions.SET_IS_LOGGED]({ commit }, logged: boolean) { 
      sessionStorage.setItem(
                 "theaterAdminLogged",
                 JSON.stringify(true)
               );
      commit(actions.SET_IS_LOGGED, logged);
              

    },
  },
});
export function useStore() {
  return baseStore(key);
}

