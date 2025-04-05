// src/redux/deviceSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface DeviceState {
  watchConnected: boolean;
  mobileAppActive: boolean;
}

const initialState: DeviceState = {
  watchConnected: true,
  mobileAppActive: true,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    toggleWatchConnection(state) {
      state.watchConnected = !state.watchConnected;
    },
    toggleMobileAppStatus(state) {
      state.mobileAppActive = !state.mobileAppActive;
    },
  },
});

export const { toggleWatchConnection, toggleMobileAppStatus } = deviceSlice.actions;
export default deviceSlice.reducer;