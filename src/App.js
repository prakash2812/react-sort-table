import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableComponent from './components/TableComponent';
import {
  fetchUserData,
  fetchTableHeaderData,
  sortedData,
  headerData,
} from './reduxRTK/reducer/tableSlice';
import './css/style.css';

export default function App() {
  const { tableHeader, userData, loading } = useSelector(
    (store) => store.tableData
  );
  const dispatch = useDispatch();

  /* find header object based on user selected/clicked column  */
  const selectedColumn = (headerSort, type) => {
    return headerSort.find((item) => type === item.name);
  };

  /* Ascending/decending of Number type Sort Data from  UserData */
  const numberTypeSortHandler = (userData, headerSort, type) => {
    let selecctedField = selectedColumn(headerSort, type);
    let typeSort = userData.slice().sort((a, b) => {
      if (selecctedField?.isSort) return a[type] - b[type];
      return b[type] - a[type];
    });
    dispatch(sortedData(typeSort));
  };

  /* Ascending/decending of Date type Sort Data from  UserData */
  const dateTypeSortHandler = (userData, headerSort, type) => {
    let selecctedField = selectedColumn(headerSort, type);
    let typeSort = userData.slice().sort((a, b) => {
      let fDate = new Date(a[type]);
      let lDate = new Date(b[type]);
      if (selecctedField?.isSort) return fDate - lDate;
      else return lDate - fDate;
    });
    dispatch(sortedData(typeSort));
  };

  /* Ascending/decending of String type Sort Data from  UserData */
  const stringTypeSortHandler = (userData, headerSort, type) => {
    let selecctedField = selectedColumn(headerSort, type);
    let typeSort = userData.slice().sort((a, b) => {
      let fName = a[type].toLowerCase();
      let LName = b[type].toLowerCase();
      if (selecctedField?.isSort)
        return fName == LName ? 0 : fName > LName ? 1 : -1;
      else return fName == LName ? 0 : fName > LName ? -1 : 1;
    });
    dispatch(sortedData(typeSort));
  };

  /* Dynamic mechanism based on user selected column sort */
  const sortedLists = (userData, headerSort, type = 'default') => {
    switch (type) {
      case 'id':
        numberTypeSortHandler(userData, headerSort, type);
        break;
      case 'firstName':
        stringTypeSortHandler(userData, headerSort, type);
        break;
      case 'lastName':
        stringTypeSortHandler(userData, headerSort, type);
        break;
      case 'company':
        stringTypeSortHandler(userData, headerSort, type);
        break;
      case 'jobTitle':
        stringTypeSortHandler(userData, headerSort, type);
        break;
      case 'state':
        stringTypeSortHandler(userData, headerSort, type);
        break;
      case 'dateJoined':
        dateTypeSortHandler(userData, headerSort, type);
        break;
    }
  };

  /* Fetch Data from backend/locally asynchronously */
  const fetchData = async () => {
    const tableHeader = await dispatch(fetchTableHeaderData());
    const dataLists = await dispatch(fetchUserData());
    const userList = dataLists?.payload?.map((list) => {
      return {
        ...list,
        dateJoined: new Date(list.dateJoined).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
    });
    sortedLists(userList, tableHeader.payload, 'firstName');
  };

  /* Based on selected field/column */
  const sortFieldHandler = (event) => {
    const { testid } = event.target.dataset;
    const tableHeaderSort = tableHeader?.map((item) => {
      if (item.name === testid) {
        return {
          ...item,
          isSort: !item.isSort,
        };
      }
      return { ...item, isSort: true };
    });
    dispatch(headerData(tableHeaderSort ?? []));
    sortedLists(userData, tableHeaderSort, testid);
  };

  /* Component did mount at only once for fetchData*/
  useEffect(() => {
    try {
      fetchData().catch((err) => {
        console.log('error', err);
      });
    } catch (error) {
      return error;
    }
  }, []);

  /* Rendering table component */
  return (
    <TableComponent
      loading={loading}
      sortFieldHandler={sortFieldHandler}
      tableHeader={tableHeader}
      userData={userData}
    />
  );
}
