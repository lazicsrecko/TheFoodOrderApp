import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnBumpToggler, setBtnBumpToggler] = useState(false);
    const cartContext = useContext(CartContext);
    const { items } = cartContext;

    const itemsInCart = items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnBumpToggler ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnBumpToggler(true);

        const timer = setTimeout(() => {
            setBtnBumpToggler(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {itemsInCart}
        </span>
    </button>
}

export default HeaderCartButton;