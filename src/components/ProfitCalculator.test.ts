import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import ProfitCalculator from './ProfitCalculator.vue';
import { createPinia, setActivePinia } from 'pinia';
import ToggleComponent from './ToggleComponent.vue';
import { CONFIG } from '../config';

describe('ProfitCalculator', () => {
    const setup = () => {
        const wrapper = mount(ProfitCalculator, {
            global: {
                plugins: [createPinia()]
            }
        });

        return wrapper;
    };

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('renders the component with default props', () => {
        const wrapper = setup();

        expect(wrapper.find('.price-section').exists()).toBe(true);
        expect(wrapper.find('.profit-section').exists()).toBe(true);

        const priceCmp = wrapper.findComponent('#price');
        expect(priceCmp.exists()).toBeTruthy();
        expect((priceCmp as VueWrapper).props('label')).toBe('Price');

        const costCmp = wrapper.findComponent('#cost');
        expect(costCmp.exists()).toBeTruthy();
        expect((costCmp as VueWrapper).props('label')).toBe('Cost');

        const discountCmp = wrapper.findComponent('#discount');
        expect(discountCmp.exists()).toBeTruthy();
        expect((discountCmp as VueWrapper).props('label')).toBe('Discount');

        const toggleComponent = wrapper.findComponent(ToggleComponent);
        expect(toggleComponent.props('label')).toBe('Enable discount');
    });

    it('updates store values when NumericInput emits update:modelValue event', async () => {
        const wrapper = setup();

        const priceCmp = wrapper.findComponent('#price');
        await (priceCmp as VueWrapper).vm.$emit('update:modelValue', 10);
        expect(wrapper.vm.store.price).toBe(10);

        const costCmp = wrapper.findComponent('#cost');
        await (costCmp as VueWrapper).vm.$emit('update:modelValue', 5);
        expect(wrapper.vm.store.cost).toBe(5);

        const discountCmp = wrapper.findComponent('#discount');
        await (discountCmp as VueWrapper).vm.$emit('update:modelValue', 20);
        expect(wrapper.vm.store.discount).toBe(20);
    });

    it('updates store value and toggles enableDiscount when ToggleComponent emits update:checked event', async () => {
        const wrapper = setup();

        const toggleComponent = wrapper.findComponent(ToggleComponent);

        await toggleComponent.vm.$emit('update:checked', true);
        expect(wrapper.vm.store.enableDiscount).toBe(true);

        await toggleComponent.vm.$emit('update:checked', false);
        expect(wrapper.vm.store.enableDiscount).toBe(false);
    });

    it('renders the correct profit value based on store values', async () => {
        const wrapper = setup();

        wrapper.vm.store.price = 100;
        wrapper.vm.store.cost = 80;
        wrapper.vm.store.discount = 10;
        wrapper.vm.store.enableDiscount = true;

        await wrapper.vm.$nextTick();

        const profitValue = wrapper.find('.profit-value');
        const currencySymbol = CONFIG.CurrencySymbol ? ' ' + CONFIG.CurrencySymbol : '';
        expect(profitValue.text()).toBe(`10${currencySymbol}`);
    });
});
