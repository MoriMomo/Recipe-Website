<template>
  <div class="container">
    <div class="recipes row">
      <app-recipe-item
        v-for="data in dataRecipes"
        :key="data.id"
        :recipe="data"
      ></app-recipe-item>
    </div>
  </div>
</template>

<script>
import RecipeItem from "./recipeItem.vue";

export default {
  props: ["dataRecipes"],
  components: {
    "app-recipe-item": RecipeItem,
  },
};
</script>

<style>
.recipes {
  display: flex;
  flex-wrap: wrap;
}
</style>