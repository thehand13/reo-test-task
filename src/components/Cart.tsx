import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import CartData from '../models/cart-data';
import classes from './Cart.module.css';
import CalendarIcon from './icons/CalendarIcon';
import DealTypeIcon from './icons/DealTypeIcon';
import MeasurementUnitIcon from './icons/MeasurementUnitIcon';
import PriceIcon from './icons/PriceIcon';
import QuantityIcon from './icons/QuantityIcon';

const initialCartState: CartData = {
  id: '',
  dealType: '',
  beginDate: new Date(),
  endDate: new Date(),
  number: '',
  vatIncluded: false,
  participants: {
    count: 0,
  },
  item: {
    id: '',
    totalPrice: 340000,
    price: 10000,
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
  const [cartInfoState, setCartInfoState] = useState(initialCartState);
  const [beginDateState, setBeginDateState] = useState('');
  const [endDateState, setEndDateState] = useState('');

  useEffect(() => {
    (async () => {
      const fetchData = await fetch(
        'https://reo-tesk-task-default-rtdb.europe-west1.firebasedatabase.app/lots/best.json'
      );
      if (fetchData.ok) {
        const responseData = await fetchData.json();
        const newCartInfoState: CartData = {
          id: responseData.id,
          dealType: responseData.dealType,
          beginDate: new Date(responseData.beginDate),
          endDate: new Date(responseData.endDate),
          number: responseData.number,
          vatIncluded: responseData.vatIncluded,
          participants: {
            count: responseData.participants.count,
          },
          item: {
            id: responseData.item.id,
            totalPrice: responseData.item.totalPrice,
            price: responseData.item.price,
            measurementUnit: responseData.item.measurementUnit,
            category: responseData.item.category,
            group: responseData.item.group,
            mark: responseData.item.mark,
            quantity: responseData.item.quantity,
            description: responseData.item.description,
          },
          location: responseData.location,
          distance: responseData.distance,
        };
        dayjs().locale('ru');
        setCartInfoState(() => newCartInfoState);
        setBeginDateState(
          new Intl.DateTimeFormat('ru', {
            dateStyle: 'long',
          }).format(newCartInfoState.beginDate)
        );
        setEndDateState(
          new Intl.DateTimeFormat('ru', {
            dateStyle: 'long',
          }).format(newCartInfoState.endDate)
        );
      }
    })();
  }, []);
  return (
    <div className={classes.cart}>
      <section className={classes['cart-section-main']}>
        <div>
          <DealTypeIcon />
          <div className={classes['cart-section-dealType']}>
            {cartInfoState.dealType}
          </div>
        </div>
        <div className={classes['cart-section-number']}>
          № {cartInfoState.number}
        </div>
        <div className={classes['cart-section-category']}>
          {cartInfoState.item.category}/{cartInfoState.item.group}
        </div>
        <div className={classes['cart-section-description']}>
          {cartInfoState.item.description}
        </div>
        <div>
          <div className={classes['cart-section-totalPrice']}>
            {cartInfoState.item.totalPrice} ₽
          </div>
          <div className={classes['cart-section-nds']}>Без НДС</div>
        </div>
        <div>
          <div className={classes['cart-section-location-icon']}>icon</div>
          <div className={classes['cart-section-location-info']}></div>
          {!cartInfoState.location ? 'не определено' : cartInfoState.location}
        </div>
      </section>

      <section className={classes['cart-section-additional']}>
        <section className={classes['cart-section-additional-one']}>
          <div>
            <div className={classes['cart-section-header']}>Количество</div>

            <div className={classes['cart-section-info']}>
              <QuantityIcon />
              {cartInfoState.item.quantity}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Еденицы измерения
            </div>
            <div className={classes['cart-section-info']}>
              <MeasurementUnitIcon />
              {cartInfoState.item.measurementUnit}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Стоимость за единицу измерения
            </div>
            <div className={classes['cart-section-info']}>
              <PriceIcon />
              {cartInfoState.item.price} ₽
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
              {beginDateState}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>
              Окончание сбора предложений
            </div>
            <div className={classes['cart-section-info']}>
              <CalendarIcon />
              {endDateState}
            </div>
          </div>
          <div>
            <div className={classes['cart-section-header']}>Участников</div>
            <div className={classes['cart-section-info']}>
              {cartInfoState.participants.count}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Cart;
