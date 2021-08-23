import { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { mealsRequest } from '../../services/meals-services';

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState();

  const fetchMeals = async () => {
    const data = await mealsRequest();
    setAvailableMeals(data)
  }
  useEffect(() => {
    fetchMeals();
  }, []);

  return <section className={classes.meals}>
    <Card>
      <ul>{availableMeals ? availableMeals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />) : <h2 style={{ textAlign: 'center' }}>Something went wrong!</h2>}</ul>
    </Card>
  </section>
}

export default AvailableMeals;