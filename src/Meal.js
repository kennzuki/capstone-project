export class MealDB {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  }

  async fetchMealsByName(name) {
    try {
      const response = await fetch(`${this.baseUrl}/search.php?s=${name}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      return error;
      
    }
  }

  async fetchMealById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      return error;
    }
  }
}
