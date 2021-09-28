import Vue from 'vue';
import Vuex from 'vuex';

export const mockRootStore = () => {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      policies: {
        state: {},
        actions: {
          getPolicyChange: () => {},
        },
        getters: {
          policyChange: () => { return {}; },
          policies: () => {},
          deficiencies: () => {},
        },
        namespaced: true,
      },
      applications: {
        state: {
          test: true,
        },
        getters: {
          application: () => {},
          applications: () => {},
          deficiencies: () => {},
        },
        namespaced: true,
      },
      utilities: {
        state: {
          test: true,
        },
        actions: {
          getMedicalQuestions: () => [],
          kba: () => {},
        },
        mutations: {
          setSkipIcrRoute: () => {},
        },
        getters: {
          application: () => {},
          applications: () => {},
          deficiencies: () => {},
          preferredEmailOrPhone: () => { return {}; },
          getMedicalQuestions: () => [],
          kbaData: () => {},
        },
        namespaced: true,
      }
    },
    state: {},
    getters: {
      isLoading: () => false,
      deficiencies: () => {},
      commonInfo: () => { return {}; },
      quickCheck: () => false,
      locale: () => 'en-us',
      navigation: () => {
        return {
          routes: {},
        };
      },
    },
    mutations: {
      setQuickCheck: () => false,
    }
  });
};
