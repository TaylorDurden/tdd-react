import React from 'react';
import Counter from '../index';
import { render, fireEvent, Matcher, MatcherOptions } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

let getByTestId: (text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement;
let headerElement: HTMLElement;
let counterElement: HTMLElement;
let inputNumberElement: HTMLElement;
let subtractBtnElement: HTMLElement;
let addBtnElement: HTMLElement;

beforeAll(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
  headerElement = getByTestId('header');
  counterElement = getByTestId('counter');
  addBtnElement = getByTestId('add-btn');
  subtractBtnElement = getByTestId('subtract-btn');
  inputNumberElement = getByTestId('input-number');
});



test('Header renders with correct text', () => {
  expect(headerElement.textContent).toBe('My Counter');
});

test('counter initally start with text of 0', () => {
  expect(counterElement.textContent).toBe('0')
});

test('input contains initial value of 1', () => {
  expect(inputNumberElement.value).toBe('1');
});

test('add button renders with +', () => {
  const addBtn = getByTestId('add-btn');

  expect(addBtn.textContent).toBe('+');
});

test('subtract button renders with -', () => {
  expect(subtractBtnElement.textContent).toBe('-');
});

test('change value of input works correctly', () => {
  expect(inputNumberElement.value).toBe('1');
  fireEvent.change(inputNumberElement, {
    target: {
      value: '5'
    }
  });
  expect(inputNumberElement.value).toBe('5');
});

test('click on add button plus 1 to counter', () => {
  expect(counterElement.textContent).toBe('0');
  fireEvent.click(addBtnElement);
  expect(counterElement.textContent).toBe('1');
});

test('click on subtract button minus 1 to counter', () => {
  expect(counterElement.textContent).toBe('0');
  fireEvent.click(subtractBtnElement);
  expect(counterElement.textContent).toBe('-1');
});

test('adding and then subtracting leads to the correct counter number', () => {
  fireEvent.change(inputNumberElement, {
    target: {
      value: 10
    }
  });

  fireEvent.click(addBtnElement);
  fireEvent.click(addBtnElement);
  fireEvent.click(addBtnElement);
  fireEvent.click(addBtnElement);
  fireEvent.click(subtractBtnElement);
  fireEvent.click(subtractBtnElement);

  expect(counterElement.textContent).toBe('20');

  fireEvent.change(inputNumberElement, {
    target: {
      value: 5
    }
  });
  fireEvent.click(addBtnElement);
  fireEvent.click(subtractBtnElement);
  fireEvent.click(subtractBtnElement);
  expect(counterElement.textContent).toBe('15');
});


test('counter contains correct className', () => {
  expect(counterElement.className).toBe('');
  fireEvent.change(inputNumberElement, {
    target: {
      value: 50
    }
  });
  fireEvent.click(addBtnElement);
  expect(counterElement.className).toBe('');
  fireEvent.click(addBtnElement);
  expect(counterElement.className).toBe('green');
  fireEvent.click(addBtnElement);
  expect(counterElement.className).toBe('green');

  fireEvent.change(inputNumberElement, {
    target: {
      value: 150
    }
  });
  fireEvent.click(subtractBtnElement);
  expect(counterElement.className).toBe('');
  fireEvent.click(subtractBtnElement);
  expect(counterElement.className).toBe('red');
});