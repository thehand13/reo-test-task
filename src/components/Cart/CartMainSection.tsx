import React from 'react';
import CartData from '../../models/cart-data';
import DealTypeIcon from '../icons/DealTypeIcon';
import classes from './CartMainSection.module.css';

const CartMainSection: React.FC<{
  cartInfo: {
    cartObjectState: CartData;
    beginDateState: string;
    endDateState: string;
  };
}> = (props) => {
  return (
    <section className={classes['cart-section-main']}>
      <div>
        <DealTypeIcon />
        <div className={classes['cart-section-dealType']}>
          {props.cartInfo.cartObjectState.dealType}
        </div>
      </div>
      <div className={classes['cart-section-number']}>
        № {props.cartInfo.cartObjectState.number}
      </div>
      <div className={classes['cart-section-category']}>
        {props.cartInfo.cartObjectState.item.category}/
        {props.cartInfo.cartObjectState.item.group}
      </div>
      <div className={classes['cart-section-description']}>
        {props.cartInfo.cartObjectState.item.description}
      </div>
      <div>
        <div className={classes['cart-section-totalPrice']}>
          {props.cartInfo.cartObjectState.item.totalPrice} ₽
        </div>
        <div className={classes['cart-section-nds']}>Без НДС</div>
      </div>
      <div>
        <div className={classes['cart-section-location-icon']}>icon</div>
        <div className={classes['cart-section-location-info']}></div>
        {!props.cartInfo.cartObjectState.location
          ? 'не определено'
          : props.cartInfo.cartObjectState.location}
      </div>
    </section>
  );
};

export default CartMainSection;
