import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { MealDB } from './Meal';
/** This is the entry point of your app */

const mealDB = new MealDB('1');

// DOM elements
const mealList = document.getElementById('meal-list');
const mealDetails = document.getElementById('meal-details');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const randomMealButton = document.getElementById('random-meal-button');

// Helper functions to update the DOM
function displayMeals(meals) {
  mealList.innerHTML = '';
  if (meals) {
    meals.forEach((meal) => {
      const mealItem = document.createElement('li');
      mealItem.textContent = meal.strMeal;
      mealItem.addEventListener('click', () =>
        fetchAndDisplayMealDetails(meal.idMeal)
      );
      mealList.appendChild(mealItem);
    });
  } else {
    mealList.innerHTML = '<li>No meals found</li>';
  }
}

function displayMealDetails(meal) {
  // Create ingredients list
  let ingredientsList = '<ul>';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
  }
  ingredientsList += '</ul>';

  mealDetails.innerHTML = `
    <div class="flex flex-col p-8 border-2 border-yellow-400 items-center gap-4 p-2 mt-6 mx-auto">
    <h2 class='text-3xl font-bold'>${meal.strMeal}</h2>
    <img class='rounded-full' src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 300px;">
    <h3 class='text-yellow-400 font-bold'>Ingredients</h3>
    <p class='flex p-4'> ${ingredientsList}</p>
   
    <p class='text-3xl text-yellow-400'>Instructions</p>
    <p>${meal.strInstructions}</p>
    
    </div>
   
  `;
}

async function fetchAndDisplayMealsByName(name) {
  try {
    const meals = await mealDB.fetchMealsByName(name);
    displayMeals(meals);
  } catch (error) {
    mealList.innerHTML = '<li>Error fetching meals</li>';
  }
}

async function fetchAndDisplayMealDetails(id) {
  try {
    const meal = await mealDB.fetchMealById(id);
    displayMealDetails(meal);
  } catch (error) {
    mealDetails.innerHTML = '<p>Error fetching meal details</p>';
  }
}

async function fetchAndDisplayRandomMeal() {
  try {
    const meal = await mealDB.fetchRandomMeal();
    displayMealDetails(meal);
  } catch (error) {
    mealDetails.innerHTML = `<p class='text-red-500 text-3xl'>Error fetching random meal</p>`;
  }
}

// search event to search for input and search
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchAndDisplayMealsByName(searchTerm);
  }
});

randomMealButton.addEventListener('click', fetchAndDisplayRandomMeal);

// Initial fetch for a default meal
fetchAndDisplayMealsByName('Pizza');
