import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    customerName: '',
    customerAddress: '',
    customerPhone: null,
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    if (action.type === 'DELETE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'ADD_CUSTOMER') {
        const { customerName, customerAddress, customerPhone } = action.customer;
        return {
            ...state,
            customerName,
            customerAddress,
            customerPhone
        }
    }
    if (action.type === 'RESET') {
        return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'DELETE', id: id });
    };

    const addNewCustomerHandler = customer => {
        dispatchCartAction({ type: 'ADD_CUSTOMER', customer: customer });
    };

    const resetCartState = () => {
        dispatchCartAction({ type: 'RESET' });
    }

    const cartContext = {
        customerName: cartState.customerName,
        customerAddress: cartState.customerAddress,
        customerPhone: cartState.customerPhone,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        itemsInCart: cartState.itemsInCart,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        addCustomer: addNewCustomerHandler,
        resetCart: resetCartState
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;