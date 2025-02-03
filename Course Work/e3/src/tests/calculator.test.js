import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Calculator from '@/components/Calculator.vue';

describe('Calculator.vue', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(Calculator);
  });

  it('renders correctly', () => {
    expect(wrapper.find('.calculator-container').exists()).toBe(true);
  });

  it('initial display value is 0', () => {
    expect(wrapper.vm.displayValue).toBe('0');
  });

  it('handles number input correctly', async () => {
    await wrapper.vm.handleInput('5');
    expect(wrapper.vm.displayValue).toBe('5');
  });

  it('handles operator input correctly', async () => {
    await wrapper.vm.handleInput('5');
    await wrapper.vm.handleInput('+');
    await wrapper.vm.handleInput('3');
    expect(wrapper.vm.displayValue).toBe('5+3');
  });

  it('calculates result correctly', async () => {
    await wrapper.vm.handleInput('5');
    await wrapper.vm.handleInput('+');
    await wrapper.vm.handleInput('3');
    await wrapper.vm.calculateResult();
    expect(wrapper.vm.displayValue).toBe('8');
  });

  it('clears display when C is pressed', async () => {
    await wrapper.vm.handleInput('9');
    await wrapper.vm.clear();
    expect(wrapper.vm.displayValue).toBe('0');
  });

  it('deletes last input when DEL is pressed', async () => {
    await wrapper.vm.handleInput('9');
    await wrapper.vm.handleInput('8');
    await wrapper.vm.del();
    expect(wrapper.vm.displayValue).toBe('9');
  });

  it('handles division by zero correctly', async () => {
    await wrapper.vm.handleInput('5');
    await wrapper.vm.handleInput('/');
    await wrapper.vm.handleInput('0');
    await wrapper.vm.calculateResult();
    expect(wrapper.vm.displayValue).toBe('Undefined');
  });

  it('disables operator buttons correctly', async () => {
    await wrapper.vm.handleInput('+');
    expect(wrapper.vm.isOperatorDisabled('+')).toBe(true);
  });
});