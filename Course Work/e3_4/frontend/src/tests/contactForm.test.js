import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactForm from '@/views/ContactForm.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useContactStore } from '@/stores/contactStore';
import axios from 'axios';

vi.mock('axios');

describe('ContactForm.vue', () => {
    let wrapper;
  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(ContactForm);
  });

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('validates email correctly', () => {
    const { validateEmail } = wrapper.vm;
    
    expect(validateEmail('valid.email@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@domain')).toBe(false);
    expect(validateEmail('user@domain.com')).toBe(true);
  });

  it('checks form validation function', () => {
    const { validateForm, store } = wrapper.vm;
    
    store.fname = 'Jane';
    store.lname = 'Doe';
    store.email = 'jane.doe@example.com';
    store.designation = 'student';
    store.feedback = 'Great experience!';
    store.userRating = 5;

    expect(validateForm()).toBe(true);

    store.email = 'invalid-email';
    expect(validateForm()).toBe(false);
  });

  it('disables submit button when form is incomplete', async () => {
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.attributes('disabled')).toBeDefined();
  });

  it('submits form successfully', async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    const store = useContactStore();
    store.fname = 'Jane';
    store.lname = 'Doe';
    store.email = 'jane.doe@example.com';
    store.designation = 'student';
    store.feedback = 'Great experience!';
    store.userRating = 5;

    await wrapper.find('form').trigger('submit.prevent');

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/feedback', expect.objectContaining({
      'fname': 'Jane',
      'lname': 'Doe',
      email: 'jane.doe@example.com',
      designation: 'student',
      feedback: 'Great experience!',
      rating: 5,
    }));
  });
});
