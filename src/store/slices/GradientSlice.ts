import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGradient } from '../../models/IGradient';
import { RootState } from './../store';

interface GradientState {
  gradients: IGradient[];
}

const initialState: GradientState = {
  gradients: [
    {
      id: 1,
      firstHex: '#a85caa',
      secondHex: '#8cb8e9',
    },
    {
      id: 2,
      firstHex: '#176cc7',
      secondHex: '#ffaf5f',
    },
    {
      id: 3,
      firstHex: '#111',
      secondHex: '#333',
    },
  ],
};

export const gradientSlice = createSlice({
  name: 'gradient',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IGradient>) {
      state.gradients.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.gradients = state.gradients.filter((it) => it.id !== action.payload);
    },
    editItem(state, action: PayloadAction<IGradient>) {
      const itemIndex = state.gradients.findIndex((it) => it.id === action.payload.id);
      state.gradients[itemIndex].firstHex = action.payload.firstHex;
      state.gradients[itemIndex].secondHex = action.payload.secondHex;
    },
  },
});

export const selectGradient = (state: RootState, id: number) => {
  const itemIndex = state.gradientReducer.gradients.findIndex((it) => it.id === id);
  return state.gradientReducer.gradients[itemIndex];
};

export default gradientSlice.reducer;
