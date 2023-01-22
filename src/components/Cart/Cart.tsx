import React, { useState, useEffect } from 'react';
import CartData from '../../models/cart-data';
import classes from './Cart.module.css';
import CalendarIcon from '../icons/CalendarIcon';
import DealTypeIcon from '../icons/DealTypeIcon';
import MeasurementUnitIcon from '../icons/MeasurementUnitIcon';
import PriceIcon from '../icons/PriceIcon';
import QuantityIcon from '../icons/QuantityIcon';

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
      <section className={classes['cart-section-main']}>
        <div>
          <DealTypeIcon />
          <div className={classes['cart-section-dealType']}>
            {componentState.cartObjectState.dealType}
          </div>
        </div>
        <div className={classes['cart-section-number']}>
          № {componentState.cartObjectState.number}
        </div>
        <div className={classes['cart-section-category']}>
          {componentState.cartObjectState.item.category}/
          {componentState.cartObjectState.item.group}
        </div>
        <div className={classes['cart-section-description']}>
          {componentState.cartObjectState.item.description}
        </div>
        <div>
          <div className={classes['cart-section-totalPrice']}>
            {componentState.cartObjectState.item.totalPrice} ₽
          </div>
          <div className={classes['cart-section-nds']}>Без НДС</div>
        </div>
        <div>
          <div className={classes['cart-section-location-icon']}>icon</div>
          <div className={classes['cart-section-location-info']}></div>
          {!componentState.cartObjectState.location
            ? 'не определено'
            : componentState.cartObjectState.location}
        </div>
      </section>

      <section className={classes['cart-section-additional']}>
        <section className={classes['cart-section-additional-one']}>
          <div>
            <div className={classes['cart-section-header']}>Количество</div>

            <div className={classes['cart-section-info']}>
              <QuantityIcon />
              {componentState.cartObjectState.item.quantity}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Еденицы измерения
            </div>
            <div className={classes['cart-section-info']}>
              <MeasurementUnitIcon />
              {componentState.cartObjectState.item.measurementUnit}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Стоимость за единицу измерения
            </div>
            <div className={classes['cart-section-info']}>
              <PriceIcon />
              {componentState.cartObjectState.item.price} ₽
            </div>
          </div>
        </section>

        <section className={classes['cart-section-additional-two']}>
          <div>
            <div className={classes['cart-section-header']}>
              Начало сбора предложений
            </div>
            <div className={classes['cart-section-info']}>
              <CalendarIcon />
              {componentState.beginDateState}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Окончание сбора предложений
            </div>
            <div className={classes['cart-section-info']}>
              <CalendarIcon />
              {componentState.endDateState}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>Участников</div>
            <div className={classes['cart-section-info']}>
              {componentState.cartObjectState.participants.count}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Cart;
