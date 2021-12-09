import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { gradientSlice } from '../store/slices/GradientSlice';
import { setupStore } from '../store/store';

const { addItem } = gradientSlice.actions;

const store = setupStore();

describe('Home page', () => {
  test('Home page should be rendered', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
  test('Home page render gradiend card', () => {
    store.dispatch(addItem({ id: 15, firstHex: '#555', secondHex: '#888' }));
    store.dispatch(addItem({ id: 20, firstHex: '#75F', secondHex: '#A88' }));
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('#555')).toBeInTheDocument();
    expect(screen.getByText('#75F')).toBeInTheDocument();
    expect(screen.getByText('#888')).toBeInTheDocument();
    expect(screen.getByText('#A88')).toBeInTheDocument();
  });
});
