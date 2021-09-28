import { shallowMount, VueClass } from '@vue/test-utils';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import Vuetify from 'vuetify';

export const renderComponent = (component: VueClass<Vue>, options: object): import('@vue/test-utils').Wrapper<Vue> => {
  Vue.use(Vuetify);
  const vuetify = new Vuetify({
    breakpoint: {},
  });

  const defaultOptions = {
    vuetify,
    mocks: {
      $t: (msg: string) => msg,
    },
  };

  return shallowMount(component, { ...defaultOptions, ...options });
};

export const verifyRenderedComponent = (
  settings: {
    component: VueConstructor<Vue>;
    options: object;
    wrapper?: import('@vue/test-utils').Wrapper<Vue>;
  },
) => {
  if (settings.wrapper === undefined) {
    settings.wrapper = renderComponent(settings.component, settings.options);
  }

  describe('render', () => {
    it('renders as its type with no errors', () => {
      expect(settings.wrapper.vm).toBeInstanceOf(Object);
      expect(settings.wrapper.is(settings.component)).toBe(true);
    });
  });

  return settings.wrapper;
};

export const commonTests = {
  createdDestroyed: (component: VueConstructor<Vue>) => {
    describe('created', () => {
      const ctx = {
        getApplication: jest.fn(),
        getPolicyChange: jest.fn(),
        isApplicationsRoute: true,
        $route: {
          params: {},
          query: {},
        },
        lifeObject: {},
        setQuickCheck: () => {},
        commonInfo: {
          prospectChildren: []
        },
      };

      it('gets the application', async () => {
        await component.options.created[0].bind(ctx)();
        expect(ctx.getApplication).toHaveBeenCalled();
      });

      it('gets the policy change', async () => {
        ctx.isApplicationsRoute = false;
        await component.options.created[0].bind(ctx)();
        expect(ctx.getPolicyChange).toHaveBeenCalled();
      });

      it('sets the observer', async () => {
        await component.options.created[0].bind(ctx)();
        expect(ctx.observer.patches).toEqual([]);
      })
    });

    describe('destroyed', () => {
      const ctx = {
        observer: {
          unobserve: jest.fn(),
        },
        lifeObject: {},
      };

      it('unobserves', () => {
        component.options.destroyed[1].bind(ctx)();
        expect(ctx.observer.unobserve).toHaveBeenCalledTimes(1);

        ctx.observer = null;
        component.options.destroyed[1].bind(ctx)();
        expect(ctx.observer).toBe(null);
      });
    });
  }
}

export const testUtils = {
  // Creates clones of the default ctx and changes values based on input.
  // Ex: { default: { color: 'red', test: true }, testCondition: { color: 'blue' } }
  // testCondition will be transformed to testCondition: { color: 'blue', test: true }
  createConditionCTX: (args) => {
    if (!args.default) throw new Error('No default condition provided for createConditionCTX call.');
    const ctx = {};
    ctx.default = args.default;
    delete args['default'];

    Object.entries(args).forEach(condition => {
      ctx[condition[0]] = { ...ctx.default };

      Object.entries(condition[1]).forEach(entry => {
        ctx[condition[0]][entry[0]] = entry[1];
      });
    });

    return ctx;
  },
};

// it() shortcuts
export const itt = {
  return: (func) => {
    it('returns the expected item(s)', func);
  },
  sets: (func) => {
    it('sets the expected properties', func);
  },
  validates: (func) => {
    it('validates as expected', func);
  },
  calls: (func) => {
    it('calls the expected methods', func);
  },
}
itt.returns = itt.return;
