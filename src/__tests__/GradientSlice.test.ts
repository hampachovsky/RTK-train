import { gradientSlice, selectGradient } from '../store/slices/GradientSlice';
import { setupStore } from '../store/store';

const { addItem, editItem, deleteItem } = gradientSlice.actions;

const store = setupStore();

describe('Gradient reducer', () => {
  test('adds a new gradient', () => {
    let state = store.getState().gradientReducer;
    const initialGradientCount = state.gradients.length;
    store.dispatch(addItem({ id: 5, firstHex: '#555', secondHex: '#888' }));
    state = store.getState().gradientReducer;
    const newGradient = state.gradients.find((it) => it.id === 5);
    expect(newGradient?.firstHex).toBe('#555');
    expect(newGradient?.secondHex).toBe('#888');
    expect(state.gradients.length).toBeGreaterThan(initialGradientCount);
  });
  test('edit a gradient', () => {
    let state = store.getState().gradientReducer;
    const initialGradientCount = state.gradients.length;
    store.dispatch(editItem({ id: 5, firstHex: '#999', secondHex: '#AAA' }));
    state = store.getState().gradientReducer;
    const newGradient = state.gradients.find((it) => it.id === 5);
    expect(newGradient?.firstHex).toBe('#999');
    expect(newGradient?.secondHex).toBe('#AAA');
    expect(state.gradients.length).toBeGreaterThanOrEqual(initialGradientCount);
  });
  test('delete a gradient', () => {
    let state = store.getState().gradientReducer;
    const initialGradientCount = state.gradients.length;
    store.dispatch(deleteItem(5));
    state = store.getState().gradientReducer;
    expect(state.gradients.length).toBeLessThan(initialGradientCount);
  });
});

describe('Gradient selectors', () => {
  it('should return a graient', () => {
    store.dispatch(addItem({ id: 5, firstHex: '#555', secondHex: '#888' }));
    const gradient = selectGradient(store.getState(), 5);
    expect(gradient?.id).toBe(5);
    expect(gradient?.firstHex).toBe('#555');
    expect(gradient?.secondHex).toBe('#888');
  });
});
