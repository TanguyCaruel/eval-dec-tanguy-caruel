export default function RecipeDetails() {
    return {
      selectedRecipe: null,
      currentStep: 0, // index de l'étape courante
  
      init() {
        // Écoute l'événement 'recipeSelected' pour mettre à jour la recette affichée
        window.addEventListener('recipeSelected', (e) => {
          this.selectedRecipe = e.detail;
          this.currentStep = 0;
          document.body.classList.add('overflow-hidden'); // Empêche le scroll en arrière-plan si modale
        });
      },
  
      closeRecipe() {
        this.selectedRecipe = null;
        this.currentStep = 0;
        document.body.classList.remove('overflow-hidden');
      },
  
      prevStep() {
        if (this.selectedRecipe && this.currentStep > 0) {
          this.currentStep--;
        }
      },
  
      nextStep() {
        if (this.selectedRecipe && this.currentStep < this.selectedRecipe.instructions.length - 1) {
          this.currentStep++;
        }
      }
    };
  }
  