<template>
  <div>
    <app-recipe-list :dataRecipes="recipes" :isUser="true"></app-recipe-list>
  </div>
</template>

<script>
import RecipeList from "../../components/recipe/recipeList.vue";

export default {
  middleware: ["check-auth", "auth"],

  components: {
    "app-recipe-list": RecipeList,
  },

  computed: {
    recipes() {
      const userId = this.$store.getters.userId;
      const recipes = this.$store.getters.recipeData;
      return recipes.filter((recipe) => recipe.userId == userId);
    },
  },
};
</script>

<style>
</style>