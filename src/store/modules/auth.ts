import router from "@/router";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import { RootState } from "@/store/types";

interface AuthState {
  isAuth: boolean;
}

const state: AuthState = {
  isAuth: false,
};

const getters: GetterTree<AuthState, RootState> = {
  getAuth(state): boolean {
    return state.isAuth;
  },
};

const mutations: MutationTree<AuthState> = {
  setAuth(state: AuthState, payload: boolean): void {
    state.isAuth = payload;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  login({ commit }, { login, password }: { login: string; password: string }) {
    const hasUser: string | null = localStorage.getItem(`${login}`);
    // TODO:
    //  if we dont't have user add the notofication
    //  and we have user but password don't correct send notification too
    if (hasUser && hasUser === password) {
      commit("setAuth", true);
      localStorage.setItem("isAuth", "1");
    }
  },
  logout({ commit }): void {
    commit("setAuth", false);
    localStorage.removeItem("isAuth");
    router.push("auth");
  },
  registration(
    { dispatch },
    {
      login,
      password,
    }: {
      login: string;
      password: string;
    }
  ): void {
    if (!localStorage.getItem(`${login}`)) {
      localStorage.setItem(`${login}`, password);
      dispatch("login", { login, password });
    }
    // TODO: if we have user with current login sent notification
  },
};

export const auth: Module<AuthState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
