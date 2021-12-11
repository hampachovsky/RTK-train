import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { GradientCard } from '../components/GradientCard';
import { gradientSlice } from '../store/slices/GradientSlice';
import { setupStore } from '../store/store';

const { addItem } = gradientSlice.actions;

const store = setupStore();
const mockGradient = { id: 15, firstHex: '#555', secondHex: '#888' };

describe('Gradient card', () => {
  test('Card should be rendered with gradient', () => {
    render(
      <Provider store={store}>
        <GradientCard
          id={mockGradient.id}
          firstHex={mockGradient.firstHex}
          secondHex={mockGradient.secondHex}
        />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByText(/#555/i)).toBeInTheDocument();
    expect(screen.getByText(/#888/i)).toBeInTheDocument();
    expect(screen.getByTestId('gradient-card')).toHaveStyle(
      `background: linear-gradient(to right, ${mockGradient.firstHex}, ${mockGradient.secondHex}`,
    );
  });
  test('Delete card', async () => {
    store.dispatch(addItem(mockGradient));
    let state = store.getState().gradientReducer;
    const initialGradientCount = state.gradients.length;
    render(
      <Provider store={store}>
        <GradientCard
          id={mockGradient.id}
          firstHex={mockGradient.firstHex}
          secondHex={mockGradient.secondHex}
        />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByText(/#555/i)).toBeInTheDocument();
    expect(screen.getByText(/#888/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('delete-button'));
    state = store.getState().gradientReducer;
    expect(state.gradients.length).toBeLessThan(initialGradientCount);
  });
  test('Gradient card list should be rendered', async () => {
    store.dispatch(addItem({ id: 15, firstHex: '#555', secondHex: '#888' }));
    store.dispatch(addItem({ id: 20, firstHex: '#75F', secondHex: '#A88' }));
    store.dispatch(addItem({ id: 25, firstHex: '#AAA', secondHex: '#FFF' }));
    const gradients = store.getState().gradientReducer.gradients;
    const initialGradientCount = gradients.length;
    render(
      <Provider store={store}>
        {gradients.map((it) => {
          return (
            <GradientCard key={it.id} id={it.id} firstHex={it.firstHex} secondHex={it.secondHex} />
          );
        })}
      </Provider>,
      { wrapper: MemoryRouter },
    );
    expect(await screen.findAllByTestId('gradient-card')).toHaveLength(initialGradientCount);
  });
});
