import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface PopupsState {
  popUp: {
    type: 'signin' | 'register';
    isOpen: boolean;
  };
}

const initialState: PopupsState = {
  popUp: {
    type: 'register',
    isOpen: false
  }
};

export const PopupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<'signin' | 'register'>) => {
      state.popUp.isOpen = true;
      state.popUp.type = action.payload;
    },

    closePopup: (state) => {
      state.popUp.isOpen = false;
    }
  }
});

export const { openPopup, closePopup } = PopupsSlice.actions;

export const selectPopup = (state: RootState) => state.popups.popUp;

export default PopupsSlice.reducer;
