import React from 'react';
import Loader from './Loader.jsx';
import { v4 as uId } from 'uuid';
import adminSvg from '../assests/admin.svg';

const TableComponent = ({ loading, sortFieldHandler, tableHeader, userData }) => {
  return (
    <section>
      <div className="table-headings" >
        {tableHeader?.map(({ name, isSort, arrowUp, arrowDown }) => {
          return (
            <div
              key={uId()}
              data-testid={name}
              onClick={sortFieldHandler}
            >
              <p data-testid={name}>{name.toUpperCase()}</p>
              <p data-testid={name} className="arrow">
                {isSort
                  ? String.fromCodePoint(parseInt(arrowUp, 16))
                  : String.fromCodePoint(parseInt(arrowDown, 16))}
              </p>
            </div>
          );
        })}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="table-data">
          {userData?.map((user) => {
            return (
              <div key={uId()} className="table-dataList">
                <div>{user.id}</div>
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.company}</div>
                <div>{user.jobTitle}</div>
                <div>{user.state}</div>
                <div>{user.isSiteAdmin ? <img src={adminSvg} alt='admin logo'/> : 'No'}</div>
                <div>{user.dateJoined}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TableComponent;
