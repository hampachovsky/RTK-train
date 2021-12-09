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
  test('Delete card', () => {
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
});
