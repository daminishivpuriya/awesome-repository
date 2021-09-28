import PolicyDetailsQuestions from './PolicyDetailsQuestions';
import { mockCommon } from '@/../test/mockCommon.mock';
import { mockRootStore } from '@/../test/rootStore.mock';
import { verifyRenderedComponent, itt } from '@/../test/renderHelper';

const component = PolicyDetailsQuestions;

describe('PolicyDetailsQuestions', () => {
  const methods = component.options.methods;
  const computed = component.options.computed;
  let res;
  verifyRenderedComponent({
    component: PolicyDetailsQuestions,
    options: {
      mocks: mockCommon(),
      store: mockRootStore(),
      propsData: {
        customMessage: '',
        policyDetails: {},
      },
    },
  });

  describe('computed', () => {
    describe('isLockedOrLoading', () => {

      const ctx = testUtils.createConditionCTX({
        default: { isLocked: false, isLoading: false },
        Locked: { isLocked: true, isLoading: false },
        Loading: { isLocked: false, isLoading: true },
      });

      itt.returns(() => {
        res = computed.isLockedOrLoading.get.bind(ctx.default)();
        expect(res).toEqual(false);

        res = computed.isLockedOrLoading.get.bind(ctx.Locked)();
        expect(res).toEqual(true);

        res = computed.isLockedOrLoading.get.bind(ctx.Loading)();
        expect(res).toEqual(true);
      });
    });

    describe('validateIsNotGreaterThanTwenty', () => {

      itt.validates(() => {
        let ctx = {
          $t: (key: string) => key,
        };

        // draftDateIsValid
        let validations = computed.validateDraftDate.get.bind(ctx)();
        expect(validations[0]()).toBe(true);
        expect(validations[0](12)).toBe(true);
        expect(validations[0](21)).toBe('L_POLINFO_20_MAX');
      });
    });

    describe('validateDecimal', () => {

      itt.validates(() => {
        let ctx = {
          $t: (key: string) => key,
        };

        // draftDateIsValid
        let validations = computed.validateDecimal.get.bind(ctx)();
        expect(validations[0]()).toBe(true);
        expect(validations[0]('12')).toBe(true);
        expect(validations[0]('21.0')).toBe('L_POLO_INVALID_DATA');
      });
    });

  });
