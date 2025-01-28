import { describe, it, beforeEach, expect, test } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCalculatorStore } from "@/stores/calculatorStore";


describe('Data Store Actions Tests', () => {
    let store = null
  
    beforeEach(() => {
      // create a fresh Pinia instance and make it active so it's automatically picked
      // up by any useStore() call without having to pass it to it:
      // `useStore(pinia)`
      setActivePinia(createPinia())
  
      // create an instance of the data store
      store = useCalculatorStore()
    })
  
    describe('Test handleling input', () => { 
        it('Pressing 1', () => {
            store.handleInput('1');
            expect(store.displayValue === '1');
        });
        it('Pressing +', () => {
            store.handleInput('+');
            expect(store.displayValue).toBe('0+');
        });
        it('Pressing 0 with hanging 0', () => {
            store.handleInput('0');
            store.handleInput('0');
            expect(store.displayValue).toBe('0');
        });
        it('Clearing input', () => {
            store.displayValue = '999*99';
            store.clear();
            expect(store.displayValue).toBe('0');
        });
    });

    describe('Test calculating result', () => {

        it('Calculating 1 + 1', () => {
            store.displayValue = '1+1';
            store.calculateResult();
            expect(store.displayValue).toBe('2');
        });
        it('Calculating 1 - 1', () => {
            store.displayValue = '1-1';
            store.calculateResult();
            expect(store.displayValue).toBe('0');
        });
        it('Calculating 3 * 3', () => {
            store.displayValue = '3*3';
            store.calculateResult();
            expect(store.displayValue).toBe('9');
        });
        it('Calculating 9 / 3', () => {
            store.displayValue = '9/3';
            store.calculateResult();
            expect(store.displayValue).toBe('3');
        });
        it('Dividing by 0: 100/0', () => {
            store.displayValue = '100/0';
            store.calculateResult();
            expect(store.displayValue).toBe('Undefined');
        });
    });

    describe('test adding a duplicate city', () => {
        it('Pressing 1', () => {
            store.handleInput('1');
            expect(store.displayValue === '1');
        });
    });

  })