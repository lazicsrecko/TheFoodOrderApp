import { useRef, useContext } from 'react';
import Input from '../UI/Input';
import classes from './CustomerForm.module.css';
import CartContext from '../../store/cart-context';

const CustomerForm = (props) => {
    const { customerDetailsHandler } = props;
    const customerName = useRef();
    const customerAddress = useRef();
    const customerPhone = useRef();

    const cartContext = useContext(CartContext);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(customerName.current.value)
        const customer = {
            customerName: customerName.current.value,
            customerAddress: customerAddress.current.value,
            customerPhone: customerPhone.current.value
        }
        cartContext.addCustomer(customer);
        customerDetailsHandler(true);
    }


    return (
        <form className={classes.customerForm} onSubmit={onSubmit}>
            <div className={classes["control-group"]}>
                <div className={classes['form-control']}>
                    <Input
                        label="Name"
                        ref={customerName}
                        input={{
                            id: "name",
                            type: "text",
                            placeholder: "Enter Your Name"
                        }}
                    />
                </div>
                <div className={classes['form-control']}>
                    <Input
                        label="Address"
                        ref={customerAddress}
                        input={{
                            id: "address",
                            type: "text",
                            placeholder: "Enter Your Addres"
                        }}
                    />
                </div>
                <div className={classes['form-control']}>
                    <Input
                        label="Phone Number"
                        ref={customerPhone}
                        input={{
                            id: "phone",
                            type: "tel",
                            placeholder: "066/555-678",
                            pattern: "[0-9]{3}/[0-9]{3}-[0-9]{3}"
                        }}
                    />
                </div>
                <div className={classes['form-control']}>
                    <button className={classes.customerBtn}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default CustomerForm;