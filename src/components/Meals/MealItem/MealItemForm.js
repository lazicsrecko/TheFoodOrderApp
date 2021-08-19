import React, { useContext, useState, useRef } from 'react';
import classes from './MealItemForm.module.css';
import CartContext from '../../../store/cart-context';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);
    const mealAmount = useRef();
    const { meal } = props;
    const cartContext = useContext(CartContext);

    const onAddMeal = (e) => {
        e.preventDefault();
        const enteredMealAmount = Number(mealAmount.current.value);
        meal.amount = enteredMealAmount
        cartContext.addItem(meal);

        if (enteredMealAmount < 1 || enteredMealAmount > 5) {
            setIsAmountValid(false);
            return;
        }
    }

    return (
        <form className={classes.form} onSubmit={onAddMeal}>
            <Input
                label="Amount"
                ref={mealAmount}
                input={{
                    id: "amount_" + meal.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }} />
            <button>+ Add</button>
            {!isAmountValid && <p>Please enter valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;