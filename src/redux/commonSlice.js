import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import intouncommonApi from '../apis/intouncommonApi';


export const fetchCommon = createAsyncThunk(
  "common/fetchCommon",
  async () => {
    try {
      const response = await intouncommonApi.get("/getproducts",{
        headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.body);
    }
  }
);

const initialState = {
  common: [],
  loading: "idle" //"idle" | "pending" | "succeeded" | "failed"
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommon.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCommon.fulfilled, (state, action) => {
      state.common = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchCommon.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export default commonSlice.reducer;