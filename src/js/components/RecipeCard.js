export default function RecipeCard() {
  return {
    recipes: [],
    searchQuery: '', // Recherche par titre
    difficulty: '', // Filtre par difficulté
    isLoading: false,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [], // Garde les favoris
    showFavorites: false, // Affiche uniquement les favoris si activé
    totalRecipes: 0, // Total des recettes
    currentRecipesCount: 0, // Nombre de recettes filtrées (pour affichage dynamique)

    async init() {
      this.isLoading = true;
      try {
        const response = await fetch('/src/data/recipes.json');
        const data = await response.json();
        this.recipes = data.recipes || [];
        this.totalRecipes = this.recipes.length; // Définit le total des recettes
        this.currentRecipesCount = this.filteredRecipes.length; // Met à jour les recettes filtrées
      } catch (error) {
        console.error('Erreur lors du chargement des recettes :', error);
      } finally {
        this.isLoading = false;
      }
    },

    get filteredRecipes() {
      let filtered = this.recipes;

      // Filtre par difficulté
      if (this.difficulty && this.difficulty !== '') {
        filtered = filtered.filter(recipe => recipe.difficulty.toLowerCase() === this.difficulty.toLowerCase());
      }

      // Recherche par titre
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(recipe => recipe.title.toLowerCase().includes(query));
      }

      // Filtre par favoris
      if (this.showFavorites) {
        filtered = filtered.filter(recipe => this.favorites.some(fav => fav.id === recipe.id));
      }

      // Met à jour le nombre de recettes filtrées pour l'affichage
      this.currentRecipesCount = filtered.length;

      return filtered;
    },

    toggleFavorite(recipe) {
      const index = this.favorites.findIndex(fav => fav.id === recipe.id);
      if (index > -1) {
        this.favorites.splice(index, 1); // Supprime des favoris
      } else {
        this.favorites.push(recipe); // Ajoute aux favoris
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Met à jour localStorage
    },

    isFavorite(recipe) {
      return this.favorites.some(fav => fav.id === recipe.id);
    },

    selectRecipe(recipe) {
      // Envoie un événement global pour la recette sélectionnée
      window.dispatchEvent(new CustomEvent('recipeSelected', { detail: recipe }));
    },

    clearFilters() {
      this.difficulty = '';
      this.searchQuery = '';
      this.showFavorites = false;
    }
  };
}