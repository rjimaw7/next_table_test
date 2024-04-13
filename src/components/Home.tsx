/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React, { Fragment } from 'react';

import Header from './Header';
import OrdersTable from './OrdersTable';

const Home = () => {
  return (
    <Fragment>
      <Header />
      <OrdersTable />
    </Fragment>
  );
};

export default Home;
