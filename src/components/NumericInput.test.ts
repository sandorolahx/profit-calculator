import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NumericInput from './NumericInput.vue';
import { Props as NumericInputProps } from '@/types/NumericInputTypes';

describe('NumericInput', () => {
    const setup = (initProps: Partial<NumericInputProps> = {}) => {
        const wrapper = mount(NumericInput, {
            propsData: {
                modelValue: null,
                ...initProps,
            },
        });

        return wrapper;
    };

    it('renders component with default props', () => {
        const wrapper = setup();

        expect(wrapper.find('.name').exists()).toBe(true);
        expect(wrapper.find('.name').text()).toBe('');
        expect(wrapper.find('input[type="number"]').exists()).toBe(false);
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect((wrapper.find('input[type="text"]').element as HTMLInputElement).disabled).toBe(false);
        expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe('');
    });

    it('renders component with provided props', () => {
        const label = 'Test Label';
        const modelValue = 10;
        const symbol = '$';
        const wrapper = setup({ label, modelValue, symbol });

        expect(wrapper.find('.name').text()).toBe(label);
        expect(wrapper.find('input[type="number"]').exists()).toBe(false);
        expect(wrapper.find('input[type="text"]').exists()).toBe(true);
        expect((wrapper.find('input[type="text"]').element as HTMLInputElement).disabled).toBe(false)
        expect((wrapper.find('input[type="text"]').element as HTMLInputElement).value).toBe(`${modelValue}${symbol}`);
    });


    it('renders disabled component', () => {
        const wrapper = setup({ disabled: true });

        expect((wrapper.find('input[type="text"]').element as HTMLInputElement).disabled).toBe(true);
    });

    it('emits update:modelValue event when input value changes', async () => {
        const wrapper = setup();
        const testValue = '42';

        const input = wrapper.find('input[type="text"]');
        await input.setValue(testValue);
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect((input.element as HTMLInputElement).value).toBe(testValue);
    });

    it('toggles between text and number input when focused and blurred', async () => {
        const wrapper = setup();

        const findInput = (selector: 'input[type="text"]' | 'input[type="number"]') => {
            return wrapper.find(selector);
        }

        expect(findInput('input[type="text"]').exists()).toBe(true);
        expect(findInput('input[type="number"]').exists()).toBe(false);

        await findInput('input[type="text"]').trigger('focus');
        expect(wrapper.vm.editing).toBe(true);
        expect(findInput('input[type="text"]').exists()).toBe(false);
        expect(findInput('input[type="number"]').exists()).toBe(true);

        await findInput('input[type="number"]').trigger('blur');
        expect(wrapper.vm.editing).toBe(false);
        expect(findInput('input[type="text"]').exists()).toBe(true);
        expect(findInput('input[type="number"]').exists()).toBe(false);
    });
});
