const mealsRequest = async () => {
    try {
        const res = await fetch("https://foodorderappapi-default-rtdb.firebaseio.com/meals.json");
        const data = await res.json();

        const meals = [];

        for (const key in data) {
            meals.push({
                id: key,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price
            })
        }

        return meals;
    } catch (error) {
        throw error;
    }
};

// const postMeals = async (meal) => {
//     const res = await fetch("https://foodorderappapi-default-rtdb.firebaseio.com/meals.json", {
//         method: 'POST',
//         body: JSON.stringify(meal),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const data = await res.json();
//     console.log(data);
// }

const postOrder = async (order) => {
    const res = await fetch("https://foodorderappapi-default-rtdb.firebaseio.com/orders.json", {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await res.json();
}

const _mealsRequest = mealsRequest;
const _postOrder = postOrder;

export { _mealsRequest as mealsRequest, _postOrder as postOrder };