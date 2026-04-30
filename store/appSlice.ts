import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  vehiclePayload: null,
  images: null,
  navOpen: false,
  ref: null,
  isLoggedIn: false,
  pushToken: null,

  address: null,
  longitude: null,
  latitude: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const value = action.payload;
      state.user = value;
    },
    setPushToken: (state, action) => {
      const value = action.payload;
      state.pushToken = value;
    },
    setCordinates: (state, action) => {
      const address = action.payload.address;
      const longitude = action.payload.longitude;
      const latitude = action.payload.latitude;

      state.address = address;
      state.longitude = longitude;
      state.latitude = latitude;
    },
    setVehiclePayload: (state, action) => {
      const value = action.payload;
      state.vehiclePayload = value;
    },
    setImages: (state, action) => {
      const value = action.payload;
      state.images = value;
    },
    setLoggedIn: (state, action) => {
      const value = action.payload;
      state.isLoggedIn = value;
    },
    setRef: (state, action) => {
      const value = action.payload;
      state.ref = value;
    },
    setNavOpen: (state, action) => {
      const value = action.payload;
      state.navOpen = value;
    },
  },
});
