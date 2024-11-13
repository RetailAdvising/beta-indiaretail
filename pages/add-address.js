import React, { useState, useEffect } from 'react'
import MobileHeader from '@/components/Headers/MobileHeader'
import styles from '../styles/checkout.module.scss';
import { get_customer_info } from '@/libs/api';
import AddressModal from '@/components/Bookstore/AddressModal';
import AddAddress from '@/components/Bookstore/AddAddress';

import Image from 'next/image'
import { useDispatch, useSelector, Provider } from 'react-redux'
// import customerInfoReducer from 'redux/reducers/customerInfoReducer'
import customerInfoAction from 'redux/actions/customerInfoAction'


export default function addAddress() {


  return (
    <>
      <div className="flex flex-col h-full">
        <header className="sticky bg-white top-0 z-99">
          <MobileHeader Heading={'Address'}></MobileHeader>
        </header>

        <main className="overflow-auto h-full">
          <AddAddress />
        </main>

      </div>
    </>
  )
}
