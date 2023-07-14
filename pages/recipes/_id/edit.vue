<template>
  <recipe-form :recipes="dataRecipe"></recipe-form>
</template>

<script>
import RecipeForm from "../../../components/admin/RecipeForm.vue";
export default {
  middleware: ["check-auth", "auth", "check-user"],
  asyncData({ store, params }) {
    const recipe = store.getters.detailRecipeState(params.id);
    const dataRecipe = { ...recipe, id: params.id };
    return { dataRecipe };
  },
  components: {
    RecipeForm,
  },
};
</script>

<style>
</style>