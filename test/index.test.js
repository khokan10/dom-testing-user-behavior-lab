/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
  initializeDOMInteractions
} = require('../index.js');

describe('DOM Testing and User Behavior', () => {
  // Reset the DOM before each test
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  test('addElementToDOM updates DOM content', () => {
    addElementToDOM('dynamic-content', '<p>Hello World</p>');
    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('<p>Hello World</p>');
  });

  test('removeElementFromDOM removes an element', () => {
    removeElementFromDOM('dynamic-content');
    const container = document.getElementById('dynamic-content');
    expect(container).toBeNull();
  });

  test('simulateClick updates the DOM correctly', () => {
    simulateClick('dynamic-content', 'Button Clicked!');
    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('Button Clicked!');
  });

  test('handleFormSubmit updates the DOM with valid input', () => {
    const input = document.getElementById('user-input');
    input.value = 'New Task Item';

    handleFormSubmit('user-form', 'dynamic-content');

    const container = document.getElementById('dynamic-content');
    const errorMessage = document.getElementById('error-message');

    expect(container.innerHTML).toBe('New Task Item');
    expect(errorMessage.textContent).toBe('');
    expect(errorMessage.classList.contains('hidden')).toBe(true);
  });

  test('handleFormSubmit shows an error for empty input', () => {
    const input = document.getElementById('user-input');
    input.value = '   ';

    handleFormSubmit('user-form', 'dynamic-content');

    const errorMessage = document.getElementById('error-message');
    expect(errorMessage.textContent).toBe('Input cannot be empty');
    expect(errorMessage.classList.contains('hidden')).toBe(false);
  });

  test('button click updates DOM via initializeDOMInteractions', () => {
    initializeDOMInteractions();
    const button = document.getElementById('simulate-click');
    button.click();

    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('Button Clicked!');
  });

  test('form submit updates DOM via initializeDOMInteractions', () => {
    initializeDOMInteractions();
    const input = document.getElementById('user-input');
    const form = document.getElementById('user-form');

    input.value = 'Submitting form';
    form.dispatchEvent(new Event('submit'));

    const container = document.getElementById('dynamic-content');
    expect(container.innerHTML).toBe('Submitting form');
  });
});
