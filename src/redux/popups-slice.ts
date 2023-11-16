import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PopupsState {
  popUp: {
    type: "signin" | "register";
    isOpen: boolean;
  };
}

const initialState: PopupsState = {
  popUp: {
    type: "register",
    isOpen: false,
  },
};

export const PopupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    togglePopUp: (state) => {
      state.popUp.isOpen = !state.popUp.isOpen;
    },

    changeType: (state, action: PayloadAction<"signin" | "register">) => {
      state.popUp.type = action.payload;
    },
  },
});

export const { togglePopUp, changeType } = PopupsSlice.actions;

export const selectPopup = (state: RootState) => state.popups.popUp;

export default PopupsSlice.reducer;
