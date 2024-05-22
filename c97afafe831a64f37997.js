import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
/** This is the entry point of your app */
async function getRandomMeal() {
  try {
    const cardsContainer = document.getElementById('cards-container');
    for (let i = 0; i < 8; i++) {
      // Fetch a random meal
      let response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      let data = await response.json();
      let meal = data.meals[0]; // Get the meal object

      // Create a card for the meal
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
            
                `;

      // Append the card to the container
      cardsContainer.appendChild(card);
    }
  } catch (error) {
    //console.error('Error fetching data:', error);
  }
}

// Initialize
getRandomMeal();
