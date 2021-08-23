import React, { useContext } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import { postOrder } from '../../services/meals-services';

const Cart = props => {
    const cartContext = useContext(CartContext);
    const { onHideCart, customerDetailsHandler } = props;
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id)
    };
    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 })
    };


    const orderHandler = async () => {
        await postOrder({
            customerName: cartContext.customerName,
            customerAddress: cartContext.customerAddress,
            customerPhone: cartContext.customerPhone,
            items: cartContext.items,
            totalAmount: cartContext.totalAmount.toFixed(2)
        });
        cartContext.resetCart();
        onHideCart();
        customerDetailsHandler(false);
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartContext.items.map(item => (
            <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
        ))}
    </ul>
    return (
        <Modal onHideCart={onHideCart}>
            <div>
                <div>
                    <h3>Customer: {cartContext.customerName}</h3>
                </div>
                <div>
                    <h3>Addres: {cartContext.customerAddress}</h3>
                </div>
                <div>
                    <h3>Phone: {cartContext.customerPhone}</h3>
                </div>
            </div>
            <hr />
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={onHideCart}>Close</button>
                <button className={classes.button} onClick={orderHandler}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;