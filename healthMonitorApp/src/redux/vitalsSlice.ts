// src/redux/vitalsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface DataPoint {
  time: string;
  heartRate: number;
  spo2: number;
}

interface VitalsState {
  data: DataPoint[];
}

const initialState: VitalsState = {
  data: [],
};

const vitalsSlice = createSlice({
  name: "vitals",
  initialState,
  reducers: {
    addVitalsData(state, action) {
      state.data.push(action.payload);
      if (state.data.length > 10) state.data.shift(); // keep last 10
    },
  },
});

export const { addVitalsData } = vitalsSlice.actions;
export default vitalsSlice.reducer;