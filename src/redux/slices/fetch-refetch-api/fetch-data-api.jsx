// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

 const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('https://astroeditorbackend.vercel.app/register/lastwodays');
  return response.data;
});

 const refetchData = createAsyncThunk('data/refetchData', async (_, { dispatch, getState }) => {
  // Access the current state to perform any conditional logic if needed
  const currentState = getState();
  console.log('Refetching data...');

  // Trigger the fetchData action to refetch the data
  await dispatch(fetchData());
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
export { fetchData, refetchData };
