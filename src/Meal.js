export default class MealDB {
  constructor() {
    this.baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
  }

  async getRandomMeals() {
    try {
      const res = fetch(`${this.baseUrl}random.php`);
      const data = (await res).json();
      return data.meals[0];
    } catch (error) {
      return error;
    }
  }
}
