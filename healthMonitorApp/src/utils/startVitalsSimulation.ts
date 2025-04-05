// src/utils/startVitalsSimulation.ts
import store from "../redux/store";
import { addVitalsData } from "../redux/vitalsSlice";

//let intervalId: NodeJS.Timeout | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
export const startVitalsSimulation = () => {
  if (intervalId) return; // already running

  intervalId = setInterval(() => {
    const { device } = store.getState();
    const { watchConnected, mobileAppActive } = device;

    if (watchConnected && mobileAppActive) {
      const now = new Date();
      const newPoint = {
        time: now.toLocaleTimeString().slice(0, 5),
        heartRate: 65 + Math.floor(Math.random() * 20),
        spo2: 97 + Math.floor(Math.random() * 3),
      };
      store.dispatch(addVitalsData(newPoint));
    }
  }, 3000);
};

export const stopVitalsSimulation = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
};