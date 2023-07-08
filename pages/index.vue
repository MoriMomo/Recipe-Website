<template>
  <div>
    <main></main>
    <app-recipe-list :dataRecipes="recipes"></app-recipe-list>

    <footer></footer>
  </div>
</template>

<script>
import RecipeList from "../components/recipe/recipeList.vue";

export default {
  middleware: "check-auth",

  components: {
    "app-recipe-list": RecipeList,
  },
  data() {
    return {};
  },
  computed: {
    recipes() {
      return this.$store.getters.recipeData;
    },
  },
};
</script>

<style>
</style>