export default function ({ route, store, redirect }) {
    const recipeDetail = store.getters.detailRecipeState(route.params.recipeId)
    const userId = store.getters.userId
    // if (recipeDetail.userId !== userId) {
    //     redirect("/")
    // }
}