import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
/** This is the entry point of your app */
async function getRandomMeal() {
  try {
    const cardsContainer = document.getElementById('cards-container');
    for (let i = 0; i < 8; i++) {
      let response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      let data = await response.json();
      let meal = data.meals[0]; //
      console.log(meal);

      // Card for the meal
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                    <Button variant="primary">
                    view recipe
                  </Button>
                  <Button variant="primary">
                    Favourite
                  </Button>
                `;

      cardsContainer.appendChild(card);
    }
  } catch (error) {
    //console.error('Error fetching data:', error);
  }
}

getRandomMeal();