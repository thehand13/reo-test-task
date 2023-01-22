import React from 'react';
import CartData from '../../models/cart-data';
import CalendarIcon from '../icons/CalendarIcon';
import MeasurementUnitIcon from '../icons/MeasurementUnitIcon';
import PriceIcon from '../icons/PriceIcon';
import QuantityIcon from '../icons/QuantityIcon';
import classes from './CartAdditionalSection.module.css';

const CartAdditionalSection: React.FC<{
  cartInfo: {
    cartObjectState: CartData;
    beginDateState: string;
    endDateState: string;
  };
}> = (props) => {
  return (
    <section className={classes['cart-section-additional']}>
      <section className={classes['cart-section-additional-one']}>
        <div>
          <div className={classes['cart-section-header']}>Количество</div>

          <div className={classes['cart-section-info']}>
            <QuantityIcon />
            {props.cartInfo.cartObjectState.item.quantity}
          </div>
        </div>
        <div>
          <div className={classes['cart-section-header']}>
            Еденицы измерения
          </div>
          <div className={classes['cart-section-info']}>
            <MeasurementUnitIcon />
            {props.cartInfo.cartObjectState.item.measurementUnit}
          </div>
        </div>
        <div>
          <div className={classes['cart-section-header']}>
            Стоимость за единицу измерения
          </div>
          <div className={classes['cart-section-info']}>
            <PriceIcon />
            {props.cartInfo.cartObjectState.item.price} ₽
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
            {props.cartInfo.beginDateState}
          </div>
        </div>
        <div>
          <div className={classes['cart-section-header']}>
            Окончание сбора предложений
          </div>
          <div className={classes['cart-section-info']}>
            <CalendarIcon />
            {props.cartInfo.endDateState}
          </div>
        </div>
        <div>
          <div className={classes['cart-section-header']}>Участников</div>
          <div className={classes['cart-section-info']}>
            {props.cartInfo.cartObjectState.participants.count}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CartAdditionalSection;
