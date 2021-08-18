import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const {id, name, description, price } = props;
    const priceToShow = `$${price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{priceToShow}</div>
            </div>
            <div>
                <MealItemForm meal={{id, name, description, price}} />
            </div>
        </li>
    )
}

export default MealItem;