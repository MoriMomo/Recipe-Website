import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
    return new Vuex.Store({
        state: {
            // recipes: [
            //     {
            //         id: 1,
            //         recipeImage: "https://i.ibb.co/SBsMYNC/Rendang.jpg",
            //         recipeTitle: "Rendang",
            //         likes: 100,
            //         body: "Rendang Recipe",
            //     },
            //     {
            //         id: 2,
            //         recipeImage: "https://i.ibb.co/MRNhgzW/Tomyam.jpg",
            //         recipeTitle: "Tomyam",
            //         likes: 40,
            //         body: "Tomyam Recipe",
            //     },
            //     {
            //         id: 3,
            //         recipeImage: "https://i.ibb.co/CW4tVvp/Spaghetti-aglioo-o-lio.jpg",
            //         recipeTitle: "Spagethi Aglio Olio",
            //         likes: 200,
            //         body: "Spagethi Aglio Olio Recipe",
            //     },
            //     {
            //         id: 4,
            //         recipeImage: "https://i.ibb.co/z7zRVxV/Spaghetti-Carbonara.jpg",
            //         recipeTitle: "Spagethi Carbonara",
            //         likes: 200,
            //         body: "Spagethi Carbonara Recipe",
            //     },
            //     {
            //         id: 5,
            //         recipeImage: "https://i.ibb.co/Cn1XPNB/Kimchi.jpg",
            //         recipeTitle: "Kimchi",
            //         likes: 10,
            //         body: "Kimchi Recipe",
            //     },
            // ],
            recipes: [],
            token: null,
            userData: null,
        },
        getters: {
            recipeData(state) {
                return state.recipes;
            },
            // lastIdRecipe(state) {
            //     return state.recipes.length;
            // }
            detailRecipeState: (state) => (id) => {
                return state.recipes.find((recipe) => recipe.id == id);
            },
            isAuthenticated(state) {
                return state.token !== null
            },
            userId(state) {
                return state.userData.userId;
            },
            userEmail(state) {
                if (state.userData === null) {
                    return;
                }
                return state.userData.email
            }
        },
        mutations:
        {
            addRecipe(state, recipe) {
                state.recipes.push(recipe);
            },
            setRecipe(state, payload) {
                state.recipes = payload;
            },
            setToken(state, payload) {
                state.token = payload;
            },
            setUserData(state, payload) {
                state.userData = payload
            },
            deleteRecipe(state, payload) {
                const recipes = state.recipes.filter(item => item.id !== payload)
                state.recipes = recipes
            }
        },
        actions: {
            nuxtServerInit({ commit }) {
                return axios.get("https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe.json").then(response => {
                    const recipeArray = [];
                    for (const key in response.data) {
                        recipeArray.push({ ...response.data[key], id: key })
                    }
                    console.log(recipeArray)
                    commit("setRecipe", recipeArray);
                })
                    .catch(e => context.error(e))
            },
            addNewRecipes: async ({ commit, state }, recipe) => {
                const { data } = await axios.post("https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe.json?auth=" + state.token,
                    { ...recipe, userId: state.userData.userId, username: state.userData.username, dataLikes: ["null"], })
                commit("addRecipe", { ...recipe, userId: state.userData.userId, username: state.userData.username, id: data.name, dataLikes: ["null"], id: data.name })
                console.log(data)

            },
            authenticateUser({ commit }, authData) {
                let webAPIKey = "AIzaSyDezzofDh19MO9nyOiR5-fEmIHvPRd8eTE"
                let authURL = authData.isLogin
                    ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                    : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="

                return axios.post(authURL + webAPIKey, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                    displayName: authData.displayName
                })
                    .then((response) => {
                        commit("setToken", response.data.idToken);
                        commit("setUserData", {
                            username: response.data.displayName,
                            email: response.data.email,
                            userId: response.data.localId
                        })
                        localStorage.setItem("token", response.data.idToken);
                        Cookie.set("jwt", response.data.idToken)
                        const userData = {
                            username: response.data.displayName,
                            email: response.data.email,
                            userId: response.data.localId
                        }
                        localStorage.setItem("user", JSON.stringify(userData))
                        Cookie.set("acc_user", JSON.stringify(userData))

                        localStorage.setItem("tokenExpiration",
                            new Date().getTime() +
                            Number.parseInt(response.data.expiresIn) * 1000
                        )
                        Cookie.set("tokenExpiration",
                            new Date().getTime() +
                            Number.parseInt(response.data.expiresIn) * 1000
                        )
                    })
                    .catch((error) => console.log(error))
            },

            initAuth({ commit, dispatch }, req) {
                let token;
                let user;
                let expirationDate
                if (req) {

                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                        .split(";")
                        .find((c) => c.trim().startsWith("jwt="))

                    const accUserCookie = req.headers.cookie
                        .split(";").find((c) => c.trim().startsWith("acc_user="))
                    const userCookie = accUserCookie.substr(accUserCookie.indexOf("=") + 1)
                    user = JSON.parse(decodeURIComponent(userCookie))

                    if (!jwtCookie) {
                        return
                    }
                    token = jwtCookie.split("=")[1]
                    // expirationDate = req.headers.cookie
                    // .split(";")
                    // .find((c) => c.trim().startsWith("expirationDate="))
                    // .split("=")[1]
                    expirationDate = Cookie.get("tokenExpiration")
                } else {
                    token = localStorage.getItem("token")
                    user = JSON.parse(localStorage.getItem("user"))
                    expirationDate = localStorage.getItem("tokenExpiration")
                }
                if (new Date().getTime() > +expirationDate || !token) {
                    console.log("no token or invalid token")
                    dispatch("logout")
                    return
                }
                commit("setToken", token)
                commit("setUserData", user)
            },

            logout({ commit }) {
                commit("setToken", null)
                Cookie.remove("jwt")
                Cookie.remove("acc_user")
                if (process.client) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                }

            },

            likeUpdate({ commit, state, dispatch }, recipe) {
                return axios
                    .put("https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe/" +
                        recipe.recipeId + ".json?auth=" + state.token,
                        recipe.newDataRecipe).then(res => dispatch("getRecipe"))
            },

            getRecipe({ commit }) {
                return axios.get("https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe.json").then(response => {
                    const recipeArray = [];
                    for (const key in response.data) {
                        recipeArray.push({ ...response.data[key], id: key })
                    }
                    commit("setRecipe", recipeArray);
                })
                    .catch(e => context.error(e))
            },

            deleteRecipe({ commit, state }, recipeId) {
                return axios
                    .delete("https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe/"
                        + recipeId + ".json?auth=" + state.token)
                    .then((res) => commit("deleteRecipe", recipeId))
            },

            updateRecipe({ dispatch, state }, recipe) {
                return axios.put(
                    "https://nuxt-recipe-default-rtdb.firebaseio.com/datarecipe/" +
                    recipe.id + ".json?auth=" + state.token, recipe.newRecipe
                ).then((res) => dispatch("getRecipe"))
            }
        }
    })
}

export default createStore