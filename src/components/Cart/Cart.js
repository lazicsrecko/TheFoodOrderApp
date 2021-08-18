import classes from './Cart.module.css';
import Modal from '../UI/Modal';

const Cart = props => {
    const { onHideCart } = props;
    const cartItems = <ul className={classes['cart-item']}>
        {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map(item => <li>{item.name}</li>)}
    </ul>
    return (
        <Modal onHideCart={onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['buttib--alt']} onClick={onHideCart}>Close</button>
                <button classname={classes.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;