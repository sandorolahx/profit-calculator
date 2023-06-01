import { defineStore } from 'pinia'

export type ProfitCalculatorState = {
    price: number | null;
    cost: number | null;
    discount: number | null;
    enableDiscount: boolean;
}

export const useProfitCalculatorStore = defineStore({
    id: 'profitCalculator',
    state: () => ({
        price: null,
        cost: null,
        discount: null,
        enableDiscount: false
    } as ProfitCalculatorState),
    getters: {
        profit: (state) => {
            if (state.price === null || state.cost === null) {
                return null;
            }
            const discount = state.enableDiscount ? state.discount ?? 0 : 0;
            const result = state.price * (100 - discount) / 100 - state.cost;

            return +result.toFixed(2);
        }
    },
    actions: {
        discountToggled(newValue: boolean, clearValue = true) {
            if (!newValue && clearValue) {
                this.$state.discount = null;
            }
        }
    }
});
