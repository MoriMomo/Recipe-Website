<template>
  <div>
    <main>
      <div class="recipes-detail">
        <div>
          <img
            class="recipes-detail__img"
            :alt="recipe.recipeTitle"
            :src="recipe.recipeImage"
          />
          <h1 class="recipes-detail__title">{{ recipe.recipeTitle }}</h1>
          <p class="recipes-detail__body">
            {{ recipe.description }}
          </p>
          <p>This recipe was made by {{ recipe.username }}</p>
          <hr />
          <h3>ingredientss</h3>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
          <h3>Directions</h3>
          <ol>
            <li v-for="direction in recipe.directions" :key="direction">
              {{ direction }}
            </li>
          </ol>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  asyncData({ store, params }) {
    const recipe = store.getters.detailRecipeState(params.id);
    return { recipe };
  },
};
</script>

<style>
.recipes-detail {
  display: flex;
  justify-content: center;
}

.recipes-detail div {
  width: 600px;
}

.recipes-detail__img {
  width: 400px;
  height: 300px;
  display: block;
  text-align: center;
  margin: 0px auto;
}

.recipes-detail__title {
  text-align: center;
}
</style>