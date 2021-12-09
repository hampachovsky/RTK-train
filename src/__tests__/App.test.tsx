import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { gradientSlice } from '../store/slices/GradientSlice';
import { store } from '../store/store';

const { addItem } = gradientSlice.actions;

afterEach(cleanup);

const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('App routing', () => {
  test('Home page should be rendered after routing', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    userEvent.click(screen.getByText(/home/i));
    await waitFor(() => expect(screen.getByTestId('home-page')).toBeInTheDocument());
  });
  test('Add new page should be rendered after routing', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    userEvent.click(screen.getByText(/add new gradient/i));
    await waitFor(() => expect(screen.getByTestId('new-page')).toBeInTheDocument());
  });
  test('Edit page should be rendered after routing', async () => {
    const id = Date.now();
    store.dispatch(addItem({ id, firstHex: '#555', secondHex: '#888' }));
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: `/edit/${id}` },
    );
    await waitFor(() => expect(screen.getByTestId('edit-page')).toBeInTheDocument());
  });
  test('Redirect after editing gradient', async () => {
    store.dispatch(addItem({ id: 15, firstHex: '#555', secondHex: '#888' }));
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: `/edit/${15}` },
    );

    fireEvent.change(screen.getByTestId('first-hex-input'), { target: { value: '#333' } });
    fireEvent.change(screen.getByTestId('second-hex-input'), { target: { value: '#111' } });

    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => expect(screen.getByTestId('home-page')).toBeInTheDocument());
  });
  test('Redirect after creating gradient', async () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: `/new` },
    );

    fireEvent.change(screen.getByTestId('first-hex-input'), { target: { value: '#333' } });
    fireEvent.change(screen.getByTestId('second-hex-input'), { target: { value: '#111' } });

    fireEvent.submit(screen.getByTestId('submit-button'));

    await waitFor(() => expect(screen.getByTestId('home-page')).toBeInTheDocument());
  });
});
