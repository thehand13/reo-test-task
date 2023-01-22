import React, { useState, useEffect } from 'react';
import CartData from '../../models/cart-data';
import classes from './Cart.module.css';

import CartMainSection from './CartMainSection';
import CartAdditionalSection from './CartAdditionalSection';

const initialCartState: CartData = {
  id: '',
  dealType: '',
  beginDate: '',
  endDate: '',
  number: '',
  vatIncluded: false,
  participants: {
    count: 0,
  },
  item: {
    id: '',
    totalPrice: 0,
    price: 0,
    measurementUnit: '',
    category: '',
    group: '',
    mark: null,
    quantity: 0,
    description: '',
  },
  location: null,
  distance: 0,
};

const Cart = () => {
  const [componentState, setCartInfoState] = useState({
    cartObjectState: initialCartState,
    beginDateState: '',
    endDateState: '',
  });
  useEffect(() => {
    try {
      (async () => {
        const fetchData = await fetch(
          'https://reo-tesk-task-default-rtdb.europe-west1.firebasedatabase.app/lots/best.json'
        );
        if (fetchData.ok) {
          const responseData = await fetchData.json();
          const newCartInfoState: CartData = structuredClone(responseData);
          const newBeginDateState: string = new Intl.DateTimeFormat('ru', {
            dateStyle: 'long',
          }).format(new Date(newCartInfoState.beginDate));
          const newEndDateState: string = new Intl.DateTimeFormat('ru', {
            dateStyle: 'long',
          }).format(new Date(newCartInfoState.endDate));
          setCartInfoState({
            cartObjectState: newCartInfoState,
            beginDateState: newBeginDateState,
            endDateState: newEndDateState,
          });
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={classes.cart}>
      <CartMainSection cartInfo={componentState} />
      <CartAdditionalSection cartInfo={componentState} />
    </div>
  );
};

export default Cart;
