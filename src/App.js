import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CustomerForm from './components/Form/CustomerForm';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Banner from './components/UI/Banner';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  const customerDetailsHandler = (customerConfirmed) => {
    setCustomerDetails(customerConfirmed);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart customerDetailsHandler={customerDetailsHandler} onHideCart={hideCartHandler} />}
      <Header customerDetails={customerDetails} onShowCart={showCartHandler} />
      <main>
        <Banner customerDetails={customerDetails} />
        {!customerDetails && <CustomerForm customerDetailsHandler={customerDetailsHandler} />}
        {customerDetails && <Meals />}
      </main>
    </CartProvider>
  );
}

export default App;
