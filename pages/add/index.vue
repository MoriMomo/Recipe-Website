<template>
  <div class="container">
    <div class="row g-3 justify-content-md-center">
      <base-input
        placeholder="Chicken Friedrice"
        v-model="newRecipe.recipeTitle"
      >
        <label for="Recipe Title" class="form-label"
          >Recipe Title</label
        ></base-input
      >

      <base-input v-model="newRecipe.recipeImage" placeholder="Image.png">
        <label for="img" class="form-label">Recipe Image</label>
      </base-input>

      <base-text-area v-model="newRecipe.recipeDescription">
        <form action="desc" class="form-label">Recipe Description</form>
      </base-text-area>

      <div>
        <div class="col-12">
          <h2>Ingredients</h2>
        </div>
        <div
          class="row g-1 justify-content-md-center"
          style="margin-top: 5px"
          v-for="item in ingredientCount"
          :key="item"
        >
          <base-input
            colStyle="col-8"
            placeholder="2 large eggs"
            v-model="newRecipe.ingredients[item - 1]"
          >
          </base-input>
          <base-button
            :buttonType="item !== ingredientCount ? 'delete' : 'add'"
            @click="addIngredient(item)"
          >
            {{ item !== ingredientCount ? "Delete" : "Add" }}
          </base-button>
        </div>
      </div>

      <div>
        <div class="col-12">
          <h2>Directions</h2>
        </div>
        <div
          class="row g-1 justify-content-md-center"
          style="margin-top: 5px"
          v-for="item in directionCount"
          :key="item"
        >
          <base-input
            colStyle="col-8"
            placeholder="2 large eggs"
            v-model="newRecipe.directions[item - 1]"
          >
          </base-input>
          <base-button
            :buttonType="item !== directionCount ? 'delete' : 'add'"
            @click="addDirection(item)"
          >
            {{ item !== directionCount ? "Delete" : "Add" }}
          </base-button>
        </div>
      </div>
      <base-button @click="addRecipe">Submit</base-button>
    </div>
  </div>
</template>

<script>
import BaseInput from "../../components/newRecipe/BaseInput.vue";
import BaseButton from "../../components/newRecipe/BaseButton.vue";
import BaseTextArea from "../../components/newRecipe/BaseTextArea.vue";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
  },
  middleware: ["check-auth", "auth"],
  data() {
    return {
      newRecipe: {
        recipeImage: "",
        recipeTitle: "",
        description: "",
        ingredients: [],
        directions: [],
      },
      ingredientCount: 1,
      directionCount: 1,
    };
  },
  methods: {
    async addRecipe() {
      // let newId = this.$store.getters.lastIdRecipe + 1;
      // this.$store.commit("addRecipe", { id: newId, ...this.newRecipe });
      await this.$store.dispatch("addNewRecipes", this.newRecipe);
      this.$router.push("/");
    },

    addIngredient(item) {
      if (item === this.ingredientCount) {
        this.ingredientCount += 1;
      } else {
        this.newRecipe.ingredients.splice(item - 1, 1);
        this.ingredientCount -= 1;
      }
    },

    addDirection(item) {
      if (item === this.directionCount) {
        this.directionCount += 1;
      } else {
        this.newRecipe.directions.splice(item - 1, 1);
        this.directionCount -= 1;
      }
    },
  },
};
</script>

<style>
.recipes {
  display: flex;
  flex-wrap: wrap;
}

.header-nav__link {
  margin-left: 20px;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

.add-recipe__title,
.add-recipe__desc {
  display: block;
  width: 100%;
  margin: 10px 0px;
  border: none;
}

.add-recipe__title {
  height: 50px;
  font-size: 25px;
}

.add-recipe__desc {
  height: 300px;
}

.add-recipe__img {
  border: none;
  height: 30px;
}

.add-recipe__button {
  color: white;
  background-color: #4b56d2;
  border: none;
  padding: 20px;
  border-radius: 15px;
  font-weight: bold;
}

.add-recipe__button:hover {
  cursor: pointer;
  background-color: #82c3ec;
  color: #4b56d2;
}
</style>