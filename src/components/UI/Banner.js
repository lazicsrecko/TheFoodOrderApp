import classes from './Banner.module.css';

const Banner = (props) => {
  const { customerDetails } = props;
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
      {!customerDetails && <p>Please enter your details below to proceed to our menu!</p>}
    </section>
  );
};

export default Banner;