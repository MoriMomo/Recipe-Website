<template>
  <div class="col-3">
    <div class="recipes-content card">
      <img
        class="recipes-content__img card-img-top"
        alt="Pasta"
        :src="recipe.recipeImage"
      />

      <div class="recipes-content__body card-body">
        <div style="height: auto; align-items: center">
          <p class="username">{{ recipe.username }}</p>
          <nuxt-link
            tag="h1"
            class="recipes-content__body__title card-text fs-4"
            :to="{ name: 'recipes-id', params: { id: recipe.id } }"
          >
            {{ recipe.recipeTitle }}
          </nuxt-link>
        </div>

        <div
          class="recipes-content__body__review card-footer bg-transparent row"
        >
          <div class="col-2">
            <img :src="likeImage" alt="" @click="likeClick" />
          </div>
          <div class="col-6">
            <p>{{ likeCount }} Likes</p>
          </div>
          <div class="col-2" v-show="isUser">
            <img
              src="../../static/img/delete.png"
              alt="delete"
              @click="deleteRecipe"
            />
          </div>
          <div class="col-2" v-show="isUser">
            <img src="../../static/img/edit.png" alt="" @click="editRecipe" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: "",
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    likeCount() {
      if (this.recipe.dataLikes.length === 1) {
        if (this.recipe.dataLikes[0] === "null") {
          return 0;
        } else {
          return 1;
        }
      } else {
        return this.recipe.dataLikes.length;
      }
    },
    likeImage() {
      const userEmail = this.$store.getters.userEmail;
      const checkLike = this.recipe.dataLikes.filter(
        (item) => item === userEmail
      );
      if (checkLike.length === 0) {
        return "img/heart-black.png";
      }
      return "img/heart-red.png";
    },
  },

  methods: {
    likeClick() {
      if (!this.$store.getters.isAuthenticated) {
        this.$router.push("/user/login");
      }
      const recipe = this.recipe;
      const userEmail = this.$store.getters.userEmail;
      if (recipe.dataLikes.length === 1 && recipe.dataLikes[0] === "null") {
        recipe.dataLikes[0] = userEmail;
      } else {
        const checkLike = recipe.dataLikes.filter((item) => item === userEmail);
        if (checkLike.length === 0) {
          recipe.dataLikes.push(userEmail);
        } else {
          if (recipe.dataLikes.length === 1) {
            recipe.dataLikes[0] = "null";
          } else {
            const userEmailIndex = recipe.dataLikes.findIndex(
              (item) => item === userEmail
            );
            recipe.dataLikes.splice(userEmailIndex, 1);
          }
        }
      }
      let { id: _, ...newRecipe } = recipe;
      this.$store.dispatch("likeUpdate", {
        recipeId: this.recipe.id,
        newDataRecipe: newRecipe,
      });
    },

    deleteRecipe() {
      this.$store.dispatch("deleteRecipe", this.recipe.id);
    },

    editRecipe() {
      this.$router.push("/recipes/" + this.recipe.id + "/edit");
    },
  },
};
</script>

<style>
.header-nav__link {
  margin-left: 20px;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

/* Recipe Content */
.recipes-content {
  background-color: #eef2e6;

  margin: 13px 13px;
  border-radius: 5px;
  width: 300px;
}

.recipes-content__body {
  padding: 5px;
}

.recipes-content__img {
  width: 100%;
  height: 25vh;
}

.recipes-content__body__review {
  display: flex;
  align-items: center;
}

.recipes-content__body__review img {
  width: 20px;
  height: 20px;
  margin: 5px 10px 5px 0px;
}

.recipes-content__body__review p {
  margin: 0px;
}

.recipes-content__body__review img:hover {
  cursor: pointer;
}

.recipes-content__body__title {
  margin: 5px 0px;
}

.username {
  margin-bottom: 0px;
}
</style>