import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../reducer/tableSlice.js';

/* Configure store with all multiple reducers */
const store = configureStore({
  reducer: { tableData: tableReducer },
});

export default store;
