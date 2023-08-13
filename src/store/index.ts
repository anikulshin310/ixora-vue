import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { fetchData } from '@/network/api';
import API_ROUTES from '@/network/api_routes';

export const CURRENT = ['autos', 'models', 'modifications', 'params'] as const;
type TCurrent = (typeof CURRENT)[number];

interface IMainData {
  id: number;
  name: string;
}
interface IState {
  currentData: IMainData[] | null;
  autos: IMainData[] | null;
  models: IMainData[] | null;
  modifications: IMainData[] | null;
  params: {
    id: number;
    name: string;
  } | null;
  current: TCurrent;
  breadcrumbs: string[];
  loading: boolean;
}

export const key: InjectionKey<Store<IState>> = Symbol('store');
export default createStore<IState>({
  state: {
    currentData: null,
    autos: null,
    models: [],
    modifications: [],
    params: null,
    current: 'autos',
    breadcrumbs: ['Подбор стеклоочеститлей'],
    loading: false,
  },
  getters: {
    getCurrentData(state) {
      let value;
      switch (state.current) {
        case 'autos':
          value = state.autos;
          break;
        case 'models':
          value = state.models;
          break;
        case 'modifications':
          value = state.modifications;
          break;

        default:
          break;
      }
      return value;
    },
  },
  mutations: {
    SET_AUTOS(state, autos) {
      state.autos = autos;
    },
    SET_MODELS(state, models) {
      state.models = models;
    },
    SET_MODIFICATIONS(state, modifications) {
      state.modifications = modifications;
    },
    SET_PARAMS(state, params) {
      state.params = params;
    },
    SET_CURRENT(state, current) {
      state.current = current;
    },
    SET_BREADCRUMBS(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    async fetchAutos({ commit }) {
      try {
        commit('SET_LOADING', true);
        const data = await fetchData(API_ROUTES.AUTO);
        commit('SET_AUTOS', data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchModels({ commit }, id: number) {
      try {
        commit('SET_LOADING', true);
        const data = await fetchData(API_ROUTES.MODEL(id));
        commit('SET_MODELS', data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchModifications({ commit }, id: number) {
      try {
        commit('SET_LOADING', true);
        const data = await fetchData(API_ROUTES.MODIFICATIONS(id));
        commit('SET_MODIFICATIONS', data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchParams({ commit }, id: number) {
      try {
        commit('SET_LOADING', true);
        const data = await fetchData(API_ROUTES.MODIFICATION_PARAMS(id));
        commit('SET_PARAMS', data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    setCurrent({ commit }, current) {
      commit('SET_CURRENT', current);
    },
    setBreadcrumbs({ commit }, breadcrumbs) {
      commit('SET_BREADCRUMBS', breadcrumbs);
    },
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading);
    },
  },

  modules: {},
});
