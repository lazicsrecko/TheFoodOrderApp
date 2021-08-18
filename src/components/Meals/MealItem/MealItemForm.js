import React, { useContext } from 'react';
import classes from './MealItemForm.module.css';
import CartContext from '../../../store/cart-context';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const { meal } = props;
    const cartContext = useContext(CartContext);

    const onAddMeal = (e) => {
        e.preventDefault();
        cartContext.addItem(meal);
        console.log(cartContext);
    } 

    return (
        <form className={classes.form}>
            <Input label="Amount" input={{
                id: "amount_" + meal.id,
                type: "number",
                min: "1",
                max: "5",
                step: "1",
                defaultValue:"1"
            }} />
            <button onClick={onAddMeal}>+ Add</button>
        </form>
    )
}

export default MealItemForm;