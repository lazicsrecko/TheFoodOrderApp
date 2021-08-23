import { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { mealsRequest } from '../../services/meals-services';

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const fetchMeals = async () => {
    try {
      const data = await mealsRequest();
      setAvailableMeals(data);
      setIsLoading(false);
      setHttpError(null)
    } catch (error) {
      setIsLoading(false);
      setAvailableMeals(false);
      setHttpError(error.message);
    }
  }
  useEffect(() => {
    fetchMeals();
  }, []);

  return <section className={classes.meals}>
    <Card>
      {isLoading && <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
      {httpError && <h2 style={{ textAlign: 'center' }}>{httpError}</h2>}
      <ul>{!isLoading && availableMeals && availableMeals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)}</ul>
    </Card>
  </section>
}

export default AvailableMeals;