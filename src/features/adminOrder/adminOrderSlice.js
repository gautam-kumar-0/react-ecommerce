import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const orderSlice = createSlice({
    name : "admin/order",
    initialState
})