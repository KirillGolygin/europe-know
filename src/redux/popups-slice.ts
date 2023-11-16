import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PopupsState {
  popUp: {
    type: "signin" | "login";
    isOpen: boolean;
  };
}

const initialState: PopupsState = {
  popUp: {
    type: "signin",
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

    changeType: (state, action: PayloadAction<"signin" | "login">) => {
      state.popUp.type = action.payload;
    },
  },
});

export const { togglePopUp, changeType } = PopupsSlice.actions;

export const selectPopup = (state: RootState) => state.popups.popUp;

export default PopupsSlice.reducer;
