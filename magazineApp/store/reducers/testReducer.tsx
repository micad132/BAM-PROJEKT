import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../index';

interface TestData {
    name: string,
    weight: number,
    hair_color: string,
}

interface TestState {
    data: TestData,
    isLoaded: boolean,
    error: string | null,
}

const initialState: TestState = {
  data: {
    name: '',
    weight: 0,
    hair_color: '',
  },
  isLoaded: false,
  error: null,
};

// eslint-disable-next-line import/prefer-default-export
export const fetchingTestThunk = createAsyncThunk(
  'test',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const data = await axios.get('https://swapi.dev/api/people/1/');
      return data.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getIsLoaded = (state: RootState): boolean => state.isLoaded;
export const getTestData = (state: RootState): TestData => state.data;

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchingTestThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    });
  },
});

export default testSlice.reducer;
