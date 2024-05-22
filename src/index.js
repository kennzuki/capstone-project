import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
/** This is the entry point of your app */
const mealEl = document.getElementById('meals');
getRandomMeal();

async function getRandomMeal() {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal);
}

function addMeal(mealData) {
  console.log(mealData);

  const meal = document.createElement('div');
  meal.classList.add('meals');

  meal.innerHTML = `
  <div >
  <img
  id="random-img"
  src="${mealData.strMealThumb}"
  alt="${mealData.strMeal}"
    class="w-[200px]"
  />
  <h4 id="recipe-name" class="">${mealData.strMeal}</h4>
  <button id="fav-button" class="fav">favorite</button>
  <button id="view-btn" class="view">view recipe</button>
</div>
`;
  mealEl.appendChild(meal);
}
