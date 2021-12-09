import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { GradientForm } from '../components/Form/GradientForm';
import { setupStore } from '../store/store';

const store = setupStore();
const mockFn = jest.fn();

describe('Gradient form', () => {
  test('Form should be rendered in not edit mode', () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} isEditMode={false} />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByText(/first hex value/i)).toBeInTheDocument();
    expect(screen.getByText(/second hex value/i)).toBeInTheDocument();
    expect(screen.getByText(/add new gradient/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
  test('Form should be rendered in  edit mode', () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} isEditMode={true} />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    expect(screen.getByText(/first hex value/i)).toBeInTheDocument();
    expect(screen.getByText(/second hex value/i)).toBeInTheDocument();
    expect(screen.getByText(/edit gradient/i)).toBeInTheDocument();
  });

  test('Callback function should be called', async () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} isEditMode={true} />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    fireEvent.change(screen.getByTestId('first-hex-input'), { target: { value: '#333' } });
    fireEvent.change(screen.getByTestId('second-hex-input'), { target: { value: '#111' } });

    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
      expect(mockFn).toBeCalled();
    });
  });
  test('Callback function should be called wit correct argument', async () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} isEditMode={true} />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    fireEvent.change(screen.getByTestId('first-hex-input'), { target: { value: '#333' } });
    fireEvent.change(screen.getByTestId('second-hex-input'), { target: { value: '#111' } });

    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
      expect(mockFn).toHaveBeenCalledWith('#333', '#111');
    });
  });
  test('Form should display error', async () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} isEditMode={true} />
      </Provider>,
      { wrapper: MemoryRouter },
    );
    fireEvent.change(screen.getByTestId('first-hex-input'), { target: { value: '#333q' } });
    fireEvent.change(screen.getByTestId('second-hex-input'), {
      target: { value: '#111zzzzzzwqrwqtrwqtwq' },
    });
    fireEvent.submit(screen.getByTestId('submit-button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
    expect(mockFn).not.toBeCalled();
  });
  test('Form should display props hex value as input value', () => {
    render(
      <Provider store={store}>
        <GradientForm submitAction={mockFn} firstHex='#111' secondHex='#333' isEditMode={true} />
      </Provider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByTestId('first-hex-input')).toHaveValue('#111');
    expect(screen.getByTestId('second-hex-input')).toHaveValue('#333');
  });
});
