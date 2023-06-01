import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToogleComponent from './ToggleComponent.vue';
import { Props as ToogleComponentProps } from '@/types/ToggleComponentTypes';

describe('ToogleComponent', () => {
    const setup = (initProps: Partial<ToogleComponentProps> = {}) => {
        const wrapper = mount(ToogleComponent, {
            propsData: {
                checked: false,
                ...initProps
            }
        });

        return wrapper;
    }

    it('renders component with default props', () => {
        const wrapper = setup();

        expect(wrapper.find('.name').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
        expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false);
    });

    it('renders component with provided label and checked prop', () => {
        const label = 'Test label';
        const checked = true;
        const wrapper = setup({ label, checked });

        expect(wrapper.find('.name').text()).toBe(label);
        expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(checked);
    });

    it('renders disabled component', () => {
        const wrapper = setup({ disabled: true });

        expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true);
    });

    it('triggers onChanged event when checkbox is changed', async () => {
        const wrapper = setup();

        await wrapper.find('input').trigger('change');

        expect(wrapper.emitted('onChanged')).toBeTruthy();
    });

    it('emits update:checked event when checkbox is changed', async () => {
        const wrapper = setup();

        await wrapper.find('input').trigger('change');

        expect(wrapper.emitted('update:checked')).toBeTruthy();
    });
});
