import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import { auth } from "./modules/auth";
const store: StoreOptions<RootState> = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth },
};

export default new Vuex.Store<RootState>(store);
