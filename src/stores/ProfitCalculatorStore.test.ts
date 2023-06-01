import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { useProfitCalculatorStore, ProfitCalculatorState } from './ProfitCalculatorStore';

describe('ProfitCalculatorStore test', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    const setup = (initState: Partial<ProfitCalculatorState> = {}) => {
        const store = useProfitCalculatorStore();
        store.$patch(initState);

        return store;
    }

    it('default price should be null', () => {
        const store = setup();
        expect(store.price).toBe(null);
    });

    it('price value should be changed', () => {
        const store = useProfitCalculatorStore();
        const testPriceValue = 101;

        expect(store.price).toBe(null);
        store.price = testPriceValue;
        expect(store.price).toBe(testPriceValue);
    });

    it('default cost should be null', () => {
        const store = setup();
        expect(store.cost).toBe(null);
    });

    it('cost value should be changed', () => {
        const store = useProfitCalculatorStore();
        const testCostValue = 50;

        expect(store.cost).toBe(null);
        store.cost = testCostValue;
        expect(store.cost).toBe(testCostValue);
    });

    it('default discount should be null', () => {
        const store = setup();
        expect(store.discount).toBe(null);
    });

    it('discount value should be changed', () => {
        const store = useProfitCalculatorStore();
        const testDiscountValue = 15;

        expect(store.discount).toBe(null);
        store.discount = testDiscountValue;
        expect(store.discount).toBe(testDiscountValue);
    });

    it('default enableDiscount should be false', () => {
        const store = setup();
        expect(store.enableDiscount).toBe(false);
    });

    it('enableDiscount value should be changed', () => {
        const store = useProfitCalculatorStore();
        const testEnableDiscountValue = true;

        expect(store.enableDiscount).toBe(false);
        store.enableDiscount = testEnableDiscountValue;
        expect(store.enableDiscount).toBe(testEnableDiscountValue);
    });

    it('should return null profit with default values', () => {
        const store = setup();
        expect(store.profit).toBe(null);
    });

    it('should return null profit if price is not defined', () => {
        const store = setup({ cost: 12 });
        expect(store.profit).toBe(null);
    });

    it('should return null profit if cost is not defined', () => {
        const store = setup({ price: 12 });
        expect(store.profit).toBe(null);
    });

    it('should return the correct profit without discount', () => {
        const store = setup({ price: 100, cost: 10 });
        expect(store.profit).toBe(90);
    });

    it('should return the correct profit with discount', () => {
        const store = setup({ price: 100, cost: 10, discount: 50, enableDiscount: true });
        expect(store.profit).toBe(40);
    });

    it('should return the correct profit with disabled discount', () => {
        const store = setup({ price: 100, cost: 10, discount: 50, enableDiscount: false });
        expect(store.profit).toBe(90);
    });

    it('discountToggled should keep disabled discount if cleareValue is false', async () => {
        const store = setup({ enableDiscount: true, discount: 10 });
        expect(store.discount).toBe(10);
        store.discountToggled(false, false);
        expect(store.discount).toBe(10);
    });

    it('discountToggled should clear discount value if cleareValue is true', async () => {
        const store = setup({ enableDiscount: true, discount: 10 });
        expect(store.discount).toBe(10);
        store.discountToggled(false, true);
        expect(store.discount).toBe(null);
    });
});
