import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* Setup initial state which are READ ONLY */
const initialState = {
  userData: [],
  tableHeader: [],
  loading: true,
  error: '',
};

/* Doing Async call to fetch user table data */
export const fetchUserData = createAsyncThunk(
  'tableSlice/fetchUserData',
  async () => {
    const { default: dataLists } = await import('../../data/userData.json');
    return dataLists;
  }
);

/* Doing Async call to fetch user table header data */
export const fetchTableHeaderData = createAsyncThunk(
  'tableSlice/fetchTableHeaderData',
  async () => {
    const { default: tableHeader } = await import(
      '../../data/tableHeader.json'
    );
    return tableHeader;
  }
);

/* create slice of Pure reducer function + initial state */
const tableSlice = createSlice({
  name: 'tableSlice',
  initialState,
  reducers: {
    sortedData(state, actions) {
      state.userData = actions.payload;
      state.loading = false;
    },
    headerData(state, actions) {
      state.tableHeader = actions.payload;
    },
  },
  extraReducers: {
    [fetchTableHeaderData.fulfilled]: (state, actions) => {
      state.tableHeader = actions.payload;
    },
    [fetchTableHeaderData.rejected]: (state, actions) => {
      state.tableHeader = [];
      state.error = actions.payload;
    },
    [fetchUserData.rejected]: (state, actions) => {
      state.userData = [];
      stae.loading = false;
      state.error = actions.payload;
    },
  },
});

export const { sortedData, headerData } = tableSlice.actions;
export default tableSlice.reducer;
