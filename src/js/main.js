import Alpine from 'alpinejs';

import RecipeCard from './components/RecipeCard.js';
import RecipeDetails from './components/recipeDetails.js';
import NavigationMenu from './components/NavigationMenu.js';



window.Alpine = Alpine;


Alpine.data('recipeCard', RecipeCard);
Alpine.data('recipeDetails', RecipeDetails)
Alpine.data('navigationMenu', NavigationMenu);    


Alpine.start();